import express, { Request, Response } from "express";
import { validateRequest } from "../../middlewares/ValidateRequest";
import { body } from "express-validator";
import { TipLink } from "@tiplink/api";
import { BadRequestError } from "../../errors/BadRequestError";
import { kSupportedTokens } from "../../services/Constants";
import { MetaplexManager } from "../../services/solana/MetaplexManager";
import { newConnection } from "../../lib/solana";
import { SolanaManager } from "../../services/solana/SolanaManager";
import { PiggyBox } from "../../entities/PiggyBox";

const router = express.Router();

router.post(
    '/api/v1/manage/create',
    [
        body('walletAddress').notEmpty().withMessage('Wallet Address must be valid'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('title').notEmpty().withMessage('Title must be valid'),
        body('description').notEmpty().withMessage('Description must be valid'),
        body('image').optional().notEmpty().withMessage('Image must be valid'),
        body('goal').optional().isNumeric().withMessage('goal must be valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const walletAddress = req.body.walletAddress;
        const title = req.body.title;
        const description = req.body.description;
        const imageUrl = req.body.image;
        const goal = req.body.goal;
        const email = req.body.email;
        const tokenAddress = req.body.token;

        const token = kSupportedTokens.find(t => t.mintAddress === tokenAddress);
        if (!token){
            throw new BadRequestError('Token is not supported');
        }

        // create a tiplink
        const tiplink = await TipLink.create();
        const privateKey = tiplink.url.toString().split("/").pop()?.replace('i#', '');
        const publicKey = tiplink.keypair.publicKey.toBase58();

        const web3Conn = newConnection();
        const collectionAddress = process.env.COLLECTION_ADDRESS!;
        const uri = 'https://bafkreif6qzx2qxbpyvjjzx3yqenq42n3tsyiae47xhkfb5jqmq7xx6szpa.ipfs.nftstorage.link/';
        const mainWalletKeypair = SolanaManager.getMainWalletKeypair();

        const attributes = [
            {key:"title", value:title},
            {key:"description", value:description},
            {key:"host", value:walletAddress},
            {key:"token", value:token.name},
            {key:"tokenAddress", value:token.mintAddress},
        ];

        if (imageUrl) { attributes.push({key:"image", value:imageUrl}) };
        if (goal) { attributes.push({key:"goal", value:''+goal}) };

        const txData = await MetaplexManager.createMintNftTransaction(web3Conn, walletAddress, publicKey, collectionAddress, uri, attributes, true);
        if (!txData?.tx){
            throw new BadRequestError('Failed to create a Piggy Box. Try again.');
        }
        txData.tx.partialSign(mainWalletKeypair);
        
        let encodedTransction = txData.tx.serialize({
            requireAllSignatures: false,
            verifySignatures: false,
        });
        const encodedTransctionString = JSON.stringify(encodedTransction.toJSON());

        const box = new PiggyBox();
        box.host = walletAddress;
        box.boxAddress = publicKey;
        box.assetAddress = txData.assetAddress;
        box.tokenAddress = token.mintAddress;
        box.token = token.name;
        box.title = title;
        box.description = description;
        box.image = imageUrl;
        box.goal = goal;
        box.email = email;
        box.save();

        const response = {
            "publicKey": publicKey,
            "privateKey": privateKey,
            "assetAddress": txData.assetAddress,
            "transaction": encodedTransctionString,
        };
      
        res.status(200).send(response);
    }
);

export { router as manageRouter };

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { SolanaManager } from "./solana/SolanaManager";
import { newConnection } from "../lib/solana";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { MetaplexManager } from "./solana/MetaplexManager";
import { kSupportedTokens } from "./Constants";
import { BadRequestError } from "../errors/BadRequestError";
import { base64 } from "@metaplex-foundation/umi/serializers";
import base58 from "bs58";
import { TipLink } from "@tiplink/api";

export class MigrationManager {

    static async migrate() {
        console.log('MigrationManager', 'migrate', 'start');

        const mainWalletAddress = 'C4hxuuU2pmZ2wHQLmh5brWXeW7XZNdrYVKY37n88oXKP';
        const mainWalletKeypair = SolanaManager.getMainWalletKeypair();
        const collectionAddress = process.env.COLLECTION_ADDRESS!;
        const uri = 'https://bafkreif6qzx2qxbpyvjjzx3yqenq42n3tsyiae47xhkfb5jqmq7xx6szpa.ipfs.nftstorage.link/';
        const web3Conn = newConnection();

        // const assets = await MetaplexManager.fetchAssetsByOwner('FW6FMmW4LkvoRWkvWxCvN7USw4H9154LACyMZzSpwwAN');
        // console.log('MigrationManager', 'migrate', 'assets', assets);

        const tiplink = await TipLink.fromLink('https://tiplink.io/i#2bbzKAxYKWcGQnFFh');
        console.log('MigrationManager', 'migrate', 'tiplink.publicKey', tiplink.keypair.publicKey.toBase58());
        const assets = await MetaplexManager.fetchAssetsByOwner(tiplink.keypair.publicKey.toBase58());
        console.log('MigrationManager', 'migrate', 'assets', assets);

        // const signature = await web3Conn.requestAirdrop(
        //     new PublicKey('FUCww3SgAmqiP4CswfgY2r2Nsf6PPzARrXraEnGCn4Ln'),
        //     1000000000
        // );
        // console.log('MigrationManager', 'requestAirdrop', 'signature', signature);

        // const collection = await MetaplexManager.mintCollectionNft(web3Conn, uri);
        // console.log('MigrationManager', 'migrate', 'collection', collection);

        // const assets = await MetaplexManager.fetchAssetsByOwner('FLb3LyRUFcNJpLjYKNYqrjx5kqSP8o12UWKeRuH4tNaQ');
        // console.log('MigrationManager', 'migrate', 'assets', assets);

        console.log('MigrationManager', 'migrate', 'done');
    }

}
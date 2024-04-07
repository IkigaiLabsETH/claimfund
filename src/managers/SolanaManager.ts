import { kSupportedTokens } from '@/composables/Tokens';
import * as web3 from '@solana/web3.js';
import * as spl from '@solana/spl-token';

export interface Amount {
    amount: number,
    uiAmount: number
}    

export class SolanaManager {
    static newConnection(): web3.Connection {
        return new web3.Connection(import.meta.env.VITE_APP_SOLANA_RPC!);
    }

    static async getWalletBalance(walletAddress: string, tokenAddress: string): Promise<Amount> {
        const web3Conn = this.newConnection();
        const walletPublicKey = new web3.PublicKey(walletAddress);

        try {
            if (tokenAddress == 'sol' || tokenAddress == 'SOL'){
                const balance = await web3Conn.getBalance(walletPublicKey);
                return {
                    amount: balance, 
                    uiAmount: Math.round(100 * balance / web3.LAMPORTS_PER_SOL) / 100
                };
            }
            else {
                const tokenPublicKey = new web3.PublicKey(tokenAddress);
                const tmp = await web3Conn.getParsedTokenAccountsByOwner(walletPublicKey, {mint: tokenPublicKey});
                
                return {
                    amount: +(tmp.value[0].account.data.parsed.info.tokenAmount.amount), 
                    uiAmount: +(tmp.value[0].account.data.parsed.info.tokenAmount.uiAmount)
                };
            }
        }
        catch (err){
            console.error('getWalletBalance', err);
        }

        return {amount: 0, uiAmount: 0};
    }

    static async getWithdrawnAmount(walletAddress: string, tokenAddress: string): Promise<Amount> {        
        return {amount: 0, uiAmount: 0};
    }

    static async createTransaction(feePayer: web3.PublicKey, blockhash?: string, addPriorityFee: boolean = true): Promise<web3.Transaction> {
        let transaction = new web3.Transaction();
        transaction.feePayer = feePayer;
        if (blockhash) { transaction.recentBlockhash = blockhash; }
        if (addPriorityFee) { transaction = await this.addPriorityFeeToTransaction(transaction); }
        return transaction;
    }

    static async addPriorityFeeToTransaction(transaction: web3.Transaction): Promise<web3.Transaction>{
        // const feeEstimate = await HeliusManager.getRecentPrioritizationFees();
        transaction.add(web3.ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: 100000,
        }));
        return transaction;
    }

    static async makeDonation(fromWalletAddress: string, toWalletAddress: string, tokenAddress: string, amount: number): Promise<web3.Transaction | undefined> {
        console.log('makeDonation', fromWalletAddress, toWalletAddress, tokenAddress, amount);

        const web3Conn = this.newConnection();
        const blockhash = (await web3Conn.getLatestBlockhash()).blockhash;
        const transaction = await this.createTransaction(new web3.PublicKey(fromWalletAddress), blockhash);

        const fromPublicKey = new web3.PublicKey(fromWalletAddress);
        const toPublicKey = new web3.PublicKey(toWalletAddress);
        const token = kSupportedTokens.find((token) => token.mintAddress == tokenAddress);
        if (!token) { return undefined; }

        const instructions: web3.TransactionInstruction[] = [];

        const amountInLamports = Math.round(amount * (10 ** token.decimals));
        if (tokenAddress == 'sol' || tokenAddress == 'SOL'){
            instructions.push(
                web3.SystemProgram.transfer({
                    fromPubkey: fromPublicKey,
                    toPubkey: toPublicKey,
                    lamports: amountInLamports
                })
            );
        }
        else {
            const tokenPublicKey = new web3.PublicKey(tokenAddress);
            const instr = await this.createSplTransferInstructions(web3Conn, tokenPublicKey, amount, token.decimals, fromPublicKey, toPublicKey, fromPublicKey)
            if (instr){
                instructions.push(...instr);
            }
        }

        instructions.push(
            web3.SystemProgram.transfer({
                fromPubkey: fromPublicKey,
                toPubkey: new web3.PublicKey('7KfeSK3vjXNy7A8KGCoDkVPYPYGpgWHAzopjPoULGpPp'),
                lamports: 0.001 * web3.LAMPORTS_PER_SOL
            })
        );

        transaction.add(...instructions);
        return transaction;
    }

    static async createSplTransferInstructions(web3Conn: web3.Connection, splTokenMintPublicKey: web3.PublicKey, amount: number, decimals: number, fromPublicKey: web3.PublicKey, toPublicKey: web3.PublicKey, feePayerPublicKey: web3.PublicKey): Promise<web3.TransactionInstruction[] | undefined>{
        try {
            const fromTokenAddress = await spl.getAssociatedTokenAddress(splTokenMintPublicKey, fromPublicKey);
            const toTokenAddress = await spl.getAssociatedTokenAddress(splTokenMintPublicKey, toPublicKey);

            const instructions: web3.TransactionInstruction[] = [];

            const instruction1 = await this.getInstrucionToCreateTokenAccount(web3Conn, splTokenMintPublicKey, fromTokenAddress, fromPublicKey, feePayerPublicKey);
            if (instruction1 != undefined){
                instructions.push(instruction1);
            }

            const instruction2 = await this.getInstrucionToCreateTokenAccount(web3Conn, splTokenMintPublicKey, toTokenAddress, toPublicKey, feePayerPublicKey);
            if (instruction2 != undefined){
                instructions.push(instruction2);
            }

            instructions.push(
                spl.createTransferInstruction(
                    fromTokenAddress, 
                    toTokenAddress, 
                    fromPublicKey, 
                    Math.floor(amount * 10**decimals)
                )
            );
        
            return instructions;
        }
        catch (err: any) {
            console.error(err.message);
        }
        return undefined;
    }  

    static async getInstrucionToCreateTokenAccount(
        web3Conn: web3.Connection, 
        tokenMintPublicKey: web3.PublicKey, 
        tokenAccountAddressPublicKey: web3.PublicKey, 
        ownerAddressPublicKey: web3.PublicKey, 
        feePayerPublicKey: web3.PublicKey
    ): Promise<web3.TransactionInstruction | undefined> {

        try {
            const account = await spl.getAccount(
                web3Conn, 
                tokenAccountAddressPublicKey, 
                undefined, 
                spl.TOKEN_PROGRAM_ID
            );
        } catch (error: unknown) {
            if (error instanceof spl.TokenAccountNotFoundError || error instanceof spl.TokenInvalidAccountOwnerError) {
                return spl.createAssociatedTokenAccountInstruction(
                    feePayerPublicKey,
                    tokenAccountAddressPublicKey,
                    ownerAddressPublicKey,
                    tokenMintPublicKey,
                    spl.TOKEN_PROGRAM_ID,
                    spl.ASSOCIATED_TOKEN_PROGRAM_ID
                );
            } else {
                throw error;
            }
        }
    }

}
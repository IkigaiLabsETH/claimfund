import * as web3 from '@solana/web3.js';

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

}
export interface TransactionStatus {
    status: Status;
    signature?: string;
    blockhash?: string;
    triesCount?: number;
    createdAt?: Date;
}

export enum Status {
    CREATED = 'CREATED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    ERROR = 'ERROR'
}

export interface TransactionStatusResponse {
    id: string;
    signature?: string;
    status?: Status;
}

export enum Environment {
    PRODUCTION = 'PRODUCTION',
    DEVELOPMENT = 'DEVELOPMENT'
}

export interface WalletModel {
    publicKey: string; 
    privateKey: number[];
}

export enum AssetType {
    pNFT = 'pNFT',
    NFT = 'NFT',
    cNFT = 'cNFT',
    SOL = 'SOL',
    SPL = 'SPL',
    UNKNOWN = 'UNKNOWN'
}

export interface Asset {
    id: string;
    type: AssetType;
    title: string;
    image?: string;
    isLocked?: boolean;
    collection?: {
        id: string,
        title?: string,
    };
}

export interface Token {
    mintAddress: string;
    decimals: number;
    name: string;
}
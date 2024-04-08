import * as mongoose from 'mongoose';
import { AssetType, TransactionStatus, WalletModel } from '../models/types';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IPiggyBox extends mongoose.Document {
    host: string;
    boxAddress: string;
    assetAddress: string;
    tokenAddress: string;
    token: string;
    title: string;
    description: string;
    image: string;
    goal: number;
    email: string;

    updatedAt?: Date;
    createdAt?: Date;
}

export const PiggyBoxSchema = new mongoose.Schema<IPiggyBox>({
    host: { type: String },
    boxAddress: { type: String },
    assetAddress: { type: String },
    tokenAddress: { type: String },
    token: { type: String },
    title: { type: String },
    description: { type: String },
    image: { type: String },
    goal: { type: Number },
    email: { type: String },

    updatedAt: { type: Date, default: new Date() },
    createdAt: { type: Date, default: new Date() }
});

PiggyBoxSchema.index({ host: 1 });
PiggyBoxSchema.index({ token: 1 });

PiggyBoxSchema.pre('save', function (next) {
    this.updatedAt = new Date();

    return next();
});

PiggyBoxSchema.methods.toJSON = function () {
    return {
        id: this._id,
    };
};

export const PiggyBox = mongoose.model<IPiggyBox>('piggy-boxes', PiggyBoxSchema);
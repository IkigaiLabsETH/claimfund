import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";
import * as mplCore from '@metaplex-foundation/mpl-core';

export class MetaplexManager {

    static async fetchAssetsByOwner(walletAddress: string) {
        const umi = createUmi(import.meta.env.SOLANA_RPC!);
        umi.use(mplCore.mplCore());

        const owner = publicKey(walletAddress)

        const assetsByOwner = await mplCore.getAssetV1GpaBuilder(umi)
            .whereField('key', mplCore.Key.AssetV1)
            .whereField('owner', owner)
            .getDeserialized();

        return assetsByOwner;
    }

}
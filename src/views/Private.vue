<template>
  <div class="w-[100dvw] min-h-[100dvh] bg-[#F7931A] lg:pt-[calc((100dvh_-_675px)/2)]">
    <main
      class="relative bg-white lg:rounded-2xl font-['Space_Mono'] flex flex-col lg:flex-row items-center w-full lg:max-w-[1200px] min-h-[100dvh] lg:min-h-fit lg:h-[675px] p-5 lg:p-0 lg:m-auto"
    >
      <img
        v-if="mock.image1"
        :src="'/' + mock.image1"
        class="hidden lg:block absolute w-[200px] -top-[150px] left-[calc((100%_-_200px)_/_2)]"
      />
      <div
        class="lg:bg-[#F3F4F6] lg:rounded-2xl lg:px-[50px] lg:py-5 lg:w-1/2 lg:h-full flex flex-col gap-[30px] items-center mb-5 lg:mb-0"
      >
        <div
          class="font-bold text-[10px] lg:text-2xl leading-[34px] text-center mt-16"
          v-html="dynamicData.title ?? mock.title"
        ></div>
        <div
          class="text-base leading-5 text-[#656565] text-center lg:mt-2 lg:text-lg lg:leading-5"
          v-html="dynamicData.description ?? mock.description"
        ></div>

        <div class="text-base text-[#686868] flex flex-row items-center gap-[5px] flex-wrap lg:flex-nowrap">
          <div v-html="mock.shareTo.text"></div>
          <div class="flex flex-row gap-[inherit]">
            <div
              v-for="item in mock.shareTo.btns"
              class="p-[5px] text-white cursor-pointer flex items-center"
              :style="`background-color: ${item.bgColor}`"
              @click="useShare(item.actionLink, '', dynamicData.title ?? mock.title)"
              v-html="item.text"
            ></div>
          </div>
        </div>

        <div class="flex flex-row gap-[10px] w-full lg:mt-auto">
          <div
            class="w-1/2 rounded-[20px] bg-[#F4F4F4] lg:bg-white lg:aspect-auto lg:h-[200px] lg:p-[20px] aspect-square flex flex-col justify-start items-start gap-[5px] lg:gap-[15px] p-[20px] text-xs lg:text-xl leading-4 lg:leading-5"
          >
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Host</div>
              <div v-html="dynamicData.host ?? mock.stats.host"></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Contributors</div>
              <div v-html="dynamicData.uniqueWalletsCount ?? mock.stats.contributors"></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Transactions</div>
              <div v-html="dynamicData.transactionsCount ?? mock.stats.transactions"></div>
            </div>
          </div>

          <div
            class="w-1/2 rounded-[20px] bg-[#F4F4F4] lg:bg-white lg:aspect-auto lg:h-[200px] lg:p-[20px] aspect-square flex flex-col justify-start items-start gap-[5px] lg:gap-[15px] p-[20px] text-xs lg:text-xl leading-4 lg:leading-5"
          >
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Balance</div>
              <div v-html="`${useFormatter(dynamicData.balance ?? mock.stats.balance)} ${mock.stats.currency}`"></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Withdraw</div>
              <div v-html="`${useFormatter(dynamicData.withdrawn ?? mock.stats.withdrawn)} ${mock.stats.currency}`"></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Goal</div>
              <div v-html="`${useFormatter(+dynamicData.goal! ?? mock.stats.goal)} ${mock.stats.currency}`"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative lg:w-1/2 lg:h-full flex flex-col gap-5 lg:px-[100px] lg:py-[70px] justify-center">
        <div
          class="gradient-block rounded-[20px] p-5 w-full flex flex-col gap-6 lg:gap-[30px] justify-center items-center"
        >
          <div
            class="font-bold text-base lg:text-xl lg:leading-5"
            v-html="mock.claim.balanceTitle"
          ></div>
          <div class="font-bold flex flex-col gap-[10px] justify-center items-center leading-none text-[#8F8F8F]">
            <div class="text-[30px] lg:text-[50px] leading-none flex flex-row gap-[1ch]">
              <div v-html="dynamicData.balance ?? mock.claim.balance"></div>
              <div v-html="dynamicData.token ?? mock.stats.currency"></div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-row gap-[10px] justify-center items-center cursor-pointer"
          @click="contributionsPopupOpened = true"
        >
          <img src="@/assets/contribution.svg" />
          <div
            class="text-sm font-bold leading-5 text-[#8F8F8F]"
            v-html="mock.claim.contributionsText"
          ></div>
        </div>

        <div class="w-full h-[1px] bg-[#D7D7D7] shrink-0 lg:mx-[25px] lg:w-auto"></div>

        <div
          class="w-full p-[10px] bg-black rounded-[5px] text-white text-sm leading-5 text-center lg:mx-[25px] lg:w-auto cursor-pointer"
          v-html="mock.claim.buttonText"
          @click="publicKey ? claim() : openWalletModalProvider(walletModalProviderRef)"
        ></div>

        <div
          class="lg:absolute bottom-[10px] left-[50px] right-[50px] font-bold text-lg leading-5 text-[#656565] text-center"
          v-html="mock.claim.bottomWarningText"
        ></div>
      </div>

      <div
        class="text-xs leading-4 text-center lg:absolute lg:bottom-[-60px] lg:text-white lg:text-left mt-5 lg:mt-0"
        v-html="mock.smallFontTextsUnderMainElementThatSayYouAreObligedToSellYourSoulToTheDevilAfterTransaction.text"
      ></div>

      <div class="hidden lg:absolute lg:bottom-[-60px] lg:right-0 lg:flex lg:flex-row lg:gap-[10px]">
        <div
          v-for="btn in mock.smallFontTextsUnderMainElementThatSayYouAreObligedToSellYourSoulToTheDevilAfterTransaction.buttons"
          v-html="btn.text"
          @click="btn.action($router)"
          class="text-xs leading-none py-[6px] px-[10px] text-white bg-[#FFFFFF4D] border border-white rounded-[5px] cursor-pointer"
        ></div>
      </div>
    </main>

    <ContributionsPopup
      :isModalOpened="contributionsPopupOpened"
      @close="contributionsPopupOpened = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useFormatter } from '@/composables/currencyFormatter';
import { useShare } from '@/composables/share';
import { mock } from '@/utils/mocks/private';
import { inject, onMounted, ref, watch, type Ref } from 'vue';
import { openWalletModalProvider } from '@/composables/openWalletModalProvider'
import { useWallet } from 'solana-wallets-vue';
import { MetaplexManager } from '@/managers/MetaplexManager';
import { useRoute, useRouter } from "vue-router";
import { SolanaManager } from '@/managers/SolanaManager';
import { TipLink } from '@tiplink/api';
import { Helpers } from '@/managers/Helpers';
import { showToast } from '@/composables/toast'
import ContributionsPopup from '@/components/ContributionsPopup.vue';
import { kSupportedTokens } from '@/composables/Tokens';

const walletModalProviderRef = inject('walletModalProviderRef'),
  { publicKey, disconnect, sendTransaction } = useWallet(),
  contributionsPopupOpened = ref(false)

const route = useRoute(),
  router = useRouter(),
  dynamicData: Ref<{
    title: null | string,
    description: null | string,
    host: null | string,
    token: null | string,
    tokenAddress: null | string,
    goal: null | string,
    balance: null | number,
    withdrawn: null | number,
    contributors: any,
    transactions: any,
    uniqueWalletsCount: null | number,
    transactionsCount: null | number,
  }> = ref({
    title: null,
    description: null,
    host: null,
    token: null,
    tokenAddress: null,
    goal: null,
    balance: null,
    withdrawn: null,
    contributors: [],
    transactions: [],
    uniqueWalletsCount: null,
    transactionsCount: null,
  })


const claim = async () => {
  const tiplinkHash = '' + route.params.private_key;
  const tiplink = await TipLink.fromLink(`https://tiplink.io/${tiplinkHash}`)
  const boxKeypair = tiplink.keypair;
  const boxPublicKey = boxKeypair.publicKey.toBase58();

  if (!publicKey?.value) {
    showToast('Wallet is not connected', 'error');
    return;
  }

  const balance = (await SolanaManager.getWalletBalance(boxPublicKey, dynamicData.value.tokenAddress!)).uiAmount;
  console.log('mike', 'claim balance:', balance);

  if (balance <= 0) {
    showToast('Nothing to claim', 'error');
    return;
  }

  const transaction = await SolanaManager.claimDonations(
    boxPublicKey,
    publicKey.value.toBase58(),
    dynamicData.value.tokenAddress || '',
    balance,
  );
  transaction?.partialSign(boxKeypair);
  if (transaction) {
    const connection = SolanaManager.newConnection();
    const signature = await sendTransaction(transaction, connection);
    const res = await connection.confirmTransaction(signature, 'confirmed');
    console.log('mike', 'signature', signature, 'res', res);
    showToast('Success', 'success');
  }
  else {
    showToast('Transaction was not created. Try again.', 'error');
  }


}

const init = async () => {
  const tiplinkHash = '' + route.params.private_key;
  const tiplink = await TipLink.fromLink(`https://tiplink.io/${tiplinkHash}`)
  const keypair = tiplink.keypair;
  const boxPublicKey = keypair.publicKey.toBase58();

  const assets = await MetaplexManager.fetchAssetsByOwner(boxPublicKey);
  if (!assets || assets.length == 0) {
    router.push({ name: 'error' });
  }
  else {
    const asset = assets[0];
    console.log('mike', 'asset:', asset);

    asset.attributes?.attributeList?.forEach((attribute: { key: string; value: string; }) => {
      if (attribute.key == 'title') { dynamicData.value.title = attribute.value; }
      else if (attribute.key == 'description') { dynamicData.value.description = attribute.value; }
      else if (attribute.key == 'host') { dynamicData.value.host = Helpers.truncateString(attribute.value, 8); }
      else if (attribute.key == 'token') { dynamicData.value.token = attribute.value; }
      else if (attribute.key == 'tokenAddress') { dynamicData.value.tokenAddress = attribute.value; }
      else if (attribute.key == 'goal') { dynamicData.value.goal = attribute.value; }
    });

    const contributorsData = await SolanaManager.getContributors(boxPublicKey);
    const token = kSupportedTokens.find(el => el.mintAddress == dynamicData.value.tokenAddress);

    // get balance from blockchain
    dynamicData.value.balance = (await SolanaManager.getWalletBalance(boxPublicKey, dynamicData.value.tokenAddress!)).uiAmount;
    dynamicData.value.withdrawn = contributorsData.withdrawn / (10 ** token!.decimals)
    // dynamicData.value.contributors = contributorsData.uniqueWalletsCount;
    // dynamicData.value.transactions = contributorsData.transactionsCount;
    dynamicData.value.contributors = contributorsData.contributors;
    dynamicData.value.uniqueWalletsCount = contributorsData.uniqueWalletsCount || null;
    dynamicData.value.transactionsCount = contributorsData.transactionsCount || null;

    console.log('mike', 'title:', dynamicData.value.title);
    console.log('mike', 'description:', dynamicData.value.description);
    console.log('mike', 'host:', dynamicData.value.host);
    console.log('mike', 'token:', dynamicData.value.token);
    console.log('mike', 'tokenAddress:', dynamicData.value.tokenAddress);
    console.log('mike', 'goal:', dynamicData.value.goal);
    console.log('mike', 'balance:', dynamicData.value.balance);
    console.log('mike', 'withdrawn:', dynamicData.value.withdrawn);
    console.log('mike', 'contributors:', dynamicData.value.contributors);
    console.log('mike', 'transactions:', dynamicData.value.transactions);
  }
}

onMounted(async () => {
  await init();
})
</script>

<style lang="scss" scoped>
.gradient-block {
  border: 3px solid transparent;
  background: linear-gradient(0deg, #fff, #fff) padding-box,
    linear-gradient(90.96deg, #59B4F8 0.96%, #D917BC 101.76%) border-box;
}
</style>
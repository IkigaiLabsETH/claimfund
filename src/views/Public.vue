<template>
  <div class="w-[100dvw] min-h-[100dvh] bg-[#00B0AF] lg:pt-[calc((100dvh_-_675px)/2)]">
    <main
      class="relative bg-white lg:rounded-2xl font-['Space_Mono'] flex flex-col lg:flex-row items-center w-full lg:max-w-[1200px] min-h-[100dvh] lg:min-h-fit lg:h-[675px] p-5 lg:p-0 lg:m-auto"
    >
      <img
        v-if="mock.image1"
        :src="'/' + mock.image1"
        class="hidden lg:block absolute w-[200px] -top-[150px] left-[calc((100%_-_200px)_/_2)]"
      />
      <div
        class="lg:bg-[#F3F4F6] lg:rounded-2xl lg:p-5 lg:w-1/2 lg:h-full flex flex-col gap-[30px] items-center mb-5 lg:mb-0"
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
              @click="useShare(item.actionLink, $route.params.public_key, dynamicData.title ?? mock.title)"
              v-html="item.text"
            ></div>
          </div>
        </div>

        <div class="flex flex-row gap-[10px] w-full lg:mt-auto">
          <div
            class="w-1/2 rounded-[20px] bg-[#F4F4F4] lg:bg-white lg:aspect-auto lg:h-[200px] lg:p-[20px] aspect-square flex flex-col justify-start items-start gap-[5px] lg:gap-3 p-[20px] text-xs lg:text-xl leading-4 lg:leading-4"
          >
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Host</div>
              <div v-html="formatWallet(dynamicData.host ?? mock.stats.host)"></div>
            </div>
          </div>

          <div
            class="w-1/2 rounded-[20px] bg-[#F4F4F4] lg:bg-white lg:aspect-auto lg:h-[200px] lg:p-[20px] aspect-square flex flex-col justify-start items-start gap-[5px] lg:gap-[15px] p-[20px] text-xs lg:text-xl leading-4 lg:leading-5"
          >
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Balance</div>
              <div
                v-html="`${useFormatter(dynamicData.balance ?? mock.stats.balance)} ${dynamicData.token ?? mock.stats.currency}`"
              ></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Withdraw</div>
              <div
                v-html="`${useFormatter(dynamicData.withdrawn ?? mock.stats.withdrawn)} ${dynamicData.token ?? mock.stats.currency}`"
              ></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Goal</div>
              <div
                v-html="`${useFormatter(+dynamicData.goal! ?? mock.stats.goal)} ${dynamicData.token ?? mock.stats.currency}`"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:w-1/2 lg:h-full flex flex-col gap-5 lg:px-[100px] lg:py-[70px]">
        <div
          class="gradient-block rounded-[20px] p-5 w-full flex flex-col gap-6 lg:gap-[30px] justify-center items-center"
        >
          <div
            class="font-bold text-base lg:text-xl lg:leading-5"
            v-html="mock.contribution.title"
          ></div>
          <div class="font-bold flex flex-col gap-[10px] justify-center items-center leading-none text-[#8F8F8F]">
            <label class="text-[30px] lg:text-[50px] leading-none flex flex-row gap-[1ch]">
              <input
                type="number"
                inputmode="decimal"
                ref="amountInput"
                @input="applyAmount"
                v-model="amount"
                min="0"
                max="9999999"
                class="w-[41px] h-[50px]"
              />
              <div v-html="dynamicData.token ?? mock.stats.currency"></div>
            </label>
            <div
              class="text-xs lg:text-base leading-none"
              v-html="mock.contribution.fee"
            ></div>
          </div>
          <div class="flex flex-row gap-[10px] justify-center items-center">
            <div
              class="p-[5px] lg:px-[20px] lg:py-[10px] rounded-[10px] lg:rounded-[20px] border border-[#8F8F8F] flex flex-col justify-center items-center text-xs lg:text-sm leading-none lg:leading-5 cursor-pointer"
              v-for="option in kSupportedTokens.find(el => el.name == dynamicData.token)?.addValueButtons ?? mock.contribution.options"
              :key="option.title"
              @click="amount = Math.round((amount + option.amount) * 1000000) / 1000000"
            >
              <div
                class="font-bold"
                v-html="option.title"
              ></div>
              <div class="text-[#8F8F8F]">{{ option.usd }}$</div>
            </div>
          </div>
        </div>

        <label
          class="w-full h-10 rounded-[5px] border border-[#8F8F8F] py-[10px] px-5 text-sm leading-5 cursor-text lg:mx-[25px] lg:w-auto lg:mt-4"
        >
          <input
            type="text"
            class="placeholder:text-[#8F8F8F] w-full h-full lg:h-fit"
            :placeholder="mock.contribution.field1Placeholder"
            v-model="field1"
            maxlength="20"
          />
        </label>

        <label
          class="w-full h-10 rounded-[5px] border border-[#8F8F8F] py-[10px] px-5 text-sm leading-5 cursor-text lg:mx-[25px] lg:w-auto"
        >
          <input
            type="text"
            class="placeholder:text-[#8F8F8F] w-full h-full lg:h-fit"
            :placeholder="mock.contribution.field2Placeholder"
            v-model="field2"
            maxlength="20"
          />
        </label>

        <div
          v-if="!publicKey"
          class="w-full p-[10px] bg-black rounded-[5px] text-white text-sm leading-5 text-center lg:mx-[25px] lg:w-auto lg:mt-5 cursor-pointer"
          v-html="mock.contribution.buttonText"
          @click="openWalletModalProvider(walletModalProviderRef)"
        ></div>
        <div
          v-else
          class="w-full p-[10px] bg-black rounded-[5px] text-white text-sm leading-5 text-center lg:mx-[25px] lg:w-auto lg:mt-5 cursor-pointer"
          @click="makeDonation"
        >Make donation</div>

        <div class="w-full h-[1px] bg-[#D7D7D7] shrink-0"></div>

        <div
          class="flex flex-row gap-[10px] justify-center items-center cursor-pointer"
          @click="contributionsPopupOpened = true"
        >
          <img src="@/assets/contribution.svg" />
          <div
            class="text-sm font-bold leading-5 text-[#8F8F8F]"
            v-html="mock.contribution.contributionsText"
          ></div>
        </div>

        <div class="w-full h-[1px] bg-[#D7D7D7]"></div>
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
import { mock } from '@/utils/mocks/public';
import { inject, nextTick, reactive, ref, watch, type Ref } from 'vue';
import { openWalletModalProvider } from '@/composables/openWalletModalProvider'
import { formatWallet } from '@/composables/formatWallet'
import { useWallet } from 'solana-wallets-vue';
import { MetaplexManager } from '@/managers/MetaplexManager';
import { SolanaManager } from '@/managers/SolanaManager';
import { Helpers } from '@/managers/Helpers';
import { useRoute, useRouter } from "vue-router";
import { kSupportedTokens } from '@/composables/Tokens';
import { showToast } from '@/composables/toast'
import ContributionsPopup from '@/components/ContributionsPopup.vue';

const route = useRoute(),
  router = useRouter();

const amount = ref(0),
  contributionsPopupOpened = ref(false),
  field1 = ref(""),
  field2 = ref(""),
  amountInput = ref(),
  walletModalProviderRef = inject('walletModalProviderRef'),
  { publicKey, disconnect, sendTransaction } = useWallet(),
  dynamicData: Ref<{
    title: null | string,
    description: null | string,
    host: null | string,
    token: null | string,
    tokenAddress: null | string,
    goal: null | string,
    balance: null | number,
    withdrawn: null | number
  }> = ref({
    title: null,
    description: null,
    host: null,
    token: null,
    tokenAddress: null,
    goal: null,
    balance: null,
    withdrawn: null,
  })

watch(amountInput, () => {
  amountInput.value.innerText = '0';
}, { once: true })

watch(amount, () => {
  nextTick(() => {
    amountInput.value.style.width = 0;
    amountInput.value.style.width = amountInput.value.scrollWidth + 10 + "px";
  })
})

const applyAmount = () => {
  console.log(amountInput.value.value > 9_999_999_999)
  if (amountInput.value.value > 9_999_999_999) return amountInput.value.value = 9_999_999_999;
}

const makeDonation = async () => {
  console.log('mike', 'makeDonation', amountInput.value.value);
  const boxPublicKey = '' + route.params.public_key;

  if (!publicKey?.value) {
    showToast('Wallet is not connected', 'error');
    return;
  }

  const transaction = await SolanaManager.makeDonation(
    publicKey.value.toBase58(),
    boxPublicKey,
    dynamicData.value.tokenAddress || '',
    amountInput.value.value,
    field1.value,
    field2.value,
  );
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
  const boxPublicKey = '' + route.params.public_key;
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

    // get balance from blockchain
    dynamicData.value.balance = (await SolanaManager.getWalletBalance(boxPublicKey, dynamicData.value.tokenAddress!)).uiAmount;
    dynamicData.value.withdrawn = (await SolanaManager.getWithdrawnAmount(boxPublicKey, dynamicData.value.tokenAddress!)).uiAmount;

    console.log('mike', 'title:', dynamicData.value.title);
    console.log('mike', 'description:', dynamicData.value.description);
    console.log('mike', 'host:', dynamicData.value.host);
    console.log('mike', 'token:', dynamicData.value.token);
    console.log('mike', 'tokenAddress:', dynamicData.value.tokenAddress);
    console.log('mike', 'goal:', dynamicData.value.goal);
    console.log('mike', 'balance:', dynamicData.value.balance);
    console.log('mike', 'withdrawn:', dynamicData.value.withdrawn);
  }
}
init();
</script>

<style lang="scss" scoped>
.gradient-block {
  border: 3px solid transparent;
  background: linear-gradient(0deg, #fff, #fff) padding-box,
    linear-gradient(90.96deg, #59B4F8 0.96%, #D917BC 101.76%) border-box;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
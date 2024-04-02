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
        <img
          v-if="mock.image2"
          :src="'/' + mock.image2"
          class="lg:mt-[13px] w-[100px] rounded-[10px]"
        />
        <div
          class="font-bold text-[10px] lg:text-2xl leading-[34px]] text-center"
          v-html="mock.title"
        ></div>
        <div
          class="text-base leading-5 text-[#656565] text-center lg:mt-2 lg:text-lg lg:leading-5"
          v-html="mock.description"
        ></div>

        <div class="text-base text-[#686868] flex flex-row items-center gap-[5px]">
          <div v-html="mock.shareTo.text"></div>
          <div class="flex flex-row gap-[inherit]">
            <div
              v-for="item in mock.shareTo.btns"
              class="p-[5px] text-white cursor-pointer"
              :style="`background-color: ${item.bgColor}`"
              @click="useShare(item.actionLink, "", mock.title)"
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
              <div v-html="mock.stats.host"></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Contributors</div>
              <div v-html="mock.stats.contributors"></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Transactions</div>
              <div v-html="mock.stats.transactions"></div>
            </div>
          </div>

          <div
            class="w-1/2 rounded-[20px] bg-[#F4F4F4] lg:bg-white lg:aspect-auto lg:h-[200px] lg:p-[20px] aspect-square flex flex-col justify-start items-start gap-[5px] lg:gap-[15px] p-[20px] text-xs lg:text-xl leading-4 lg:leading-5"
          >
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Balance</div>
              <div v-html="`${useFormatter(mock.stats.balance)} ${mock.stats.currency}`"></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Withdraw</div>
              <div v-html="`${useFormatter(mock.stats.withdrawn)} ${mock.stats.currency}`"></div>
            </div>
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Goal</div>
              <div v-html="`${useFormatter(mock.stats.goal)} ${mock.stats.currency}`"></div>
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
              <div v-html="mock.claim.balance"></div>
              <div v-html="mock.stats.currency"></div>
            </div>
          </div>
        </div>

        <div class="flex flex-row gap-[10px] justify-center items-center cursor-pointer">
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
          class="absolute bottom-[10px] left-[50px] right-[50px] font-bold text-lg leading-5 text-[#656565] text-center"
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
          @click="btn.action()"
          class="text-xs leading-none py-[6px] px-[10px] text-white bg-[#FFFFFF4D] border border-white rounded-[5px] cursor-pointer"
        ></div>
      </div>
    </main>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { useFormatter } from '@/composables/currencyFormatter';
import { useShare } from '@/composables/share';
import { mock } from '@/utils/mocks/private';
import { inject, ref, watch } from 'vue';
import { openWalletModalProvider } from '@/composables/openWalletModalProvider'
import { useWallet } from 'solana-wallets-vue';
import { formatWallet } from '@/composables/formatWallet';

const walletModalProviderRef = inject('walletModalProviderRef'),
  { publicKey, disconnect } = useWallet()

const claim = () => {
  alert('claim');
}
</script>

<style
  lang="scss"
  scoped
>
.gradient-block {
  border: 3px solid transparent;
  background: linear-gradient(0deg, #fff, #fff) padding-box,
    linear-gradient(90.96deg, #59B4F8 0.96%, #D917BC 101.76%) border-box;
}
</style>
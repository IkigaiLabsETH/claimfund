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
        <img
          v-if="mock.image2"
          :src="'/' + mock.image2"
          class="lg:mt-[52px] w-[100px] rounded-[10px]"
        />
        <div
          class="font-bold text-[10px] lg:text-2xl leading-[34px]] text-center"
          v-html="mock.title"
        ></div>
        <div
          class="text-base leading-5 text-[#656565] text-center lg:mt-2 lg:text-lg lg:leading-5"
          v-html="mock.description"
        ></div>

        <div class="flex flex-row gap-[10px] w-full lg:mt-auto">
          <div
            class="w-1/2 rounded-[20px] bg-[#F4F4F4] lg:bg-white lg:aspect-auto lg:h-[200px] lg:p-[20px] aspect-square flex flex-col justify-start items-start gap-[5px] lg:gap-3 p-[20px] text-xs lg:text-xl leading-4 lg:leading-4"
          >
            <div class="flex flex-col lg:gap-[3px]">
              <div class="font-bold">Host</div>
              <div v-html="mock.stats.host"></div>
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
              <div
                contenteditable
                inputmode="decimal"
                ref="amountInput"
                @keydown="applyAmount($event)"
              ></div>
              <div v-html="mock.stats.currency"></div>
            </label>
            <div
              class="text-xs lg:text-base leading-none"
              v-html="mock.contribution.fee"
            ></div>
          </div>
          <div class="flex flex-row gap-[10px] justify-center items-center">
            <div
              class="p-[5px] lg:px-[20px] lg:py-[10px] rounded-[10px] lg:rounded-[20px] border border-[#8F8F8F] flex flex-col justify-center items-center text-xs lg:text-sm leading-none lg:leading-5 cursor-pointer"
              v-for="option in mock.contribution.options"
              :key="option.id"
              @click="amount += option.action()"
            >
              <div
                class="font-bold"
                v-html="option.title"
              ></div>
              <div
                class="text-[#8F8F8F]"
                v-html="option.description"
              ></div>
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
          />
        </label>

        <div
          class="w-full p-[10px] bg-black rounded-[5px] text-white text-sm leading-5 text-center lg:mx-[25px] lg:w-auto lg:mt-5 cursor-pointer"
          v-html="mock.contribution.buttonText"
        ></div>

        <div class="w-full h-[1px] bg-[#D7D7D7] shrink-0"></div>

        <div class="flex flex-row gap-[10px] justify-center items-center cursor-pointer">
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
import { mock } from '@/utils/mocks';
import { Socials } from '@/utils/socials';
import { nextTick, ref, watch } from 'vue';

const amount = ref(0),
  field1 = ref(""),
  field2 = ref(""),
  amountInput = ref()

watch(amountInput, () => {
  amountInput.value.innerText = '0';
}, { once: true })

const applyAmount = (e: Event) => {
  console.log(amount.value, amountInput.value.innerText);
  amount.value = +(e.target as HTMLDivElement).innerText.replace(/\,/, '')
  amountInput.value.innerText = useFormatter(amount.value);
  console.log(amount.value, amountInput.value.innerText);
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
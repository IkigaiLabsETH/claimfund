<template>
  <main class="bg-white font-['Space_Mono'] flex flex-col gap-5 items-center w-full min-h-[100dvh] p-5">
    <div
      class="font-bold text-[10px] leading-5 text-center"
      v-html="mock.title"
    ></div>
    <img
      v-if="mock.image"
      :src="mock.image"
      class="hidden lg:block"
    />
    <div
      class="font-bold text-base leading-5 text-center"
      v-html="mock.description"
    ></div>

    <div class="flex flex-row gap-[10px] w-full">
      <div
        class="w-1/2 rounded-[20px] bg-[#F4F4F4] aspect-square flex flex-col justify-center items-center gap-[5px] p-[10px]"
      >
        <div class="flex flex-row flex-wrap justify-center items-center gap-x-[10px] gap-y-[5px]">
          <img
            v-if="mock.author.image"
            :src="mock.author.image"
            class="rounded-full w-[35px] lg:w-[50px] aspect-square"
          />
          <div
            class="font-bold text-sm leading-none"
            v-html="mock.author.name"
          ></div>
          <a
            v-for="social in mock.author.socials"
            :href="social.type"
            target="_blank"
          >
            <img
              v-if="Socials[social.type]"
              :src="Socials[social.type]"
            />
            <div
              v-else
              v-html="social.type"
            ></div>
          </a>
        </div>

        <div
          v-for="item in mock.author.boolFields"
          class="flex flex-row items-center gap-x-[10px] text-xs leading-none"
        >
          <div v-html="item.text"></div>
          <img :src="item.is ? 'boolFieldYes.svg' : 'boolFieldNo.svg'" />
        </div>
      </div>

      <div
        class="w-1/2 rounded-[20px] bg-[#F4F4F4] aspect-square flex flex-col justify-center items-start gap-[5px] p-[10px]"
      >
        <div class="flex flex-col text-xs leading-4">
          <div class="text-[#686868]">Balance</div>
          <div
            class="font-bold"
            v-html="`${useFormatter(mock.stats.balance)} ${mock.stats.currency}`"
          ></div>
        </div>
        <div class="w-full h-[1px] bg-[#D7D7D7]"></div>
        <div class="flex flex-col text-xs leading-4">
          <div class="text-[#686868]">Withdraw</div>
          <div
            class="font-bold"
            v-html="`${useFormatter(mock.stats.withdrawn)} ${mock.stats.currency}`"
          ></div>
        </div>
        <div class="w-full h-[1px] bg-[#D7D7D7]"></div>
        <div class="flex flex-col text-xs leading-4">
          <div class="text-[#686868]">Goal</div>
          <div
            class="font-bold"
            v-html="`${useFormatter(mock.stats.goal)} ${mock.stats.currency}`"
          ></div>
        </div>
      </div>
    </div>

    <div class="gradient-block rounded-[20px] p-5 w-full flex flex-col gap-6 justify-center items-center">
      <div
        class="font-bold text-base"
        v-html="mock.contribution.title"
      ></div>
      <div class="font-bold flex flex-col gap-[10px] justify-center items-center leading-none text-[#8F8F8F]">
        <label class="text-[30px] flex flex-row gap-[1ch]">
          <div
            contenteditable
            inputmode="decimal"
            ref="amountInput"
            @keydown="applyAmount($event)"
          ></div>
          <div v-html="mock.stats.currency"></div>
        </label>
        <div
          class="text-xs"
          v-html="mock.contribution.fee"
        ></div>
      </div>
      <div class="flex flex-row gap-[10px] justify-center items-center">
        <div
          class="p-[5px] rounded-[10px] border border-[#8F8F8F] flex flex-col justify-center items-center text-xs leading-none cursor-pointer"
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

    <label class="w-full h-10 rounded-[5px] border border-[#8F8F8F] py-[10px] px-5 text-sm leading-5 cursor-text">
      <input
        type="text"
        class="placeholder:text-black w-full h-full"
        :placeholder="mock.contribution.field1Placeholder"
        v-model="field1"
      />
    </label>

    <label class="w-full h-10 rounded-[5px] border border-[#8F8F8F] py-[10px] px-5 text-sm leading-5 cursor-text">
      <input
        type="text"
        class="placeholder:text-black w-full h-full"
        :placeholder="mock.contribution.field2Placeholder"
        v-model="field2"
      />
    </label>

    <div
      class="w-full p-[10px] bg-black rounded-[5px] text-white text-sm leading-5 text-center"
      v-html="mock.contribution.buttonText"
    ></div>

    <div class="w-full h-[1px] bg-[#D7D7D7]"></div>

    <div class="flex flex-row gap-[10px] justify-center items-center cursor-pointer">
      <img src="@/assets/contribution.svg" />
      <div
        class="text-sm font-bold leading-5 text-[#8F8F8F]"
        v-html="mock.contribution.contributionsText"
      ></div>
    </div>

    <div class="w-full h-[1px] bg-[#D7D7D7]"></div>

    <div
      class="text-xs leading-4 text-center"
      v-html="mock.smallFontTextsUnderMainElementThatSayYouAreObligedToSellYourSoulToTheDevilAfterTransaction.text"
    ></div>
  </main>
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
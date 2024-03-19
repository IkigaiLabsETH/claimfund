<template>
  <div class="w-[100dvw] min-h-[100dvh] bg-[#00B0AF] lg:pt-[calc((100dvh_-_675px)/2)]">
    <main
      class="relative bg-white lg:rounded-2xl font-['Space_Mono'] flex flex-col lg:flex-row items-center w-full lg:max-w-[1200px] min-h-[100dvh] lg:min-h-fit lg:h-[675px] p-5 lg:p-0 lg:m-auto"
    >
      <img
        v-if="stage == 2 && mock.image"
        :src="'/' + mock.image"
        class="hidden lg:block absolute w-[200px] -top-[150px] left-[calc((100%_-_200px)_/_2)]"
      />
      <div
        class="lg:bg-[#F3F4F6] lg:rounded-2xl lg:p-[50px] lg:w-1/2 lg:h-full flex flex-col gap-[30px] justify-center mb-5 lg:mb-0"
        :class="{ 'items-center': stage !== 2 }"
      >
        <template v-if="stage !== 2">
          <img
            v-if="mock.image"
            :src="mock.image"
            class="lg:mt-5"
          />
        </template>
        <template v-else>

          <div
            class="font-bold text-2xl leading-none"
            v-html="mock.share.title"
          ></div>
          <div
            class="text-base text-[#686868]"
            v-html="mock.share.description"
          ></div>

          <div class="text-base text-[#686868] flex flex-row items-center gap-[5px]">
            <div v-html="mock.share.shareTo.text"></div>
            <div class="flex flex-row gap-[inherit]">
              <div
                v-for="item in mock.share.shareTo.btns"
                class="p-[5px] text-white cursor-pointer"
                :style="`background-color: ${item.bgColor}`"
                @click="item.actionLink"
                v-html="item.text"
              ></div>
            </div>
          </div>

          <div
            class="w-full h-[40px] border border-[#8F8F8F] rounded-[5px] px-5 py-2.5 flex flex-row justify-between items-center cursor-pointer"
          >
            https://claim.fund/box/{public key}
            <img
              src="@/assets/copy.svg"
              class="w-5 h-5"
            />
          </div>
        </template>
      </div>

      <div
        class="lg:w-1/2 lg:h-auto flex flex-col gap-[30px] lg:py-[70px]"
        :class="{ 'lg:px-[125px]': stage !== 2, 'lg:px-[50px]': stage == 2 }"
      >
        <template v-if="stage == 0">
          <div
            class="font-bold text-2xl leading-none"
            v-html="mock.setup.welcomingPhrase"
          ></div>
          <div class="flex flex-col gap-[10px]">
            <label class="w-full h-[40px] border border-[#8F8F8F] rounded-[5px] px-5 py-2.5 flex items-center">
              <input
                type="text"
                :placeholder="mock.setup.titlePlaceholder"
                v-model="setup.title"
                class="placeholder:text-[#8F8F8F] w-full h-auto"
              />
            </label>
            <label class="w-full border border-[#8F8F8F] rounded-[5px] px-5 py-2.5 flex items-center">
              <textarea
                :placeholder="mock.setup.descriptionPlaceHolder"
                v-model="setup.description"
                class="placeholder:text-[#8F8F8F] w-full h-auto resize-none"
                rows="5"
              ></textarea>
            </label>
            <div class="flex flex-row gap-[inherit]">
              <label class="w-full h-[40px] border border-[#8F8F8F] rounded-[5px] px-5 py-2.5 flex items-center">
                <input
                  type="text"
                  :placeholder="mock.setup.goalPlaceholder"
                  v-model="setup.title"
                  class="placeholder:text-[#8F8F8F] w-full h-auto"
                />
              </label>
              <label class="w-full h-[40px] border border-[#8F8F8F] rounded-[5px] px-5 py-2.5 flex items-center">
                <select
                  v-model="setup.token"
                  class="w-full h-auto bg-transparent"
                  :class="{ 'text-[#8F8F8F]': setup.token == '' }"
                >
                  <option value="">{{ mock.setup.tokens.placeholder }}</option>
                  <option
                    v-for="option in mock.setup.tokens.options"
                    :value="option"
                  >{{ option }}</option>
                </select>
              </label>
            </div>
          </div>

          <div class="w-full h-[1px] bg-[#D7D7D7]"></div>

          <div
            class="w-full p-[10px] bg-black rounded-[5px] text-white text-sm leading-5 text-center lg:w-auto cursor-pointer"
            v-html="mock.setup.connectWalletBtnText"
          ></div>
        </template>
        <template v-else-if="stage == 1">
          <SpinnerDiamond class="self-center" />
        </template>
        <template v-else-if="stage == 2">
          <div class="font-bold text-2xl leading-none">{{ mock.privateZone.title }}</div>
          <div
            class="text-base text-[#686868]"
            v-html="mock.privateZone.description"
          ></div>

          <div
            class="w-full h-[40px] border border-[#8F8F8F] rounded-[5px] px-5 py-2.5 flex flex-row justify-between items-center cursor-pointer"
          >
            https://claim.fund/manage/{private key}
            <img
              src="@/assets/copy.svg"
              class="w-5 h-5"
            />
          </div>
        </template>
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
import SpinnerDiamond from '@/components/SpinnerDiamond.vue';
import { useFormatter } from '@/composables/currencyFormatter';
import { mock } from '@/utils/mocks/create';
import { ref, watch } from 'vue';

const stage = ref(0),
  setup = ref({
    title: "",
    description: "",
    goal: "",
    token: "",
    email: ""
  })
</script>
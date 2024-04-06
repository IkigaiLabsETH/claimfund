<template>
  <div class="w-[100dvw] min-h-[100dvh] bg-[#00B0AF] lg:pt-[calc((100dvh_-_675px)/2)]">
    <main
      class="relative bg-white lg:rounded-2xl font-['Space_Mono'] flex flex-col lg:flex-row items-center w-full lg:max-w-[1200px] min-h-[100dvh] lg:min-h-fit lg:h-[675px] p-5 lg:p-0 lg:m-auto"
    >
      <img
        v-if="mock.image"
        :src="'/' + mock.image"
        class="lg:absolute w-[100px] lg:w-[200px] lg:-top-[150px] lg:left-[calc((100%_-_200px)_/_2)]"
      />
      <div
        class="lg:bg-[#F3F4F6] lg:rounded-2xl lg:py-[120px] lg:px-[140px] w-full lg:h-full flex flex-col gap-[50px] items-center mb-5 lg:mb-0"
      >
        <div
          class="font-bold text-base lg:text-[40px] leading-5 lg:leading-none text-center"
          v-html="mock.title"
        ></div>
        <div
          class="text-xs leading-5 text-[#656565] text-center lg:mt-2 lg:text-[30px] lg:leading-[50px]"
          v-html="mock.description"
        ></div>
        <div class="flex flex-col lg:flex-row gap-x-10 gap-y-[5px] justify-center items-center">
          <div class="text-[#656565] lg:mt-2 text-xs lg:text-[20px] leading-5 lg:leading-5" v-html="mock.funded"></div>
          <img
            :src="mock.fundedImage"
            class="w-[140px] lg:w-[372px]"
          />
        </div>
        <div
          class="w-full p-[10px] bg-black rounded-[5px] text-white text-sm leading-5 text-center lg:mx-[25px] lg:w-[350px] cursor-pointer"
          v-html="mock.btnText"
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
import { mock } from '@/utils/mocks/home';
</script>
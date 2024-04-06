<template>
  <div class="w-[100dvw] min-h-[100dvh] bg-black lg:pt-[calc((100dvh_-_675px)/2)]">
    <main
      class="relative bg-white lg:rounded-2xl font-['Space_Mono'] flex flex-col lg:flex-row items-center w-full lg:max-w-[1200px] min-h-[100dvh] lg:min-h-fit lg:h-[675px] p-5 lg:p-0 lg:m-auto"
    >
      <img
        v-if="mock.image"
        :src="'/' + mock.image"
        class="lg:absolute w-[100px] lg:w-[200px] lg:-top-[150px] lg:left-[calc((100%_-_200px)_/_2)]"
      />
      <div
        class="lg:rounded-2xl h-auto m-auto lg:py-[120px] lg:px-[140px] w-full flex flex-col gap-[50px] items-center"
      >
        <div
          class="font-bold text-base lg:text-[40px] leading-5 lg:leading-none text-center"
          v-html="mock.title"
        ></div>
        <div
          class="text-xs leading-5 text-[#656565] text-center lg:mt-2 lg:text-[30px] lg:leading-[50px]"
          v-html="mock.description"
        ></div>
        <RouterLink
          class="w-full p-[10px] bg-black rounded-[5px] text-white text-sm leading-5 text-center lg:mx-[25px] lg:w-[350px] cursor-pointer no-underline"
          v-html="mock.btnText"
          to="home"
        ></RouterLink>
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
import { mock } from '@/utils/mocks/error';
</script>
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
          <div class="font-bold text-sm leading-none">{{ mock.author.name }}</div>
          <a
            v-for="social in mock.author.socials"
            :href="social.type"
            target="_blank"
          >
            <img
              v-if="Socials[social.type]"
              :src="Socials[social.type]"
            />
            <div v-else>{{ social.type }}</div>
          </a>
        </div>

        <div
          v-for="item in mock.author.boolFields"
          class="flex flex-row items-center gap-x-[10px] text-xs leading-none"
        >
          {{ item.text }}
          <img :src="item.is ? 'boolFieldYes.svg' : 'boolFieldNo.svg'" />
        </div>
      </div>

      <div
        class="w-1/2 rounded-[20px] bg-[#F4F4F4] aspect-square flex flex-col justify-center items-start gap-[5px] p-[10px]"
      >
        <div class="flex flex-col text-xs leading-4">
          <div class="text-[#686868]">Balance</div>
          <div class="font-bold">{{ mock.stats.balance }} {{ mock.stats.currency }}</div>
        </div>
        <div class="w-full h-[1px] bg-[#D7D7D7]"></div>
        <div class="flex flex-col text-xs leading-4">
          <div class="text-[#686868]">Withdraw</div>
          <div class="font-bold">{{ mock.stats.withdrawn }} {{ mock.stats.currency }}</div>
        </div>
        <div class="w-full h-[1px] bg-[#D7D7D7]"></div>
        <div class="flex flex-col text-xs leading-4">
          <div class="text-[#686868]">Goal</div>
          <div class="font-bold">{{ mock.stats.goal }} {{ mock.stats.currency }}</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script
  setup
  lang="ts"
>
import { mock } from '@/utils/mocks';
import { Socials } from '@/utils/socials';
</script>

<style
  lang="scss"
  scoped
></style>
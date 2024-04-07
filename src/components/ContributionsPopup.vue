<template>
  <div
    class="fixed left-0 top-0 bg-[#000000CC] w-[100dvw] h-[100dvh] duration-500 flex justify-center cursor-pointer"
    :class="{ 'z-10 opacity-100': props.isModalOpened, '-z-[1] opacity-0': !props.isModalOpened }"
    @click="emits('close')"
  >
    <div
      class="w-[90%] lg:w-[470px] mt-20 p-5 max-h-[400px] overflow-y-auto bg-[#181B208C] backdrop-blur-[20px] border border-[#FFFFFF1A] flex flex-col gap-2.5 duration-500 cursor-auto"
      :class="{ 'scale-100 opacity-100': props.isModalOpened, 'scale-50 opacity-50': !props.isModalOpened }"
      v-if="mock.contributions"
      @click.stop
    >
      <div class="text-white">{{ mock.heading }}</div>
      <div
        v-for="item in mock.contributions"
        class="flex flex-row gap-5 text-[#FFFFFF4D]"
      >
        <div class="flex-shrink-0">{{ formatWallet(item.wallet) }}</div>
        <div class="text-white flex-shrink-0">{{ item.amount }}</div>
        <div v-if="item.name">{{ item.name }}</div>
        <div
          v-if="item.comment"
          class="ml-auto text-wrap break-all"
        >{{ item.comment }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatWallet } from '@/composables/formatWallet';
import { mock } from '@/utils/mocks/contributions';
import { defineProps, ref } from 'vue';

const props = defineProps(['isModalOpened'])
const emits = defineEmits(['close'])
</script>
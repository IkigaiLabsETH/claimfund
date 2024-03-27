<script
  setup
  lang="ts"
>
import { WalletModalProvider } from "solana-wallets-vue";
import { provide, ref } from "vue";
import { RouterLink, RouterView } from 'vue-router'

let walletModalProviderRef = ref()

provide('walletModalProviderRef', walletModalProviderRef)
</script>

<template>
  <div>
    <RouterView />
    <WalletModalProvider
      dark
      ref="walletModalProviderRef"
    ></WalletModalProvider>
  </div>
</template>

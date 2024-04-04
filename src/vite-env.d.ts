/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_SOLANA_RPC: string
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
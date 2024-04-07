import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-node-polyfills";
import inject from '@rollup/plugin-inject'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      assert: "assert",
      crypto: "crypto-browserify",
      util: "util",
      'near-api-js': 'near-api-js/dist/near-api-js.js',
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    "process.env": process.env ?? {},
  },
  build: {
    target: "esnext",
    rollupOptions: {
      plugins: [
        inject({ Buffer: ['Buffer', 'Buffer'] }),
        nodePolyfills({ crypto: true, buffer: true })
      ],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
            process: true,
            buffer: true
        })
      ],
    },
  },
})

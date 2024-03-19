<template>
  <div class="flex flex-col gap-4 justify-center items-center w-[100dvw] h-[100dvh] text-3xl">
    <div>index page</div>

    <RouterLink
      v-for="link in ['public', 'create', 'private']"
      :to="{
        name: link,
        params:
          link !== 'create' ?
            { [link == 'public' ? 'public_key' : 'private_key']: 1 } :
            undefined
      }"
    >{{ link }} page</RouterLink>
  </div>
</template>

<script
  setup
  lang="ts"
>
</script>
<script lang="ts" setup>
const props = defineProps({ variant: String })
const all_variants = ['success', 'error']
</script>

<template>
  <div
    class="bg-green-700 w-[20%] h-[3rem] flex justify-center shadow-md items-center rounded-xl bottom-9 right-40 absolute"
    v-if="props.variant === all_variants[0]"
  >
    <h1 class="text-black text-2xl font-bold">{{ all_variants[0] }}</h1>
  </div>

  <div
    class="bg-green-700 w-[20%] h-[3rem] flex justify-center shadow-md items-center rounded-xl bottom-9 right-40 absolute"
    v-if="props.variant === all_variants[1]"
  >
    <h1 class="text-black text-2xl font-bold">{{ all_variants[1] }}</h1>
  </div>
</template>

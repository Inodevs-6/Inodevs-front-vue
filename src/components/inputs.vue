<template>
  <div class="w-1/3 flex flex-col">
    <span
      class="bg-[#FFD600] w-[7rem] font-semibold top-[7.5rem] shadow-md rounded-lg ml-4 absolute text-center"
    >
      {{ props.label }}
    </span>
    <input class="bg-[#2A753D] w-full h-11 p-2 shadow-md outline-none rounded-xl text-[#FFF]" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({ label: String })
</script>

<script setup lang="ts">
const props = defineProps({ name: String , estilo : String})
</script>
<template>
  <span
    :class=props.estilo
  >
    {{ props.name }}
  </span>
</template>

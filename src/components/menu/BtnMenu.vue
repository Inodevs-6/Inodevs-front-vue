<template >
    <!-- <div class=""> -->
    <img alt="Vue logo" 
    class="logo" 
    :src="props.caminho"
    width="40" height="40" />
    <!-- </div>  -->
</template>
<script lang="ts" setup>
const props = defineProps({'caminho': String})
</script>  

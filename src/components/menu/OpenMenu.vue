<template >
    <div class="bg-[#CCFF00] h-screen w-[5rem] fixed justify-start flex-col gap-6 p-2 items-center flex ">
       <BtnMenu caminho="/src/assets/logo.svg"/> 
       <BtnMenu caminho="/src/assets/Bell.svg"/> 
       <BtnMenu caminho="/src/assets/Home.svg"/> 
       <BtnMenu caminho="/src/assets/Sum.svg"/> 
      <div class="flex absolute bottom-2 mb-[0.7rem]  cursor-pointer  flex-row gap-5">
        <img alt="Vue logo" 
    class="logo" 
    src="../../assets/Export.svg"
    width="40" height="40" />
      </div>
    </div>
</template>
<script lang="ts" setup>
import BtnMenu from "@/components/menu/BtnMenu.vue";
</script>

<script lang="ts" setup>
import OpenMenu from '@/components/menu/OpenMenu.vue'
</script>

<template>
  <div class="bg-white relative flex w-screen overflow-x-hidden overflow-y-scroll h-screen">
    <OpenMenu />
    <div class="flex xl:ml-[5rem] w-screen items-center flex-col bg-white">
      <h1
        class="text-center font-medium xl:text-3xl text-xl xl:mt-7 mt-3 flex w-full h-10 justify-center items-center"
      >
        Vagas
      </h1>
      <span
        class="bg-[#FFD600] w-[7rem] absolute top-[6.7rem] left-[9rem] font-semibold shadow-md rounded-lg text-center z-10"
      >
        Vaga
      </span>
      <span
        class="bg-[#FFD600] w-[7rem] absolute top-[6.7rem] right-[32rem] font-semibold shadow-md rounded-lg text-center z-10"
      >
        Nivel
      </span>
      <span
        class="bg-[#FFD600] w-[7rem] absolute top-[6.7rem] right-[6rem] font-semibold shadow-md rounded-lg text-center z-10"
      >
        Visualizar
      </span>
      <div
        class="xl:w-[88vw] h-[79vh] w-[90%] relative overflow-auto flex flex-col gap-10 p-4 mt-[3rem] bg-[#1DEEA3] shadow-md bg-opacity-30 rounded-2xl"
      >
        <div class="h-[3rem] text-white font-bold w-full flex-row flex justify-between items-center rounded-lg bg-[#2A753D]">
          <div>
            <span> Frontend Developer </span>
          </div>
          <div>
            <span> Senior </span>
          </div>
          <div>
            <img
              alt="Vue logo"
              class="hover:bg-[#f3f048f9] rounded-xl"
              src="/assets/eye.svg"
              width="30"
              height="30"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

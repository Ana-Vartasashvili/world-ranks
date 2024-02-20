<script setup lang="ts">
import Filterbar from '../components/home/Filterbar.vue'
</script>

<template>
  <main class="bg-wr-grey-600 p-7 rounded-lg w-11/12 border border-wr-grey-300 border-opacity-35">
    <div class="flex justify-between items-center w-full">
      <span class="text-wr-grey-400 font-semibold opacity-55 text-sm md:text-base"
        >Found 234 countries</span
      >

      <div class="bg-wr-grey-500 w-fit flex p-3 rounded-xl gap-2 md:min-w-96">
        <img src="../assets/icons/search.svg" alt="search icon" class="w-fit" />
        <input
          type="text"
          placeholder="Search"
          class="bg-wr-grey-500 outline-none w-full text-sm"
        />
      </div>
    </div>

    <Filterbar />
  </main>
</template>

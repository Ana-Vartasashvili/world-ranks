<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="relative">
    <img src="./assets/images/heroImage.jpg" alt="earth" class="w-full h-72 object-cover" />
    <img
      src="./assets/icons/wrLogo.svg"
      alt="world ranks logo"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  </div>

  <RouterView class="absolute top-56 left-1/2 -translate-x-1/2 font-vietnam-pro" />
</template>

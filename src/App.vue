<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainCard from '@/components/UI/MainCard.vue'
</script>

<template>
  <MainCard>
    <RouterView class="absolute top-56 left-1/2 -translate-x-1/2 font-vietnam-pro" />
  </MainCard>
</template>

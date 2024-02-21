<script setup lang="ts">
import CountriesList from '@/components/home/CountriesList.vue'
import Filterbar from '@/components/home/Filterbar.vue'
import Pagination from '@/components/home/Pagination.vue'
import { useCountriesStore } from '@/stores/countriesStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const store = useCountriesStore()
const { countries, isLoading } = storeToRefs(store)

const countriesFields = ['flags', 'name', 'population', 'area', 'region']
const currentPage = ref(1)
const pageSize = ref(10)

onMounted(() => {
  store.fetchCountries(countriesFields)
})

const paginatedCountries = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return countries.value.slice(startIndex, endIndex)
})
</script>

<template>
  <main
    class="bg-wr-grey-600 p-7 rounded-lg w-11/12 border border-wr-grey-300 border-opacity-35 max-w-300"
  >
    <div class="flex justify-between items-center w-full">
      <span class="text-wr-grey-400 font-semibold opacity-55 text-sm md:text-base"
        >Found {{ countries?.length || 0 }} countries</span
      >

      <div class="bg-wr-grey-500 w-fit flex p-2 rounded-xl gap-2 md:min-w-72">
        <img src="../assets/icons/search.svg" alt="search icon" class="w-fit" />
        <input
          type="text"
          placeholder="Search"
          class="bg-wr-grey-500 outline-none w-full text-xs"
        />
      </div>
    </div>

    <div class="flex gap-8 mt-7">
      <Filterbar />
      <CountriesList :countries="paginatedCountries" :is-loading="isLoading" />
    </div>

    <Pagination
      v-model:currentPage="currentPage"
      :page-size="pageSize"
      :total-items="countries.length"
    />
  </main>
</template>

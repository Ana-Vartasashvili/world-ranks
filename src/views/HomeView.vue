<script setup lang="ts">
import CountriesList from '@/components/home/CountriesList.vue'
import Filterbar from '@/components/home/Filterbar.vue'
import Pagination from '@/components/home/Pagination.vue'
import type { Country } from '@/models/countries'
import { SortByOption } from '@/models/filterbar'
import { useCountriesStore } from '@/stores/countriesStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, type ComputedRef } from 'vue'

const store = useCountriesStore()
const { allCountries, filteredCountries, isLoading } = storeToRefs(store)

const countriesFields = ['flags', 'name', 'population', 'area', 'region']
const currentPage = ref(1)
const pageSize = ref(10)

onMounted(() => {
  store.fetchCountries(countriesFields)
})

const countries: ComputedRef<Country[]> = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return filteredCountries.value.slice(startIndex, endIndex)
})

const searchCountry = (event: Event) => {
  const searchedCountry = (event.target as HTMLInputElement).value
  currentPage.value = 1

  filteredCountries.value = allCountries.value.filter((country) =>
    country.name.common.toLowerCase().includes(searchedCountry.toLowerCase())
  )
}

const sortCountries = (sortBy: SortByOption) => {
  if (sortBy === SortByOption.Alphabetical) {
    sortCountriesAlphabetically()
  } else if (sortBy === SortByOption.Population) {
    sortCountriesByPopulation()
  } else if (sortBy === SortByOption.Area) {
    sortCountriesByArea()
  }
}

const sortCountriesAlphabetically = () => {
  filteredCountries.value.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1
    } else if (a.name.common > b.name.common) {
      return 1
    } else {
      return 0
    }
  })
}

const sortCountriesByPopulation = () => {
  filteredCountries.value.sort((a, b) => b.population - a.population)
}

const sortCountriesByArea = () => {
  filteredCountries.value.sort((a, b) => b.area - a.area)
}
</script>

<template>
  <main
    class="bg-wr-grey-600 p-7 rounded-lg w-11/12 border border-wr-grey-300 border-opacity-35 max-w-300"
  >
    <div class="flex justify-between items-center w-full">
      <span class="text-wr-grey-400 font-semibold opacity-55 text-sm md:text-base"
        >Found {{ filteredCountries?.length || 0 }} countries</span
      >

      <div class="bg-wr-grey-500 w-fit flex p-2 rounded-xl gap-2 md:min-w-72">
        <img src="../assets/icons/search.svg" alt="search icon" class="w-fit" />
        <input
          type="text"
          placeholder="Search"
          class="bg-wr-grey-500 outline-none w-full text-xs"
          @input="searchCountry"
        />
      </div>
    </div>

    <div class="flex gap-8 mt-7">
      <Filterbar @sort-by-change="sortCountries" />
      <CountriesList :countries="countries" :is-loading="isLoading" />
    </div>

    <Pagination
      v-model:currentPage="currentPage"
      :page-size="pageSize"
      :total-items="filteredCountries.length"
    />
  </main>
</template>

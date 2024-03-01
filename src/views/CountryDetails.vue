<script setup lang="ts">
import { COUNTRY_FIELDS } from '@/CONST/countryFields'
import type { Country } from '@/models/countries'
import { useCountriesStore } from '@/stores/countriesStore'
import { addCommasInsideNumber } from '@/utils/formatNumber'
import { storeToRefs } from 'pinia'
import { defineProps, onMounted } from 'vue'

const props = defineProps<{ name: string }>()

const store = useCountriesStore()
const { allCountries, currentCountry, isLoading } = storeToRefs(store)

onMounted(() => {
  if (allCountries.value.length > 0) {
    currentCountry.value = allCountries.value.find(
      (country) => country.name.common === 'greece'
    ) as Country
  } else {
    store.fetchCountry(props.name, COUNTRY_FIELDS)
  }
})

const getLanguagesString = (languages: { [key: string]: string }) => {
  if (!languages) return ''

  const languageFullNames = Object.values(languages)
  return languageFullNames.join(', ')
}

const getCurrenciesString = (currencies: Country['currencies']) => {
  if (!currencies) return ''

  const currencyNames = Object.keys(currencies).map((currency) => currency)
  return currencyNames.join(', ')
}
</script>

<template>
  <main
    class="bg-wr-grey-600 py-7 rounded-lg w-6/12 border border-wr-grey-300 border-opacity-35 max-w-200 mt-7 text-wr-grey-400"
  >
    <div
      v-if="isLoading"
      class="mx-auto w-64 -mt-20 h-40 rounded-lg bg-wr-grey-600 border border-wr-grey-300 border-opacity-35"
    ></div>
    <img
      v-else
      :src="currentCountry?.flags?.png"
      :alt="(currentCountry?.name?.common || '') + ' flag'"
      width="250"
      class="mx-auto w-64 -mt-20 rounded-lg"
    />

    <p class="text-center mt-7 text-3xl font-semibold">
      {{ currentCountry?.name?.common }}
    </p>
    <p class="text-center mt-1">{{ currentCountry?.name?.official }}</p>

    <div class="mt-10 flex gap-9 mx-auto w-fit">
      <div class="bg-wr-grey-500 w-fit rounded-lg py-2 px-2 flex items-center">
        <p class="border-r-2 border-r-gray-900 py-1 px-4">Population</p>
        <p v-if="!isLoading" class="py-1 px-4">
          {{ addCommasInsideNumber(currentCountry?.population, 3) }}
        </p>
      </div>

      <div class="bg-wr-grey-500 w-fit rounded-lg py-2 px-2 flex items-center">
        <p class="border-r-2 border-r-gray-900 py-1 px-4">Area (km&#178;)</p>
        <p v-if="!isLoading" class="py-1 px-4">
          {{ addCommasInsideNumber(currentCountry?.area, 3) }}
        </p>
      </div>
    </div>

    <ul class="my-10 font-semibold text-sm">
      <li class="border-y border-wr-grey-300 border-opacity-35 flex justify-between px-7 py-5">
        <span class="text-wr-grey-300">Capital</span>
        <span v-if="!isLoading">{{ currentCountry?.capital?.[0] }}</span>
      </li>

      <li class="border-y border-wr-grey-300 border-opacity-35 flex justify-between px-7 py-5">
        <span class="text-wr-grey-300">Subregion</span>
        <span v-if="!isLoading">{{ currentCountry?.subregion }}</span>
      </li>

      <li class="border-y border-wr-grey-300 border-opacity-35 flex justify-between px-7 py-5">
        <span class="text-wr-grey-300">Languages</span>
        <span v-if="!isLoading">{{ getLanguagesString(currentCountry?.languages) }}</span>
      </li>

      <li class="border-y border-wr-grey-300 border-opacity-35 flex justify-between px-7 py-5">
        <span class="text-wr-grey-300">Currencies</span>
        <span v-if="!isLoading">{{ getCurrenciesString(currentCountry?.currencies) }}</span>
      </li>

      <li class="border-y border-wr-grey-300 border-opacity-35 flex justify-between px-7 py-5">
        <span class="text-wr-grey-300">Continents</span>
        <span v-if="!isLoading">{{ getLanguagesString(currentCountry?.languages) }}</span>
      </li>
    </ul>
  </main>
</template>

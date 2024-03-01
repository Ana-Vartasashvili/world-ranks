t
<script setup lang="ts">
import type { Country } from '@/models/countries'
import { addCommasInsideNumber } from '@/utils/formatNumber'
import { useRouter } from 'vue-router'
import CountriesListItemPlaceholder from './CountriesListItemPlaceholder.vue'

const props = defineProps<{ countries: Country[]; isLoading: boolean }>()
const router = useRouter()

const navigateToCountryDetails = (countryName: string) => {
  router.push({ name: 'country', params: { name: countryName } })
}
</script>

<template>
  <div class="w-full overflow-auto h-fit">
    <table class="w-full h-fit overflow-auto">
      <thead class="mb-4 border-b-2 border-wr-grey-500">
        <tr class="pb-3">
          <th class="text-start text-xxs pb-3 pr-3">Flag</th>
          <th class="text-start text-xxs pb-3 pr-3">Name</th>
          <th class="text-start text-xxs pb-3 pr-3">Population</th>
          <th class="text-start text-xxs pb-3 pr-3">Area (km&#178;)</th>
          <th class="text-start text-xxs pb-3 pr-3">Region</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="country in props.countries"
          :key="country.name.official"
          @click="navigateToCountryDetails(country.name.common)"
          class="cursor-pointer"
        >
          <td class="py-3 pr-3">
            <img
              :src="country?.flags?.png"
              :alt="country.name.common + ' flag'"
              width="40"
              height="20"
              class="rounded-sm w-11 h-7 min-w-11"
            />
          </td>
          <td class="py-3 pr-3 text-nowrap">{{ country.name.common }}</td>
          <td class="py-3 pr-3">{{ addCommasInsideNumber(country.population, 3) }}</td>
          <td class="py-3 pr-3">{{ addCommasInsideNumber(country.area, 3) }}</td>
          <td class="py-3 pr-3">{{ country.region }}</td>
        </tr>

        <template v-if="props.isLoading">
          <CountriesListItemPlaceholder v-for="item in 10" />
        </template>

        <div v-if="!props.isLoading && countries.length === 0" class="mt-2">No countries found</div>
      </tbody>
    </table>
  </div>
</template>

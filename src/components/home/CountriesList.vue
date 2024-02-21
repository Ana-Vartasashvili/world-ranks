<script setup lang="ts">
import type { Country } from '@/models/countries'
import CountriesListItemPlaceholder from './CountriesListItemPlaceholder.vue'

const props = defineProps<{ countries: Country[]; isLoading: boolean }>()
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
        <tr v-for="country in props.countries" :key="country.name.official">
          <td class="py-3 pr-3">
            <img
              :src="country?.flags?.png"
              :alt="country.name.common + ' flag'"
              width="40"
              class="rounded-sm"
            />
          </td>
          <td class="py-3 pr-3">{{ country.name.common }}</td>
          <td class="py-3 pr-3">{{ country.population }}</td>
          <td class="py-3 pr-3">{{ country.area }}</td>
          <td class="py-3 pr-3">{{ country.region }}</td>
        </tr>

        <template v-if="props.isLoading">
          <CountriesListItemPlaceholder v-for="item in 10" />
        </template>
      </tbody>
    </table>
  </div>
</template>

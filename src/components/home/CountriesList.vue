<script setup lang="ts">
import CountriesListItemPlaceholder from './CountriesListItemPlaceholder.vue'
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
        <tr>
          <td class="py-3 pr-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/1200px-Flag_of_Georgia.svg.png"
              alt="flag"
              width="40"
              class="rounded-sm"
            />
          </td>
          <td class="py-3 pr-3">Georgia</td>
          <td class="py-3 pr-3">3,000,343</td>
          <td class="py-3 pr-3">3,234,343</td>
          <td class="py-3 pr-3">Europe</td>
        </tr>

        <CountriesListItemPlaceholder v-for="item in 10" />
      </tbody>
    </table>
  </div>
</template>

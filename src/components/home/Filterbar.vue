<script setup lang="ts">
import type { Region } from 'src/models/filterbar'
import { reactive } from 'vue'

const regions = reactive([
  { value: 'Americas', isSelected: false },
  { value: 'Antarctic', isSelected: false },
  { value: 'Africa', isSelected: false },
  { value: 'Asia', isSelected: false },
  { value: 'Europe', isSelected: false },
  { value: 'Oceania', isSelected: false },
])
const selectedRegions: Region[] = []

const toggleRegion = (toggledRegion: Region, index: number) => {
  const toggledRegionIndex = selectedRegions.findIndex((region) => region === toggledRegion)

  if (toggledRegionIndex !== -1) {
    selectedRegions.splice(toggledRegionIndex, 1)
    regions[index].isSelected = false
  } else {
    selectedRegions.push(toggledRegion)
    regions[index].isSelected = true
  }
}

const emitSortType = (event: Event) => {}
</script>

<template>
  <form class="flex flex-col gap-5">
    <div class="flex flex-col w-fit gap-1">
      <label for="sortBy" class="text-xxs text-wr-grey-400 opacity-85">Sort by</label>
      <select
        name="sortBy"
        id="sortBy"
        class="text-xs bg-wr-grey-600 cursor-pointer border border-wr-grey-300 border-opacity-65 rounded-md py-2 px-3 w-52 focus:outline-none"
        @input="emitSortType"
      >
        <option value="alphabetical">Alphabetical</option>
        <option value="population" selected>Population</option>
        <option value="area">Area (km&#178;)</option>
      </select>
    </div>

    <div class="flex flex-col gap-1">
      <label for="region" class="text-xxs text-wr-grey-400 opacity-85">Region</label>
      <ul class="flex max-w-56 flex-wrap items-center gap-1">
        <li
          v-for="(region, index) in regions"
          :key="region.value"
          class="text-sm text-gray-400 cursor-pointer py-1 px-3 rounded-lg"
          :class="{ 'bg-gray-700 text-white': region.isSelected }"
          @click="toggleRegion(region, index)"
        >
          {{ region.value }}
        </li>
      </ul>
    </div>

    <div class="flex flex-col gap-1 justify-start w-fit">
      <label for="region" class="text-xxs text-wr-grey-400 opacity-85">Status</label>
      <div class="flex flex-col justify-start gap-2">
        <div class="flex gap-2">
          <input type="checkbox" value="member" id="member" name="status" class="cursor-pointer" />
          <label for="member" class="text-xs cursor-pointer">Member of the United Nations</label>
        </div>

        <div class="flex gap-2">
          <input
            type="checkbox"
            value="independent"
            name="status"
            id="independent"
            class="cursor-pointer"
          />
          <label for="independent" class="text-xs cursor-pointer">Independent</label>
        </div>
      </div>
    </div>
  </form>
</template>

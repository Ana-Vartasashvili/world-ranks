<script setup lang="ts">
import { Region } from '@/models/countries'
import { SortByOption, type RegionOption, CountryStatus } from '@/models/filterbar'
import { ref, type Ref, reactive } from 'vue'

const emit = defineEmits(['sortByChange', 'selectedRegionsChange', 'selectedStatusChange'])

const regions = ref([
  { value: Region.Americas, isSelected: false },
  { value: Region.Antarctic, isSelected: false },
  { value: Region.Africa, isSelected: false },
  { value: Region.Asia, isSelected: false },
  { value: Region.Europe, isSelected: false },
  { value: Region.Oceania, isSelected: false },
])
const selectedRegions: Ref<RegionOption[]> = ref([])
const selectedStatus: { [key in CountryStatus]: boolean } = reactive({
  independent: false,
  member: false,
})

const toggleRegion = (toggledRegion: RegionOption, index: number) => {
  const toggledRegionIndex = selectedRegions.value.findIndex(
    (region) => region.value === toggledRegion.value
  )

  if (toggledRegionIndex !== -1) {
    selectedRegions.value.splice(toggledRegionIndex, 1)
    regions.value[index].isSelected = false
  } else {
    selectedRegions.value.push(toggledRegion)
    regions.value[index].isSelected = true
  }

  emit('selectedRegionsChange', selectedRegions)
}

const emitSortByType = (event: Event) => {
  const sortBy = +(event.target as HTMLSelectElement).value

  emit('sortByChange', sortBy)
}

const emitCountryStatus = (event: Event) => {
  const status: CountryStatus = (event.target as HTMLInputElement).value as CountryStatus
  selectedStatus[status] = !selectedStatus[status]

  emit('selectedStatusChange', selectedStatus)
}
</script>

<template>
  <form class="flex flex-col gap-5">
    <div class="flex flex-col w-fit gap-1">
      <label for="sortBy" class="text-xxs text-wr-grey-400 opacity-85">Sort by</label>
      <select
        name="sortBy"
        id="sortBy"
        class="text-xs bg-wr-grey-600 cursor-pointer border border-wr-grey-300 border-opacity-65 rounded-md py-2 px-3 w-52 focus:outline-none"
        @input="emitSortByType"
      >
        <option :value="SortByOption.Alphabetical">Alphabetical</option>
        <option :value="SortByOption.Population" selected>Population</option>
        <option :value="SortByOption.Area">Area (km&#178;)</option>
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
          <input
            type="checkbox"
            :value="CountryStatus.Member"
            id="member"
            name="status"
            class="cursor-pointer"
            @input="emitCountryStatus"
          />
          <label for="member" class="text-xs cursor-pointer">Member of the United Nations</label>
        </div>

        <div class="flex gap-2">
          <input
            type="checkbox"
            :value="CountryStatus.Independent"
            name="status"
            id="independent"
            class="cursor-pointer"
            @input="emitCountryStatus"
          />
          <label for="independent" class="text-xs cursor-pointer">Independent</label>
        </div>
      </div>
    </div>
  </form>
</template>

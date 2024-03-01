<script setup lang="ts">
import { COUNTRY_FIELDS } from '@/CONST/countryFields'
import CountriesList from '@/components/home/CountriesList.vue'
import Filterbar from '@/components/home/Filterbar.vue'
import Pagination from '@/components/home/Pagination.vue'
import type { Country, Region } from '@/models/countries'
import { SortByOption, type CountryStatusData } from '@/models/filterbar'
import { useCountriesStore } from '@/stores/countriesStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, reactive, ref, type ComputedRef, type Ref } from 'vue'

const store = useCountriesStore()
const { allCountries, isLoading } = storeToRefs(store)

const currentPage = ref(1)
const pageSize = ref(10)
const searchedCountryName = ref('')
const sortByOption: Ref<SortByOption> = ref(SortByOption.Population)
const selectedRegions: Region[] = reactive([])
const selectedStatus: CountryStatusData = reactive({ independent: false, member: false })

onMounted(() => {
  store.fetchCountries(COUNTRY_FIELDS)
})

const countries: ComputedRef<Country[]> = computed(() => {
  let filteredCountries: Country[] = reactive(allCountries.value)
  currentPage.value = 1

  filteredCountries = getFilteredCountriesBySearchedName(
    filteredCountries,
    searchedCountryName.value
  )
  filteredCountries = getCountriesFilteredByRegion(selectedRegions, filteredCountries)
  filteredCountries = getFilteredCountriesBySelectedStatus(selectedStatus, filteredCountries)
  filteredCountries = getSortedCountries(sortByOption.value, filteredCountries)

  return filteredCountries
})

const paginatedCountries: ComputedRef<Country[]> = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value

  return countries.value.slice(startIndex, endIndex)
})

const setSearchedCountryName = (event: Event) => {
  const searchedCountry = (event.target as HTMLInputElement).value
  searchedCountryName.value = searchedCountry
}

const getFilteredCountriesBySearchedName = (countries: Country[], searchedName: string) => {
  return countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchedName.toLowerCase())
  )
}

const getSortedCountries = (sortBy: SortByOption, countries: Country[]) => {
  if (sortBy === SortByOption.Alphabetical) {
    return sortCountriesAlphabetically(countries)
  } else if (sortBy === SortByOption.Population) {
    return sortCountriesByPopulation(countries)
  } else {
    return sortCountriesByArea(countries)
  }
}

const sortCountriesAlphabetically = (countries: Country[]) => {
  return countries.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1
    } else if (a.name.common > b.name.common) {
      return 1
    } else {
      return 0
    }
  })
}

const sortCountriesByPopulation = (countries: Country[]) => {
  return countries.sort((a, b) => b.population - a.population)
}

const sortCountriesByArea = (countries: Country[]) => {
  return countries.sort((a, b) => b.area - a.area)
}

const getCountriesFilteredByRegion = (selectedRegions: Region[], countries: Country[]) => {
  if (selectedRegions.length === 0) {
    return countries
  }

  return countries.filter((country) => {
    return selectedRegions.some((region) => region === country.region)
  })
}

const getFilteredCountriesBySelectedStatus = (
  { independent, member }: CountryStatusData,
  countries: Country[]
) => {
  if (!independent && !member) {
    return countries
  } else {
    return countries.filter((country) => {
      if (independent) return country.independent === independent
      if (member) return country.unMember === member
    })
  }
}
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
          @input="setSearchedCountryName"
        />
      </div>
    </div>

    <div class="flex gap-8 mt-7">
      <Filterbar
        v-model:selectedRegions="selectedRegions"
        v-model:selectedStatus="selectedStatus"
        v-model:sortByOption="sortByOption"
      />
      <CountriesList :countries="paginatedCountries" :is-loading="isLoading" />
    </div>

    <Pagination
      v-model:currentPage="currentPage"
      :page-size="pageSize"
      :total-items="countries.length"
    />
  </main>
</template>
@/CONST/countryFields

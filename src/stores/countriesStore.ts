import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getAllCountriesWithFilteredFields } from '../services/countriesRequests'
import type { Country } from '@/models/countries'

export const useCountriesStore = defineStore('countries', () => {
  const countries: Ref<Country[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const fetchCountries = async (fields: string[]) => {
    isLoading.value = true

    try {
      const response = await getAllCountriesWithFilteredFields(fields)
      countries.value = response.data
    } catch (error: any) {
      error.value = error?.message
    } finally {
      isLoading.value = false
    }
  }

  return { countries, isLoading, fetchCountries, error }
})

import type { Country } from '@/models/countries'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { getAllCountriesWithFilteredFields } from '../services/countriesRequests'

export const useCountriesStore = defineStore('countries', () => {
  const allCountries: Ref<Country[]> = ref([])
  const isLoading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)

  const fetchCountries = async (fields: string[]) => {
    isLoading.value = true

    try {
      const response = await getAllCountriesWithFilteredFields(fields)
      allCountries.value = response.data
      allCountries.value.sort((a, b) => b.population - a.population)
    } catch (error: any) {
      toast(error?.response?.data?.message || 'Something went wrong', {
        theme: 'dark',
      })
    } finally {
      isLoading.value = false
    }
  }

  return { allCountries, isLoading, fetchCountries, error }
})

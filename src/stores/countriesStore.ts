import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { getAllCountriesWithFilteredFields } from '../services/countriesRequests'
import type { Country } from '@/models/countries'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

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
      toast(error?.response?.data?.message, {
        theme: 'dark',
      })
    } finally {
      isLoading.value = false
    }
  }

  return { countries, isLoading, fetchCountries, error }
})

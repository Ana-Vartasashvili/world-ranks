import { axios } from '../config/axios'

export const getAllCountriesWithFilteredFields = (fieldsList: string[]) => {
  const fields = fieldsList.join(',')
  return axios.get('/all', { params: { fields } })
}

export const getCountry = (countryName: string, fieldsList: string[]) => {
  const fields = fieldsList.join(',')
  return axios.get(`/name/${countryName}`, { params: { fullText: true, fields } })
}

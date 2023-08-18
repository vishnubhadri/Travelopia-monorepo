import { ref, computed } from 'vue'
import { defineStore, type Pinia } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import type { Country } from '@/interfaces/Country'
import { COUNTRY, BACKGROUND_STYLE_KEY, OPS_COUNTRY } from '@/config'

export const useCountryStore = defineStore('country', () => {
  let country = ref([]) as Country[]
  let allCountry = ref([]) as Country[]
  let selectedValues = ref({
    country_id: null,
    number_of_travelers: 1,
    duration_from: new Date(),
    duration_to: null,
    full_name: null,
    email: null,
    phone_number: null,
    stage_id: null,
    message: null
  })
  let homeScreenBG = document.documentElement.style
  async function getCountryList(): Promise<Array<Country>> {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .get(COUNTRY)
        .then((response: AxiosResponse) => {
          vm.country = response.data
          resolve(response.data)
          response.data.forEach(preDownloadImages)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  async function getCountryAllList(): Promise<Array<Country>> {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .get(OPS_COUNTRY)
        .then((response: AxiosResponse) => {
          vm.allCountry = response.data
          resolve(response.data)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  function setBackground(value: string) {
    homeScreenBG.setProperty(BACKGROUND_STYLE_KEY, `url(${value})`)
  }

  async function preDownloadImages(country: Country) {
    const tempElement = <HTMLDivElement>document.createElement('div')
    tempElement.setAttribute('id', country.country_image_url)
    tempElement.style.setProperty('background-image', `url(${country.country_image_url})`)
    tempElement.style.setProperty('display', 'hidden')
    document.getElementsByTagName('body')[0].append(tempElement)
  }

  async function addNewCountry(payload: Country): Promise<Array<Country>> {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .post(OPS_COUNTRY, payload)
        .then((response: AxiosResponse) => {
          vm.country = response.data
          resolve(response.data)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  async function updateCountry(countryId: number, payload: Country): Promise<Array<Country>> {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .put(`${OPS_COUNTRY}/${countryId}`, payload)
        .then((response: AxiosResponse) => {
          vm.country = response.data
          resolve(response.data)
          response.data.forEach(preDownloadImages)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  async function deleteCountry(countryId: number): Promise<Array<Country>> {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .delete(`${OPS_COUNTRY}/${countryId}`)
        .then((response: AxiosResponse) => {
          vm.country = response.data
          resolve(response.data)
          response.data.forEach(preDownloadImages)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  return {
    country,
    getCountryList,
    selectedValues,
    setBackground,
    getCountryAllList,
    deleteCountry,
    updateCountry,
    addNewCountry
  }
})

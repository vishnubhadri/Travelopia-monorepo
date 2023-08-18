import { ref, computed } from 'vue'
import { defineStore, type Pinia } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import type { Country } from '@/interfaces/Country'
import { COUNTRY, BACKGROUND_STYLE_KEY } from '@/config'

export const useCountryStore = defineStore('country', () => {
  let country = ref([]) as Country[]
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

  return { country, getCountryList, selectedValues, setBackground }
})

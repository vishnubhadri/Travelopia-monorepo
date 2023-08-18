import { ref, computed } from 'vue'
import { defineStore, type Pinia } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import type { Country } from '@/interfaces/Country'
import { OPS_ENQUIRY } from '@/config'

export const useEnquiryStore = defineStore('enquiry', () => {
  let enquiries = ref([])
  async function getEnquiryList() {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .get(OPS_ENQUIRY)
        .then((response: AxiosResponse) => {
          vm.enquiries = response.data
          resolve(response.data)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  return { enquiries, getEnquiryList }
})

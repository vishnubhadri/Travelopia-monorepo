import { ref, computed } from 'vue'
import { defineStore, type Pinia } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { OPS_ENQUIRY, ENQUIRY } from '@/config'
import type { Enquiries } from '@/interfaces'

export const useEnquiryStore = defineStore('enquiry', () => {
  let enquiries = ref([])
  async function getEnquiryList() {
    const vm = this
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

  async function postEnquiry(payload: Enquiries) {
    return new Promise((resolve, reject) => {
      axios
        .post(ENQUIRY, payload)
        .then((response: AxiosResponse) => {
          resolve(true)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  async function updateStage(id: number, stage: string) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${OPS_ENQUIRY}/${id}/status`, {
          stage
        })
        .then((response: AxiosResponse) => {
          payload.status_of_enquiry = stage
          resolve(true)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  const stageFlowCache: { [key: number]: number[] } = {}

  async function fetchEnquiryStage() {
    const vm = this
    return new Promise((resolve, reject) => {
      if (Object.keys(vm.stageFlowCache).length) {
        resolve(vm.stageFlowCache)
        return
      }
      axios
        .get(`${OPS_ENQUIRY}/stage-flow`)
        .then((response: AxiosResponse) => {
          vm.stageFlowCache = response.data
          resolve(response.data)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  return { enquiries, getEnquiryList, postEnquiry, fetchEnquiryStage, stageFlowCache, updateStage }
})

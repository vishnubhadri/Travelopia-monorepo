import { ref, computed } from 'vue'
import { defineStore, type Pinia } from 'pinia'
import axios, { type AxiosResponse } from 'axios'
import { VACATION, OPS_VACATION } from '@/config'

export const useVacationStatusStore = defineStore('vacation-status', () => {
  let vacations = ref([])
  async function getVacationList() {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .get(VACATION)
        .then((response: AxiosResponse) => {
          vm.vacations = response.data
          resolve(response.data)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  async function addNewStatus(payload: { stage_name: string; is_active?: boolean }) {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .post(OPS_VACATION, payload)
        .then(async (response: AxiosResponse) => {
          resolve(true)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  async function updateStatus(id: number, payload: { stage_name: string; is_active?: boolean }) {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .put(`${OPS_VACATION}/${id}`, payload)
        .then(async (response: AxiosResponse) => {
          resolve(true)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }
  async function deleteStatus(id: number) {
    const vm: any = this
    return new Promise((resolve, reject) => {
      axios
        .delete(`${OPS_VACATION}/${id}`)
        .then(async (response: AxiosResponse) => {
          resolve(true)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  return { vacations, getVacationList, addNewStatus, updateStatus, deleteStatus }
})

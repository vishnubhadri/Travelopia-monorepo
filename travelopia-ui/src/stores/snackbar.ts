// snackbar.ts
import type { Snackbar } from '@/interfaces'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSnackbarStore = defineStore('snackbar', () => {
  const messages = ref([])

  // Add a new snackbar message to the stack
  function addMessage(cMsg: Snackbar) {
    messages.value.push(cMsg)
  }
  // Remove the top snackbar message from the stack
  function removeMessage() {
    messages.value.shift()
  }
  return {
    addMessage,
    removeMessage,
    messages
  }
})

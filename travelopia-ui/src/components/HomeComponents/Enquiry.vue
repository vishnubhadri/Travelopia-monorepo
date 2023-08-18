<template>
  <v-sheet width="370">
    <v-form @submit.prevent="validateForm">
      <v-text-field
        v-model="selectedValues['full_name']"
        :rules="[(v) => !!v || 'Full Name is required']"
        label="Full Name"
        color="primary"
        required
      ></v-text-field>

      <v-text-field
        v-model="selectedValues['email']"
        :rules="[
          (v) => !!v || 'Email is required',
          (v) => emailRegex.test(v) || 'Email must be valid'
        ]"
        label="Email"
        color="primary"
        required
      ></v-text-field>

      <v-text-field
        v-model="selectedValues['phone_number']"
        :rules="[(v) => !!v || 'Phone Number is required']"
        label="Phone Number"
        color="primary"
        required
      ></v-text-field>

      <v-select
        :items="vacationStatus"
        :rules="[(v) => !!v || 'Trip Status is required']"
        label="Trip Status"
        color="primary"
        required
        item-title="stage_name"
        item-value="id"
        :loading="loadingCountries"
        v-model="selectedValues['stage_id']"
      ></v-select>

      <v-switch
        v-model="showMessage"
        :label="!showMessage ? 'Add Message' : 'Close Message'"
        class="mt-4"
      ></v-switch>
      <v-expand-transition>
        <v-textarea
          v-if="showMessage"
          v-model="selectedValues['message']"
          label="Message"
          auto-grow
          :rules="[(v) => !!v || 'Message is required']"
        ></v-textarea>
      </v-expand-transition>
      <div class="d-flex flex-column">
        <v-btn
          color="primary"
          class="mt-4"
          block
          type="submit"
          @click="submit"
          :loading="addingEnquiry"
          :disabled="loadingCountries"
        >
          Add me in
        </v-btn>
        <v-btn
          color="secondary"
          class="mt-4"
          block
          @click="resetForm"
          :disabled="addingEnquiry || loadingCountries"
        >
          Back
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  useVacationStatusStore,
  useCountryStore,
  useEnquiryStore,
  useSnackbarStore
} from '@/stores'
import { onMounted } from 'vue'

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const showMessage = ref(false)
const loadingCountries = ref(false)
const addingEnquiry = ref(false)
const emit = defineEmits(['back'])

onMounted(() => {
  loadingCountries.value = true
  useVacationStatusStore()
    .getVacationList()
    .finally(() => {
      loadingCountries.value = false
    })
})

const vacationStatus = computed(() => {
  return useVacationStatusStore().vacations
})

const selectedValues = computed(() => {
  return useCountryStore().selectedValues
})

const validateForm = () => {
  return (
    !!selectedValues['full_name'] &&
    !!selectedValues['email'] &&
    emailRegex.test(selectedValues['email']) &&
    !!selectedValues['phone_number'] &&
    selectedValues['stage_id'] > -1 &&
    (!showMessage || !!selectedValues['message'])
  )
}

const resetForm = () => {
  emit('back', false)
}

function submit() {
  addingEnquiry.value = true
  useEnquiryStore()
    .postEnquiry({
      full_name: selectedValues.value.full_name,
      email: selectedValues.value.email,
      country_id: selectedValues.value.country_id,
      message: selectedValues.value.message,
      duration_from: selectedValues.value.duration_from,
      duration_to: selectedValues.value.duration_to,
      stage_id: selectedValues.value.stage_id,
      phone_number: selectedValues.value.phone_number,
      number_of_travelers: selectedValues.value.number_of_travelers
    })
    .then(() => {
      useSnackbarStore().addMessage({
        color: 'success',
        text: 'Completed, Will get back to you sooner!!'
      })
    })
    .catch((error) => {
      useSnackbarStore().addMessage({ color: 'error', text: error.message })
    })
    .finally(() => {
      addingEnquiry.value = false
    })
}
</script>

<style scoped>
/* Your existing styles */
</style>

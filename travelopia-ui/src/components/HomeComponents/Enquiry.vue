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
        <v-btn color="primary" class="mt-4" block type="submit" @click="submit"> Add me in </v-btn>
        <v-btn color="secondary" class="mt-4" block @click="resetForm"> Back </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useVacationStatusStore, useCountryStore } from '@/stores'

const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const showMessage = ref(false)
const message = ref('')

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

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
    selectedValues['stage_id']>-1 &&
    (!showMessage || !!selectedValues['message'])
  )
}

const resetForm = () => {
  emit('back', false)
}

const emit = defineEmits(['back'])
function submit() {}
</script>

<style scoped>
/* Your existing styles */
</style>

<template>
  <v-sheet width="370">
    <v-form @submit.prevent="validateForm">
      <v-text-field
        v-model="fullName"
        :rules="[(v) => !!v || 'Full Name is required']"
        label="Full Name"
        color="primary"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="[
          (v) => !!v || 'Email is required',
          (v) => emailRegex.test(v) || 'Email must be valid'
        ]"
        label="Email"
        color="primary"
        required
      ></v-text-field>

      <v-text-field
        v-model="phoneNumber"
        :rules="[(v) => !!v || 'Phone Number is required']"
        label="Phone Number"
        color="primary"
        required
      ></v-text-field>

      <v-switch
        v-model="showMessage"
        :label="!showMessage ? 'Add Message' : 'Close Message'"
        class="mt-4"
      ></v-switch>
      <v-expand-transition>
        <v-textarea
          v-if="showMessage"
          v-model="message"
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
import { ref } from 'vue'

const fullName = ref('')
const email = ref('')
const phoneNumber = ref('')
const showMessage = ref(false)
const message = ref('')

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

const validateForm = () => {
  return (
    !!fullName.value &&
    !!email.value &&
    emailRegex.test(email.value) &&
    !!phoneNumber.value &&
    (!showMessage || !!message.value)
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

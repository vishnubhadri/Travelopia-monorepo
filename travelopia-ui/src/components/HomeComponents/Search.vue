<template>
  <v-sheet width="370">
    <v-form @submit.prevent="validateForm">
      <v-autocomplete
        :items="country"
        :rules="[(v) => !!v || 'Location is required']"
        label="Where"
        color="primary"
        required
        item-title="country_name"
        item-value="id"
        v-model="selectedValues['country']"
      ></v-autocomplete>
      <v-row class="mb-2">
        <v-col cols="6">
          <div>
            <label class="mdc-floating-label">Check-in Date</label>
            <input
              type="date"
              v-model="checkInDate"
              :disabledDates="disabledCheckInDates"
              :minDate="checkInDate"
              class="mdc-text-field__input"
              required
            />
          </div>
        </v-col>
        <v-col cols="6">
          <div>
            <label class="mdc-floating-label">Check-out Date</label>
            <input
              type="date"
              v-model="checkOutDate"
              :disabledDates="disabledCheckOutDates"
              :minDate="checkInDate"
              class="mdc-text-field__input"
              required
            />
            <span v-if="checkOutError" class="error-label"
              >Check-out Date is required and must be valid</span
            >
          </div>
        </v-col>
      </v-row>

      <v-text-field
        v-model.number="travelers"
        :rules="[
          (v) => (!!travelers && travelers > 0) || 'Number of travelers must be greater than 0'
        ]"
        type="number"
        variant="outlined"
        label="Travelers"
        required
      ></v-text-field>
      <div class="d-flex flex-column">
        <v-btn color="primary" class="mt-4" block type="submit" @click="submit"> next </v-btn>
        <v-btn color="secondary" class="mt-4" block @click="resetForm"> Reset </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCountryStore } from '@/stores'

const country = computed(() => {
  return useCountryStore().country
})
const selectedValues = computed(() => {
  return useCountryStore().selectedValues
})

const checkInDate = ref('')
const checkOutDate = ref('')
const travelers = ref(1)
const checkOutError = ref(false)

const disabledCheckInDates = (date) => date <= new Date()
const disabledCheckOutDates = (date) => date <= checkInDate.value

const validateForm = () => {
  checkOutError.value = !checkOutDate.value
  return checkOutDate.value !== ''
}

const resetForm = () => {
  checkOutError.value = false
  checkInDate.value = ''
  checkOutDate.value = ''
  travelers.value = 1
}

const emit = defineEmits(['next'])
function submit() {
  emit('next', true)
}
</script>

<style scoped>
.mdc-text-field__input {
  position: relative;
  font-size: 16px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.mdc-floating-label {
  pointer-events: none;
  top: 12px;
  left: 12px;
  font-size: 14px;
  color: #666;
  transition:
    top 0.2s,
    font-size 0.2s;
}

.mdc-text-field__input:focus {
  border-color: #007bff;
}

.mdc-text-field__input:not(:placeholder-shown) + .mdc-floating-label,
.mdc-text-field__input:focus + .mdc-floating-label {
  top: -12px;
  font-size: 12px;
  color: #007bff;
}

.error-label {
  font-size: 12px;
  color: #ff0000;
  margin-top: 4px;
}
</style>

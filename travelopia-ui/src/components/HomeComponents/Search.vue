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
        :loading="loadingCountries"
        v-model="selectedValues['country_id']"
      ></v-autocomplete>
      <v-row class="mb-2">
        <v-col cols="6">
          <div>
            <label class="mdc-floating-label">Check-in Date</label>
            <input
              type="date"
              v-model="selectedValues['duration_from']"
              class="mdc-text-field__input"
              required
            />
            <span v-if="checkInError" class="error-label"
              >Check-in Date is required and must be valid</span
            >
          </div>
        </v-col>
        <v-col cols="6">
          <div>
            <label class="mdc-floating-label">Check-out Date</label>
            <input
              type="date"
              v-model="selectedValues['duration_to']"
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
        v-model.number="selectedValues['number_of_travelers']"
        :rules="[
          (v) =>
            (!!selectedValues['number_of_travelers'] &&
              selectedValues['number_of_travelers'] > 0) ||
            'Number of travelers must be greater than 0'
        ]"
        type="number"
        variant="outlined"
        label="Travelers"
        required
      ></v-text-field>
      <div class="d-flex flex-column">
        <v-btn
          color="primary"
          class="mt-4"
          block
          type="submit"
          @click="submit"
          :disabled="loadingCountries"
        >
          next
        </v-btn>
        <v-btn color="secondary" class="mt-4" block @click="resetForm" :disabled="loadingCountries">
          Reset
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCountryStore } from '@/stores'

const checkOutError = ref(false)
const checkInError = ref(false)
const loadingCountries = ref(false)
const emit = defineEmits(['next'])

onMounted(() => {
  loadingCountries.value = true
  useCountryStore()
    .getCountryList()
    .finally(() => {
      loadingCountries.value = false
    })
})

const country = computed(() => {
  return useCountryStore().country
})
const selectedValues = computed(() => {
  return useCountryStore().selectedValues
})

const resetForm = () => {
  selectedValues.value['duration_from'] = ''
  selectedValues.value['duration_to'] = ''
  selectedValues.value['number_of_travelers'] = 1
  checkInError.value = false
  checkOutError.value = false
}

function validateForm() {
  const selectedCountryId = selectedValues.value['country_id']
  const numberOfTravelers = selectedValues.value['number_of_travelers']
  const durationFrom = new Date(selectedValues.value['duration_from'])
  const durationTo = new Date(selectedValues.value['duration_to'])
  const today = new Date()
  checkOutError.value = false
  checkInError.value = false
  const errors = []

  if (!selectedCountryId) {
    errors.push('Location is required')
  }

  if (!numberOfTravelers || numberOfTravelers <= 0) {
    errors.push('Number of travelers must be greater than 0')
  }

  if ('Invalid Date' === durationFrom.toString() || durationFrom <= today) {
    errors.push('Check-in Date must be today or in the future')
    checkInError.value = true
  }

  if ('Invalid Date' === durationTo.toString() || durationTo < durationFrom) {
    errors.push('Check-out Date must be after Check-in Date')
    checkOutError.value = true
  }

  return errors.length === 0
}

function submit() {
  if (validateForm()) {
    emit('next', true)
  }
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

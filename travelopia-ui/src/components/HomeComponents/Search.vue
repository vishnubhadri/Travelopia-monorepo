<template>
  <v-sheet width="300" class="ma-4">

    <v-form ref="form">
      <v-select v-model="selectedLocation" :items="locations" :rules="[v => !!v || 'Location is required']" label="Where"
        required></v-select>
      <v-row class="mb-2">
        <v-col>
          <VueDatePicker v-model="checkInDate" range :disabledDates="disabledCheckInDates" style="z-index: 10"
            label="Check-in Date" required/>
        </v-col>
        <v-col>
          <VueDatePicker v-model="checkOutDate" :disabledDates="disabledCheckOutDates" :minDate="checkInDate"
            style="z-index: 10" label="Check-out Date" required />
        </v-col>
      </v-row>
      <v-text-field v-model.number="travelers"
        :rules="[v => !!travelers && travelers > 0 || 'Number of travelers must be greater than 0']" type="number"
        label="Travelers" required></v-text-field>

      <div class="d-flex flex-column">
        <v-btn color="primary" class="mt-4" block @click="validate">
          Search
        </v-btn>

        <v-btn color="secondary" class="mt-4" block @click="reset">
          Reset
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, onMounted } from 'vue';

const selectedLocation = ref('');
const checkInDate = ref();
const checkOutDate = ref();
const travelers = ref(1);
const checkbox = ref(false);

const locations = []; // You need to populate this array with data from the API

const disabledCheckInDates = (date) => date <= new Date();
const disabledCheckOutDates = (date) => date <= checkInDate.value;

const validate = () => {
  if ($refs.form.validate()) {
    // Perform your search or further actions here
  }
};

const reset = () => {
  $refs.form.reset();
};

onMounted(() => {
  // Fetch location data from the API and populate the locations array
});

</script>

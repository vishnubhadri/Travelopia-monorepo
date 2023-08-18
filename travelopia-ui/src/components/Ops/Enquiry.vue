<template>
  <v-sheet>
    <v-card-title>Enquiry List</v-card-title>
    <v-card-item>
      <v-table height="calc(100vh - 136px)">
        <template v-slot:default>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone No</th>
              <th>country</th>
              <th>From</th>
              <th>To</th>
              <th>Message</th>
              <th>Stage</th>
              <th>Travelers Count</th>
              <th>Enquiry Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="enquiry in enquiries" :key="enquiry.id">
              <td>{{ enquiry.id }}</td>
              <td>{{ enquiry.full_name }}</td>
              <td>{{ enquiry.email }}</td>
              <td>{{ enquiry.phone_number }}</td>
              <td>{{ getCountries(enquiry) }}</td>
              <td>{{ enquiry.duration_from }}</td>
              <td>{{ enquiry.duration_to }}</td>
              <td>{{ enquiry.message }}</td>
              <td>{{ enquiry.stage_id }}</td>
              <td>{{ enquiry.number_of_travelers }}</td>
              <td>
                <v-select
                  :items="statuses(enquiry)"
                  variant="solo"
                  density="comfortable"
                  v-model="enquiry.status_of_enquiry"
                  @update:modelValue="getNextStage(enquiry)"
                  :loading="enquiry.isStatusFetching"
                  hide-selected
                ></v-select>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-item>
  </v-sheet>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'

import { useEnquiryStore } from '@/stores'
import { useCountryStore } from '@/stores'

const statusFlow = computed(() => {
  return useEnquiryStore().stageFlowCache
})

const enquiries = computed(() => {
  return useEnquiryStore().enquiries
})

function statuses(enquiry) {
  return [...statusFlow.value[enquiry.status_of_enquiry], enquiry.status_of_enquiry]
}

const countryCache = {}

function getCountries(enquiry) {
  return countryCache[enquiry.id]
}

// Fetch existing enquiries from API on component mount
onMounted(() => {
  Promise.all([useEnquiryStore().fetchEnquiryStage(), useCountryStore().getCountryAllList()]).then(
    () => {
      useCountryStore().allCountry.forEach((country: { id: number; country_name: string }) => {
        countryCache[country.id] = country.country_name
      })
      useEnquiryStore().getEnquiryList()
    }
  )
})

async function getNextStage(enquiry) {
  enquiry.isStatusFetching = true
  useEnquiryStore()
    .updateStage(enquiry.id, enquiry.status_of_enquiry)
    .finally(() => {
      enquiry.isStatusFetching = false
    })
}
</script>

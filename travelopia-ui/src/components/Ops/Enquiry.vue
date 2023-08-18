<template>
  <v-sheet>
    <v-card-title>Enquiry List</v-card-title>
    <v-card-item>
      <v-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <!-- Add other table headers here -->
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="enquiry in enquiries" :key="enquiry.id">
              <td>{{ enquiry.id }}</td>
              <td>{{ enquiry.fullName }}</td>
              <td>{{ enquiry.email }}</td>
              <!-- Add other table data here -->
              <td>
                <v-icon @click="editEnquiry(enquiry)">mdi-pencil</v-icon>
                <v-icon @click="deleteEnquiry(enquiry.id)">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-item>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useEnquiryStore } from '@/stores'

const newEnquiry = ref({
  fullName: '',
  email: ''
  // Initialize other fields here
})

const enquiries = ref([])

// Fetch existing enquiries from API on component mount
onMounted(() => {
  useEnquiryStore().getEnquiryList()
})
</script>

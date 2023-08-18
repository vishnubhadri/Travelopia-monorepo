<template>
  <v-sheet>
    <v-card-title>Country Table</v-card-title>
    <v-card-item>
      <!-- Table to display existing countries -->
      <v-table height="calc(100vh - 136px)">
        <template v-slot:default>
          <thead>
            <tr>
              <th>ID</th>
              <th>Country Name</th>
              <th>Country Image URL</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="country in countries" :key="country.id">
              <td>{{ country.id }}</td>
              <td>{{ country.countryName }}</td>
              <td>{{ country.countryImageUrl }}</td>
              <td>{{ country.description }}</td>
              <td>{{ country.is_active == 1 ? 'Active' : 'Deactive' }}</td>
              <td>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-icon color="primary" v-bind="props" icon="mdi-dots-vertical"> </v-icon>
                  </template>
                  <v-list>
                    <v-list-item @click="editCountry(country)">Edit</v-list-item>
                    <v-list-item @click="deleteCountry(country.id)">Delete</v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-item>
      <!-- Form for adding new country -->
      <v-form @submit.prevent="addCountry">
        <v-text-field v-model="newCountry.countryName" label="Country Name" required></v-text-field>
        <v-expand-x-transition>
          <v-img
            v-if="newCountry.countryImageUrl"
            :src="newCountry.countryImageUrl"
            aspect-ratio="0"
            width="350px"
          ></v-img>
        </v-expand-x-transition>
        <v-text-field v-model="newCountry.countryImageUrl" label="Country Image URL"></v-text-field>

        <v-switch v-model="newCountry.is_active" label="Is Active" color="primary"></v-switch>
        <v-textarea v-model="newCountry.description" label="Description"></v-textarea>

        <v-btn color="primary" :loading="isLoading" type="submit" @click.prevent="addCountry">
          {{ buttonAction }} Country
        </v-btn>
      </v-form>
    </v-card-item>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCountryStore, useSnackbarStore } from '@/stores'
import type { Country } from '@/interfaces'

const newCountry = ref({
  countryName: '',
  countryImageUrl: '',
  description: '',
  is_active: true,
  id: -1
})

const countries = ref([])
const isLoading = ref(false)
const buttonAction = ref('Add')

// Fetch existing countries from API on component mount
onMounted(() => {
  fetchCountries()
})

// Fetch existing countries from API
const fetchCountries = async () => {
  try {
    countries.value = (await useCountryStore().getCountryAllList()) as Country[]
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}

// Add new country
const addCountry = () => {
  if (!(newCountry.value.countryImageUrl || newCountry.value.countryName)) {
    return
  }
  isLoading.value = true

  let promise
  const payload: Country = {
    country_image_url: newCountry.value.countryImageUrl,
    country_name: newCountry.value.countryName,
    description: newCountry.value.description,
    is_active: newCountry.value.is_active
  }
  if (buttonAction.value === 'Edit' && newCountry.value.id !== -1) {
    promise = useCountryStore().updateCountry(newCountry.value.id, payload)
  } else {
    promise = useCountryStore().addNewCountry(payload)
  }

  promise
    .then(() => {
      useSnackbarStore().addMessage({
        color: 'success',
        text: 'Country ' + buttonAction.value
      })
    })
    .then(() => {
      newCountry.value = {
        countryName: '',
        countryImageUrl: '',
        description: '',
        is_active: true,
        id: -1
      }
      fetchCountries()
      buttonAction.value === 'Add'
    })
    .catch((error) => {
      useSnackbarStore().addMessage({ text: error.message, color: 'error' })
    })
    .finally(() => {
      isLoading.value = false
    })
}

// Edit existing country
const editCountry = (country: Country) => {
  newCountry.value.countryImageUrl = country.country_image_url
  newCountry.value.countryName = country.country_name
  newCountry.value.description = country.description
  newCountry.value.is_active = !!country.is_active
  if (country.id) {
    newCountry.value.id = country.id
  }
}

// Delete existing country
const deleteCountry = async (countryId: number) => {
  isLoading.value = true
  useCountryStore()
    .deleteCountry(countryId)
    .then(() => {
      useSnackbarStore().addMessage({
        color: 'success',
        text: 'Country deleted'
      })
    })
    .then(fetchCountries)
    .catch((error) => {
      useSnackbarStore().addMessage({
        color: 'error',
        text: error.message
      })
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

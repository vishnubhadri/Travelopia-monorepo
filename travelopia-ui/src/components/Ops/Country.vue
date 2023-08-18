<template>
  <v-sheet>
    <v-card-title>Country Table</v-card-title>
    <v-card-item>
      <!-- Table to display existing countries -->
      <v-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>ID</th>
              <th>Country Name</th>
              <th>Country Image URL</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="country in countries" :key="country.id">
              <td>{{ country.id }}</td>
              <td>{{ country.countryName }}</td>
              <td>{{ country.countryImageUrl }}</td>
              <td>{{ country.description }}</td>
              <td>
                <v-icon @click="editCountry(country)">mdi-pencil</v-icon>
                <v-icon @click="deleteCountry(country.id)">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-item>
    <v-card-item
      ><!-- Form for adding new country -->
      <v-form @submit.prevent="addCountry">
        <v-text-field v-model="newCountry.countryName" label="Country Name" required></v-text-field>
        <v-text-field v-model="newCountry.countryImageUrl" label="Country Image URL"></v-text-field>
        <v-textarea v-model="newCountry.description" label="Description"></v-textarea>

        <v-btn color="primary" type="submit">Add Country</v-btn>
      </v-form>
    </v-card-item>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const newCountry = ref({
  countryName: '',
  countryImageUrl: '',
  description: ''
})

const countries = ref([])

// Fetch existing countries from API on component mount
onMounted(() => {
  fetchCountries()
})

// Fetch existing countries from API
const fetchCountries = async () => {
  try {
    // Call API to fetch countries and update 'countries' ref
    // Example: countries.value = await fetchCountriesFromAPI();
  } catch (error) {
    console.error('Error fetching countries:', error)
  }
}

// Add new country
const addCountry = async () => {
  try {
    // Call API to add new country using 'newCountry' ref data
    // Example: await addCountryToAPI(newCountry.value);
    // Reset newCountry data
    newCountry.value = {
      countryName: '',
      countryImageUrl: '',
      description: ''
    }
    // Fetch updated countries
    fetchCountries()
  } catch (error) {
    console.error('Error adding country:', error)
  }
}

// Edit existing country
const editCountry = (country) => {
  // Implement edit logic here
}

// Delete existing country
const deleteCountry = async (countryId) => {
  try {
    // Call API to delete country by ID
    // Example: await deleteCountryFromAPI(countryId);
    // Fetch updated countries
    fetchCountries()
  } catch (error) {
    console.error('Error deleting country:', error)
  }
}
</script>

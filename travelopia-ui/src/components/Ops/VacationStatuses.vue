<template>
  <v-sheet>
    <v-card-title>State Table </v-card-title>

    <v-card-item>
      <!-- Table to display existing states -->
      <v-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>ID</th>
              <th>Stage Name</th>
              <th>Is Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="status in vacationStatus" :key="status.id">
              <td>{{ status.id }}</td>
              <td>{{ status.stage_name }}</td>
              <td>{{ status.is_active ? 'Active' : 'Inactive' }}</td>
              <td>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-icon color="primary" v-bind="props" icon="mdi-dots-vertical"> </v-icon>
                  </template>
                  <v-list>
                    <v-list-item @click="editStatus(status)"> Edit </v-list-item>
                    <v-list-item @click="deleteStatus(status.id)"> Delete </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-item>
    <v-card-item>
      <!-- Form for adding new state -->
      <v-form @submit.prevent="addStatus">
        <v-text-field
          v-model="newStatus.stage_name"
          label="Stage Name"
          required
          :rules="[(v) => !!v || 'Stage Name Required']"
        ></v-text-field>
        <v-switch v-model="newStatus.is_active" label="Is Active" color="primary"></v-switch>

        <v-btn color="primary" :loading="isLoading" type="submit" @click.prevent="addStatus">
          {{ buttonAction }} Status
        </v-btn>
      </v-form>
    </v-card-item>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useVacationStatusStore } from '@/stores'

const newStatus = ref({
  stage_name: '',
  is_active: true,
  id: -1
})

const buttonAction = ref('Add')
const vacationStatus = computed(() => {
  return useVacationStatusStore().vacations
})

onMounted(() => {
  useVacationStatusStore().getVacationList()
})

function clearNewStatus() {
  newStatus.value.id = -1
  newStatus.value.is_active = true
  newStatus.value.stage_name = ''
}

function addStatus() {
  if (!newStatus.value.stage_name) {
    return
  }

  if (buttonAction.value === 'Edit' && newStatus.value.id !== -1) {
    useVacationStatusStore()
      .updateStatus(newStatus.value.id, {
        stage_name: newStatus.value.stage_name,
        is_active: !!newStatus.value.is_active
      })
      .then(() => {
        clearNewStatus()
        updateTable()
      })
      .catch((error) => {
        console.error(error)
      })
  } else {
    useVacationStatusStore()
      .addNewStatus({
        stage_name: newStatus.value.stage_name,
        is_active: !!newStatus.value.is_active
      })
      .then(() => {
        clearNewStatus()
        updateTable()
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

function updateTable() {
  useVacationStatusStore()
    .getVacationList()
    .catch((error) => {
      console.error(error)
    })
}

function deleteStatus(status: number) {
  useVacationStatusStore()
    .deleteStatus(status)
    .then(() => {
      updateTable()
    })
    .catch((error) => {
      console.error(error)
    })
}

function editStatus(status: any) {
  newStatus.value.stage_name = status.stage_name
  newStatus.value.is_active = status.is_active
  newStatus.value.id = status.id
  buttonAction.value = 'Edit'
}
</script>

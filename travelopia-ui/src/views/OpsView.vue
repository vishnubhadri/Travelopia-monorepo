<template>
  <v-card class="card">
    <v-tabs v-model="tab" bg-color="primary" slider-color="secondary">
      <v-tab value="Enquiry">Enquiry</v-tab>
      <v-tab value="Country">Country</v-tab>
      <v-tab value="Vacation Status">Vacation Status</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="Enquiry"> <enquiry /> </v-window-item>

        <v-window-item value="Country"> <country /> </v-window-item>

        <v-window-item value="Vacation Status"> <vacationStatuses /> </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCountryStore } from '@/stores'

import enquiry from '@/components/Ops/Enquiry.vue'
import country from '@/components/Ops/Country.vue'
import vacationStatuses from '@/components/Ops/VacationStatuses.vue'

const tab = ref('Enquiry')
onMounted(() => {
  useCountryStore().setBackground(null)
})
</script>

<style scoped>
.card {
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: auto;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
}
</style>

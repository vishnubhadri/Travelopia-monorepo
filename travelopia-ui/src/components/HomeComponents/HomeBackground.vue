<template>
  <v-container>
    <v-card width="fit-content" class="card">
      <v-card-text>
        <v-row align="center" no-gutters>
          <v-slide-x-transition>
            <v-col>
              <v-expand-transition>
                <template v-if="search">
                  <Search @next="showEnquiry" />
                </template>
                <template v-else>
                  <Enquiry @back="hideEnquiry" />
                </template>
              </v-expand-transition>
            </v-col>
          </v-slide-x-transition>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import Search from '@/components/HomeComponents/Search.vue'
import Enquiry from '@/components/HomeComponents/Enquiry.vue'
import { onMounted, ref } from 'vue'

let search = ref(true)

function showEnquiry() {
  search.value = false
}

function hideEnquiry() {
  search.value = true
}
</script>

<style scoped>
.card {
  position: absolute;
  top: 60px;
  left: 60px;
}
</style>

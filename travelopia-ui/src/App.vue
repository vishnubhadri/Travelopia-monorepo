<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { watch, onMounted } from 'vue'
import { useCountryStore } from './stores'
import { DEFAULT_BACKGROUND } from './config'

onMounted(() => {
  useCountryStore().setBackground(DEFAULT_BACKGROUND)
})

watch(useCountryStore().selectedValues, () => {
  let bg = DEFAULT_BACKGROUND
  if (useCountryStore().selectedValues.country) {
    const countryData = useCountryStore().country.find(
      (country) => country.id == useCountryStore().selectedValues.country
    )
    bg = countryData?.country_image_url || DEFAULT_BACKGROUND
  }
  useCountryStore().setBackground(bg)
})
</script>

<style>
html {
  overflow: hidden;
}
body {
  background-image: var(--custom-background-image);
  background-size: cover;
}
</style>

<template>
  <V-card elevation="1" width="fit-content">
    <Search v-model:selectedLocation="selectedLocation" />
  </V-card>
</template>

<script setup lang="ts">
import Search from '@/components/HomeComponents/Search.vue';
import { ref,computed } from 'vue';

const selectedLocation = ref('');

// Define a computed property to calculate the background image URL
const backgroundImageUrl = computed(() => {
  // Map location names to corresponding image URLs
  const locationImages = {
    'Country1': 'url-to-image1.jpg',
    'Country2': 'url-to-image2.jpg',
    // Add more locations and image URLs as needed
  };

  // Return the appropriate image URL based on the selected location
  return locationImages[selectedLocation.value] || 'https://w.forfun.com/fetch/12/1257650a038c0af4e751c1fa8d1477cf.jpeg';
});
</script>

<style lang="scss">
body {
  background: var(--background-image, url('https://w.forfun.com/fetch/12/1257650a038c0af4e751c1fa8d1477cf.jpeg'));
  background-size: cover;
}

html {
  overflow: hidden;
}
</style>

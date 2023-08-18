<template>
  <div>
    <RouterView />
    <v-snackbar v-model="currentMessage" :color="currentMessage?.color" location="top">
      <span style="text-transform: capitalize" variant="text">{{ currentMessage?.text }}</span>
      <template v-slot:actions>
        <v-btn variant="text" @click="onSnackbarClose"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { watch, onMounted, computed, ref } from 'vue'
import { useCountryStore, useSnackbarStore } from './stores'
import { DEFAULT_BACKGROUND, SNACKBAR_HIDE_TIME } from './config'

const timeout = ref(SNACKBAR_HIDE_TIME)

onMounted(() => {
  useCountryStore().setBackground(DEFAULT_BACKGROUND)
})

const currentMessage = computed(() => useSnackbarStore().messages[0])

const onSnackbarClose = () => {
  useSnackbarStore().removeMessage()
}

watch(useCountryStore().selectedValues, () => {
  let bg = DEFAULT_BACKGROUND
  if (useCountryStore().selectedValues.country_id) {
    const countryData = useCountryStore().country.find(
      (country) => country.id == useCountryStore().selectedValues.country_id
    )
    bg = countryData?.country_image_url || DEFAULT_BACKGROUND
  }
  useCountryStore().setBackground(bg)
})
watch(currentMessage, () => {
  setTimeout(() => {
    useSnackbarStore().removeMessage()
  }, SNACKBAR_HIDE_TIME)
})
</script>

<style>
html {
  overflow: hidden;
}
body {
  background-image: var(--custom-background-image);
  background-size: cover;
  background-color: gray;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

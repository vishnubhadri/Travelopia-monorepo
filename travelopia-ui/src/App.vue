<template>
  <div>
    <RouterView />
  </div>
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
  if (useCountryStore().selectedValues.country_id) {
    const countryData = useCountryStore().country.find(
      (country) => country.id == useCountryStore().selectedValues.country_id
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

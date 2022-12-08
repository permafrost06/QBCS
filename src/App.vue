<script setup lang="ts">
import { RouterView } from "vue-router";
import "@/firebase";
</script>

<template>
  <RouterView class="router-view" v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <component :is="Component"></component>
        <template #fallback> Loading... </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

body {
  background-color: hsl(211, 48%, 95%);
}

*,
*::before,
*::after {
  margin: 0;
}

.router-view {
  margin-bottom: 5rem;
}

.page-title {
  text-align: center;
}

.formkit-inner {
  box-shadow: 0 0 2px hsl(252, 8%, 75%);
}

.formkit-inner > input {
  background-color: white;
}
</style>

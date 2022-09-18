<script setup lang="ts">
import { RouterView } from "vue-router";
import NavComponent from "./components/NavComponent.vue";
</script>

<template>
  <div>
    <NavComponent />
    <RouterView class="router-view" />
  </div>
</template>

<style scoped>
body,
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
.router-view {
  margin-bottom: 4rem;
}
</style>

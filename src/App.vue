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
  .router-view {
    margin-bottom: 2rem;
  }
</style>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <ul>
    <RouterLink :to="{ name: 'All Questions' }">
      <li>ব্রাউজ</li>
    </RouterLink>
    <RouterLink :to="{ name: 'Add Question' }">
      <li>+</li>
    </RouterLink>
    <RouterLink :to="{ name: 'Test' }">
      <li>টেস্ট</li>
    </RouterLink>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
  background: white;
  z-index: 999;
  background-color: hsl(211, 48%, 81%);
}

li {
  padding: 0.5rem;
  margin-inline: 1rem;
}

a {
  text-decoration: none;
  color: black;
}
</style>

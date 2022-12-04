<script setup lang="ts">
const props = defineProps<{
  visible: boolean;
  id: string;
}>();
</script>

<template>
  <router-link :to="{ name: 'Edit Question', params: { id: props.id } }">
    <svg
      class="edit-button"
      v-if="props.visible"
      width="15"
      height="15"
      viewBox="0 0 175 175"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 138.5H14.5V122L130.5 6L147.5 23L32 138.5Z"
        stroke="black"
        stroke-width="8"
      />
      <path
        d="M6 158H108"
        stroke="black"
        stroke-width="8"
        stroke-linecap="round"
      />
    </svg>
  </router-link>
</template>

<style>
.edit-button {
  padding: 0.2rem;
}
</style>

<script setup lang="ts">
import { watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import NavComponent from "./components/NavComponent.vue";
import { useUserStore } from "./stores/userStore";

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();

watch(
  () => route.name,
  (path) => {
    if (path !== "Log in") {
      if (userStore.userCreds) {
        if (!userStore.userCreds.user) {
          router.push({ name: "Log in" });
        }
      } else {
        router.push({ name: "Log in" });
      }
    }
  }
);
</script>

<template>
  <div>
    <NavComponent class="navigation" />
    <RouterView class="router-view" v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component"></component>
          <template #fallback> Loading... </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<style>
body,
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

*,
*::before,
*::after {
  margin: 0;
}
.router-view {
  margin-bottom: 4rem;
}
</style>

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
      if (!userStore.isLoggedIn()) router.push({ name: "Log in" });
    }
  }
);

const logout = () => {
  userStore.logOut();
  router.push({ name: "Log in" });
};
</script>

<template>
  <div>
    <button @click="logout" class="logout">Logout</button>
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

.logout {
  position: absolute;
  top: 0;
  right: 0;
}
</style>

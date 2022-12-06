<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import "@/firebase";
import * as firebaseUser from "@/firebase/controllers/user";

const router = useRouter();

const editMode = ref(false);

// const logout = () => {
//   firebaseUser.logOut();
//   router.push({ name: "Log in" });
// };
</script>

<template>
  <div>
    <RouterView class="router-view" v-slot="{ Component }">
      <template v-if="Component">
        <Suspense>
          <component :edit-mode="editMode" :is="Component"></component>
          <template #fallback> Loading... </template>
        </Suspense>
      </template>
    </RouterView>
  </div>
</template>

<style>
@font-face {
  font-family: "SolaimanLipi";
  src: url("fonts/SolaimanLipi.ttf");
}

body {
  font-family: "SolaimanLipi", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
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

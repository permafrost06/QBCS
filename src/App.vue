<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
import NavComponent from "./components/NavComponent.vue";
import "@/firebase";
import * as firebaseUser from "@/firebase/controllers/user";

const router = useRouter();

const editMode = ref(false);

const logout = () => {
  firebaseUser.logOut();
  router.push({ name: "Log in" });
};

const toggleEdit = () => {
  editMode.value = !editMode.value;
};
</script>

<template>
  <div>
    <button @click="logout" class="logout">Logout</button>
    <button @click="toggleEdit" class="edit-button">Edit</button>
    <NavComponent class="navigation" />
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

.edit-button {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

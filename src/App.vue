<script setup lang="ts">
import { ref } from "vue";
import { RouterView, useRouter } from "vue-router";
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
    <RouterLink class="add-button" :to="{ name: 'Add Question' }">
      +
    </RouterLink>
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

.add-button {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 999;

  text-align: center;
  display: inline-block;
  cursor: pointer;
  width: 3.125rem;
  height: 3.125rem;
  border: 0.125rem solid hsl(211, 48%, 81%);
  background-color: hsl(211, 48%, 81%);
  padding: 0;
  text-decoration: none;
  text-align: center;
  color: white;
  font-size: 2.25rem;
  font-weight: 500;
  line-height: 2.75rem;
  border-radius: 1.6875rem;
  margin: 0;
}
</style>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { isLoggedIn, logIn } from "@/firebase/controllers/user";

const router = useRouter();

const loginCheck = setInterval(() => {
  if (isLoggedIn()) {
    router.push({ name: "All Questions" });
  }
}, 1000);

const handleLogin = async () => {
  try {
    await logIn();

    router.push({ name: "All Questions" });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    }
  }
};

onBeforeMount(() => {
  document.querySelector(".navigation")?.classList.add("hidden");
});

onBeforeUnmount(() => {
  document.querySelector(".navigation")?.classList.remove("hidden");
  clearInterval(loginCheck);
});
</script>

<template>
  <div class="form-holder">
    <button class="login-button" @click="handleLogin">লগ ইন</button>
  </div>
</template>

<style>
.form-holder {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsl(0, 100%, 100%);
  height: 100vh;
  width: 100vw;
  position: absolute;
}

.login-button {
  background-color: hsl(213, 100%, 50%);
  border: 1px solid hsl(213, 100%, 50%);
  border-radius: 0.25rem;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
}
</style>

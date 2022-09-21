<script setup lang="ts">
import { firebaseLogin } from "@/firebase";
import { useUserStore } from "@/stores/userStore";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
// import { RouterLink } from "vue-router";

const router = useRouter();

const userStore = useUserStore();

const loginInfo = ref({} as { username: string; password: string });

const loginFormSchema = ref([
  {
    $formkit: "text",
    name: "username",
    label: "ইউজারনেম",
    validation: "required",
    validationMessages: {
      required: "ইউজারনেম ফিল্ডটি বাধ্যতামূলক",
    },
  },
  {
    $formkit: "password",
    name: "password",
    label: "পাসওয়ার্ড",
    validation: "required",
    validationMessages: {
      required: "পাসওয়ার্ড ফিল্ডটি বাধ্যতামূলক",
    },
  },
]);

const handleLogin = async () => {
  try {
    const userCreds = await firebaseLogin(
      loginInfo.value.username,
      loginInfo.value.password
    );

    userStore.setUser(userCreds);
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
});
</script>

<template>
  <div class="form-holder">
    <FormKit
      type="form"
      submit-label="লগ ইন"
      v-model="loginInfo"
      @submit="handleLogin"
    >
      <FormKitSchema :schema="loginFormSchema" />
    </FormKit>
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
</style>

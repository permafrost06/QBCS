import type { UserCredential } from "@firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userCreds = ref<UserCredential | null>();

  const setUser = (user: UserCredential) => {
    userCreds.value = user;
  };

  const logOut = () => {
    userCreds.value = null;
  };

  return { userCreds, setUser, logOut };
});

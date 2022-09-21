import type { UserCredential } from "@firebase/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userCreds = ref<UserCredential | null>();

  const setUser = (user: UserCredential) => {
    userCreds.value = user;
  };

  const isLoggedIn = (): boolean => {
    if (userCreds.value) return true;
    return false;
  };

  const logOut = () => {
    userCreds.value = null;
  };

  const getUid = (): string => {
    if (!userCreds.value) throw new Error("User not logged in");
    return userCreds.value.user.uid;
  };

  return { userCreds, setUser, logOut, getUid, isLoggedIn };
});

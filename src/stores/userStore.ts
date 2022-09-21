import type { UserCredential } from "@firebase/auth";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    userCreds: useStorage("userCreds", {} as UserCredential | null),
  }),
  actions: {
    setUser(user: UserCredential) {
      this.userCreds = user;
    },

    isLoggedIn(): boolean {
      if (this.userCreds) {
        if (this.userCreds.user) return true;
      }
      return false;
    },

    logOut() {
      this.userCreds = null;
    },

    getUid(): string {
      if (!this.userCreds) throw new Error("User not logged in");
      return this.userCreds.user.uid;
    },

    getName(): string {
      if (!this.userCreds) throw new Error("User not logged in");
      return this.userCreds.user.displayName
        ? this.userCreds.user.displayName
        : "";
    },
  },
});

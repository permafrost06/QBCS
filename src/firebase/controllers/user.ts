import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  signOut,
  type User,
} from "firebase/auth";
import type { FirebaseError } from "firebase/app";

const auth = getAuth();

export const logIn = async () => {
  const provider = new GoogleAuthProvider();

  await setPersistence(auth, browserLocalPersistence);

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    throw new Error((error as FirebaseError).message);
  }
};

export const isLoggedIn = (): boolean => {
  if (auth.currentUser == null) return false;

  return true;
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error((error as FirebaseError).message);
  }
};

export const getUser = (): User => {
  const user = auth.currentUser;

  if (user == null) throw new Error("User is not logged in");

  return user;
};

export const getUid = (): string => {
  return getUser().uid;
};

export const getName = (): string => {
  const displayName = getUser().displayName;

  if (displayName !== null) return displayName;
  return "";
};

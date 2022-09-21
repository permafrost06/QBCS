import { FirebaseError, initializeApp } from "firebase/app";
import {
  initializeFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  enableIndexedDbPersistence,
  CACHE_SIZE_UNLIMITED,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  type UserCredential,
} from "firebase/auth";
import type { Question } from "./models/Question.model";
import { useUserStore } from "./stores/userStore";

const firebaseConfig = {
  apiKey: "AIzaSyAztfGwIasnPyTjHFVgrLQGXqRZCxIWcJU",
  authDomain: "permafrost06-qbcs.firebaseapp.com",
  projectId: "permafrost06-qbcs",
  storageBucket: "permafrost06-qbcs.appspot.com",
  messagingSenderId: "20525681341",
  appId: "1:20525681341:web:7b93ef1c58ee993910c5d4",
};

const app = initializeApp(firebaseConfig);

export const firebaseLogin = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  try {
    return await signInWithPopup(auth, provider);
  } catch (error) {
    throw new Error((error as FirebaseError).message);
  }
};

const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

enableIndexedDbPersistence(db);

export const addQuestion = async (question: Question) => {
  const userStore = useUserStore();

  question.owner = userStore.getUid();

  try {
    const docRef = await addDoc(collection(db, "questions"), question);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllQuestions = async (): Promise<Question[]> => {
  const querySnapshot = await getDocs(collection(db, "questions"));

  const allDocs: Question[] = [];
  querySnapshot.forEach((doc) => {
    allDocs.push({
      id: doc.id,
      ...doc.data(),
    } as Question);
  });

  return allDocs;
};

export const getConfig = async (config: string) => {
  const docRef = doc(db, "config", config);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error(`Could not get config ${config}`);
  }
};

export const addConfig = async (config: string, data: any) => {
  const docRef = doc(db, "config", config);

  try {
    await getConfig(config);
  } catch (e) {
    await setDoc(docRef, data);
  }

  await updateDoc(docRef, data);
};

export const getCategories = async (): Promise<Map<string, string>> => {
  const categories = await getConfig("categories");

  return new Map(Object.entries(categories));
};

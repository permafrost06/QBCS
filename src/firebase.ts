import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import type { Question } from "./models/Question.model";

const firebaseConfig = {
  apiKey: "AIzaSyAztfGwIasnPyTjHFVgrLQGXqRZCxIWcJU",
  authDomain: "permafrost06-qbcs.firebaseapp.com",
  projectId: "permafrost06-qbcs",
  storageBucket: "permafrost06-qbcs.appspot.com",
  messagingSenderId: "20525681341",
  appId: "1:20525681341:web:7b93ef1c58ee993910c5d4",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const addQuestion = async (question: Question) => {
  try {
    const docRef = await addDoc(collection(db, "questions"), question);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllQuestions = async () => {
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

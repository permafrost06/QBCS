import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useUserStore } from "@/stores/userStore";
import { db } from "@/firebase";
import type { Question } from "@/models/Question.model";

export const addQuestion = async (question: Question) => {
  const userStore = useUserStore();

  question.owner = {
    uid: userStore.getUid(),
    name: userStore.getName(),
  };

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
export const updateQuestion = async (question: Question) => {
  const { id, ...quesDoc } = question;

  const docRef = doc(db, "questions", id);

  try {
    await updateDoc(docRef, { ...quesDoc });
  } catch (e) {
    console.log(e);
  }
};

export const deleteQuestion = async (id: string) => {
  const quesRef = doc(db, "questions", id);

  await deleteDoc(quesRef);
};

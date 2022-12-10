import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    getDoc,
    setDoc,
    serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import * as firebaseUser from "@/firebase/controllers/user";
import { db } from "@/firebase";
import type { Question } from "@/models/Question.model";

export const addQuestion = async (question: Question) => {
    question.owner = {
        uid: firebaseUser.getUid(),
        name: firebaseUser.getName(),
    };

    question.timestamp = serverTimestamp() as Timestamp;

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

export const getQuestion = async (id: string): Promise<Question> => {
    const docRef = doc(db, "questions", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as Question;
    } else {
        throw new Error(`Could not get question with ${id}`);
    }
};

export const updateQuestion = async (question: Question) => {
    const { id, ...quesDoc } = question;

    const docRef = doc(db, "questions", id);

    try {
        await setDoc(docRef, quesDoc);
    } catch (e) {
        console.log(e);
    }
};

export const deleteQuestion = async (id: string) => {
    const quesRef = doc(db, "questions", id);

    await deleteDoc(quesRef);
};

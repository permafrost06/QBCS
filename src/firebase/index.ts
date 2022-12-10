import { initializeApp } from "firebase/app";
import {
    initializeFirestore,
    doc,
    getDoc,
    enableIndexedDbPersistence,
    CACHE_SIZE_UNLIMITED,
    updateDoc,
    setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAztfGwIasnPyTjHFVgrLQGXqRZCxIWcJU",
    authDomain: "permafrost06-qbcs.firebaseapp.com",
    projectId: "permafrost06-qbcs",
    storageBucket: "permafrost06-qbcs.appspot.com",
    messagingSenderId: "20525681341",
    appId: "1:20525681341:web:7b93ef1c58ee993910c5d4",
};

const app = initializeApp(firebaseConfig);

export const db = initializeFirestore(app, {
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

enableIndexedDbPersistence(db);

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

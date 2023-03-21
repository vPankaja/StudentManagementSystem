import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6P7CzWpVI28D2HlXaZzH5fS6D9w0i_sY",
  authDomain: "crudapp-3c608.firebaseapp.com",
  databaseURL: "https://crudapp-3c608-default-rtdb.firebaseio.com",
  projectId: "crudapp-3c608",
  storageBucket: "crudapp-3c608.appspot.com",
  messagingSenderId: "559792968464",
  appId: "1:559792968464:web:45de24415208e7cc1f0b95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

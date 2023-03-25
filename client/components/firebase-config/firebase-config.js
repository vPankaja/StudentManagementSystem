import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_HApjmhym_YM5n7C1lY45IInpMmEmA1A",
  authDomain: "studentmanagemet.firebaseapp.com",
  projectId: "studentmanagemet",
  storageBucket: "studentmanagemet.appspot.com",
  messagingSenderId: "678737456673",
  appId: "1:678737456673:web:c61dedc299f1f15b063d60",
  measurementId:"G-BB6X4VVPCL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhNgRl400MB2JRUFC_mxAQgKRNsLfiBBs",
  authDomain: "todo-react-tailwind.firebaseapp.com",
  databaseURL: "https://todo-react-tailwind-default-rtdb.firebaseio.com",
  projectId: "todo-react-tailwind",
  storageBucket: "todo-react-tailwind.appspot.com",
  messagingSenderId: "776120906335",
  appId: "1:776120906335:web:918d07d71958e3e6bba1ea",
  measurementId: "G-SHJQTN1F1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
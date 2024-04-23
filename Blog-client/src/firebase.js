// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogsite-82d68.firebaseapp.com",
  projectId: "blogsite-82d68",
  storageBucket: "blogsite-82d68.appspot.com",
  messagingSenderId: "185336552627",
  appId: "1:185336552627:web:d3f30d7b3cef2887c2e4c6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjh9x-VzV-658WVK9Fb2-fESfWRTxSYMQ",
  authDomain: "book-haven-cf1a4.firebaseapp.com",
  projectId: "book-haven-cf1a4",
  storageBucket: "book-haven-cf1a4.firebasestorage.app",
  messagingSenderId: "1095199326944",
  appId: "1:1095199326944:web:2cd604b65f6fe79b1e4685",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

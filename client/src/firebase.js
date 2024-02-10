// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ff822.firebaseapp.com",
  projectId: "mern-blog-ff822",
  storageBucket: "mern-blog-ff822.appspot.com",
  messagingSenderId: "446619077171",
  appId: "1:446619077171:web:0edfcaacf0e469114c7146",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

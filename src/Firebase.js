// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmMBeq38nq1J8UFFDu6fE9D4kp_2iJn0U",
  authDomain: "recipe-project-d8465.firebaseapp.com",
  projectId: "recipe-project-d8465",
  storageBucket: "recipe-project-d8465.appspot.com",
  messagingSenderId: "1000522772376",
  appId: "1:1000522772376:web:48fb71f6dacadcdac7c5ed",
  measurementId: "G-BGEEB68X2T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
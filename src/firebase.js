// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAB4LaNvNJPhfbn0UL4VW2AvVyTUfGkxY",
  authDomain: "finance-tracker-8c521.firebaseapp.com",
  projectId: "finance-tracker-8c521",
  storageBucket: "finance-tracker-8c521.appspot.com",
  messagingSenderId: "257657169618",
  appId: "1:257657169618:web:9042b0348d5c2ef1e92f0b",
  measurementId: "G-RDJNZJB4KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db= getFirestore(app);
const auth= getAuth(app);
const provider= new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc}
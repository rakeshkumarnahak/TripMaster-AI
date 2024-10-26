// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzM04YvYPhrxH3I_yNpDYpryj2yWFaskQ",
  authDomain: "tripmaster-ai-92266.firebaseapp.com",
  projectId: "tripmaster-ai-92266",
  storageBucket: "tripmaster-ai-92266.appspot.com",
  messagingSenderId: "99044270112",
  appId: "1:99044270112:web:f58e837dc8a306cc0e1c45",
  measurementId: "G-V90PSWZTTD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// const analytics = getAnalytics(app);

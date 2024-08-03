// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "real-state-8272e.firebaseapp.com",
    projectId: "real-state-8272e",
    storageBucket: "real-state-8272e.appspot.com",
    messagingSenderId: "799613970027",
    appId: "1:799613970027:web:17dfce57cccaf837fb732e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
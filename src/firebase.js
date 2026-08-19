import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEBtw0SK8QyyPOJNFlV-SwL-oVWwJJD-0",
    authDomain: "moodboard-app-e5ba9.firebaseapp.com",
    projectId: "moodboard-app-e5ba9",
    storageBucket: "moodboard-app-e5ba9.firebasestorage.app",
    messagingSenderId: "930793914231",
    appId: "1:930793914231:web:5136c77a0b897dc4d9eb72"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
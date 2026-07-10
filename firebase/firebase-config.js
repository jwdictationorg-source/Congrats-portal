import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDM80p3pdmjHqTTdaUk9ogUCV_NktnXK2U",
    authDomain: "congregation-portal.firebaseapp.com",
    projectId: "congregation-portal",
    storageBucket: "congregation-portal.firebasestorage.app",
    messagingSenderId: "983933136546",
    appId: "1:983933136546:web:26c69143c0925a5e5ff1fb",
    measurementId: "G-FZCYGXHGVN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

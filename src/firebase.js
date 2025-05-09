// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCoTpIf-FEXtZI2vqoUuxZSj7shRoHfhuo",
    authDomain: "doa-friend-app-web.firebaseapp.com",
    projectId: "doa-friend-app-web",
    storageBucket: "doa-friend-app-web.firebasestorage.app",
    messagingSenderId: "106268715001",
    appId: "1:106268715001:web:4e705692f12c9501643f28",
    measurementId: "G-E08KH5WLN7",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { analytics, db, auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDA5WEV0MsmNivefwEH7xvYAw_RhfOK2N8",
  authDomain: "withpurpose.firebaseapp.com",
  projectId: "withpurpose",
  storageBucket: "withpurpose.appspot.com",
  messagingSenderId: "603964198880",
  appId: "1:603964198880:web:281ed33aca4cab3a2ce585",
  measurementId: "G-NB0QQC5T3S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

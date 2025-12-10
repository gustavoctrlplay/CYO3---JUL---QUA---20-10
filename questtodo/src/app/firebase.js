// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7B_ymTtmXb6COs23ZcQq7mALNNgl_9nc",
  authDomain: "loginreactnativeteste.firebaseapp.com",
  projectId: "loginreactnativeteste",
  storageBucket: "loginreactnativeteste.firebasestorage.app",
  messagingSenderId: "10468870654",
  appId: "1:10468870654:web:320072f81e76dcd581d8af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
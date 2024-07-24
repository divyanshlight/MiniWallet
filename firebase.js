import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6l2mON2LI7J7Tb6gInduafD4kt68p5P8",
  authDomain: "sinestro-8674a.firebaseapp.com",
  projectId: "sinestro-8674a",
  storageBucket: "sinestro-8674a.appspot.com",
  messagingSenderId: "762816969583",
  appId: "1:762816969583:web:67e116ba3870a25208069a",
  measurementId: "G-03B9HJMXTV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCPqkvoAN8CXsfb1MqKDCUWHtsuPBxKdtw",
  authDomain: "listadetarefa-e2900.firebaseapp.com",
  projectId: "listadetarefa-e2900",
  storageBucket: "listadetarefa-e2900.appspot.com",
  messagingSenderId: "799956952367",
  appId: "1:799956952367:web:f1f73552838b474b95adda",
  measurementId: "G-NYQ8SLVFFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}
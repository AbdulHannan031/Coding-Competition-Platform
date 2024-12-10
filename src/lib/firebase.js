import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyByNRdPmkRfBojyOLIUQHe__hnYAzI3SU8",
    authDomain: "coding-a3a9f.firebaseapp.com",
    projectId: "coding-a3a9f",
    storageBucket: "coding-a3a9f.firebasestorage.app",
    messagingSenderId: "314332918835",
    appId: "1:314332918835:web:7fa9243ae1ee99a7f89f46",
    measurementId: "G-LNGC706451"
};

const app = initializeApp(firebaseConfig);
const db= getFirestore(app);
const auth= getAuth(app)
const provider = new GoogleAuthProvider(); 

const storage = getStorage(app);

export {auth,provider,storage};
export default db;
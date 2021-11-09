// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig={
apiKey: "AIzaSyBBoJLl6J2UCxSurTS8PQNHSiMfcw59kJM",
authDomain: "peer-code-review.firebaseapp.com",
projectId: "peer-code-review",
storageBucket: "peer-code-review.appspot.com",
messagingSenderId: "254864561871",
appId: "1:254864561871:web:d9e0b4628977a2956c49ba",
measurementId: "G-9QX3HQ41E9"};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider};

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBME5sSRj2DEkRuep78WUgyzb5M4RjpAH4",
    authDomain: "todoapplication-2b2ff.firebaseapp.com",
    projectId: "todoapplication-2b2ff",
    storageBucket: "todoapplication-2b2ff.appspot.com",
    messagingSenderId: "407793702001",
    appId: "1:407793702001:web:dfd7628087efae8f5937d0"
};

const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


//xport const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const GetDB = () => {
//     return getFirestore(app);
// }
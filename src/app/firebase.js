import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBME5sSRj2DEkRuep78WUgyzb5M4RjpAH4",
    authDomain: "todoapplication-2b2ff.firebaseapp.com",
    projectId: "todoapplication-2b2ff",
    storageBucket: "todoapplication-2b2ff.appspot.com",
    messagingSenderId: "407793702001",
    appId: "1:407793702001:web:dfd7628087efae8f5937d0"
};

const app = initializeApp(firebaseConfig);

export const GetDB = () => {
    return getFirestore(app);
}
import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
    apiKey: "AIzaSyAHUGemmvsTl3Wvtj4KL8Kw5GFhiwKP9N4",
    authDomain: "instagram-c3bf3.firebaseapp.com",
    projectId: "instagram-c3bf3",
    storageBucket: "instagram-c3bf3.appspot.com",
    messagingSenderId: "268113366278",
    appId: "1:268113366278:web:7fa7b25e2858c7f5316287",
    measurementId: "G-LGHSG2S29P"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };

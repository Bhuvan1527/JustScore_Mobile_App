import { initializeApp, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence , getAuth} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { Firestore } from 'firebase/firestore';
// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBQs5559FDK3-40KXXHtg0NB8mjfgIOi2U",
    authDomain: "justscore-d115a.firebaseapp.com",
    projectId: "justscore-d115a",
    storageBucket: "justscore-d115a.appspot.com",
    messagingSenderId: "397995838663",
    appId: "1:397995838663:web:628049a6bd5c7e18ce02e2"
  };

const FIREBASE_APP = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

const db = getFirestore(FIREBASE_APP);


// Initialize Firebase Authentication and get a reference to the service
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export {FIREBASE_APP, FIREBASE_AUTH, db};
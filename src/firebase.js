import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCiCBOOMqkbbsXfz238GRLqAa0kQZLsbk",
    authDomain: "cart-1153f.firebaseapp.com",
    projectId: "cart-1153f",
    storageBucket: "cart-1153f.appspot.com",
    messagingSenderId: "302419265694",
    appId: "1:302419265694:web:6ffa39f616ce861fcc938f"
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
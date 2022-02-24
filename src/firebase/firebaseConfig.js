import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDCWlo8WAyu_inDK0KJBgn2Iit_COEJfm8",
  authDomain: "sprint-3-auth-crud.firebaseapp.com",
  projectId: "sprint-3-auth-crud",
  storageBucket: "sprint-3-auth-crud.appspot.com",
  messagingSenderId: "92441949003",
  appId: "1:92441949003:web:cd268877af215709baaece"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const google =  new GoogleAuthProvider();
const facebook = new FacebookAuthProvider();

export{
    app,
    db,
    google,
    facebook
}
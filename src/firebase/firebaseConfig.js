import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBgcLW2HMbHO5C7h0moH_nAawdWMCx4qAI",
  authDomain: "sprint-3-cbea4.firebaseapp.com",
  projectId: "sprint-3-cbea4",
  storageBucket: "sprint-3-cbea4.appspot.com",
  messagingSenderId: "484196866702",
  appId: "1:484196866702:web:452523da7640d3689007df"
};

const app = initializeApp(firebaseConfig);
const google =  new GoogleAuthProvider();

export{
    app,
    google
}
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZzsFY2z1tbgHGi2Bh7NC6qeRJ_BY-Ueo",
  authDomain: "authentication-5ec44.firebaseapp.com",
  projectId: "authentication-5ec44",
  storageBucket: "authentication-5ec44.appspot.com",
  messagingSenderId: "230907446057",
  appId: "1:230907446057:web:c240a5c0f12e399fa76d38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const db=getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export default app;
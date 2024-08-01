import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAvMiJ-sp8AVS5yTUOD8dxzAxzG2mu7RJY",
  authDomain: "redsocial-cocina.firebaseapp.com",
  projectId: "redsocial-cocina",
  storageBucket: "redsocial-cocina.appspot.com",
  messagingSenderId: "838740514636",
  appId: "1:838740514636:web:3ce6efe4fb156e2f91e1e9"
};
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export { auth, db };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
export const provider = new GoogleAuthProvider();



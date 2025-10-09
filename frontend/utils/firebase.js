import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginonecart-7a9f3.firebaseapp.com",
  projectId: "loginonecart-7a9f3",
  storageBucket: "loginonecart-7a9f3.appspot.com",
  messagingSenderId: "917943959057",
  appId: "1:917943959057:web:3354cf680cdc136445fbb0"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();

export {auth,provider}
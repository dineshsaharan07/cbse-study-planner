import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAYaNQll_QJcbvgEldmMgtHMwYdfFcAtik",
  authDomain: "study-planner-38b3f.firebaseapp.com",
  projectId: "study-planner-38b3f",
  storageBucket: "study-planner-38b3f.firebasestorage.app",
  messagingSenderId: "667922377732",
  appId: "1:667922377732:web:48eca828ec7350debe1951",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

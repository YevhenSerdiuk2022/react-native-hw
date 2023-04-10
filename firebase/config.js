
import { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDlNu8D3dtaN6q9j3iVPSrHj9eM80KRxgQ",
  authDomain: "my-project2023-n.firebaseapp.com",
  projectId: "my-project2023-n",
  storageBucket: "my-project2023-n.appspot.com",
  messagingSenderId: "62991684859",
  appId: "1:62991684859:web:02179f071c814b4a658c5e",
  measurementId: "G-V6GKQ2RLR5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
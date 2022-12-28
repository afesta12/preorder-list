// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDO-a2-AsZjyNTJbi1Y6Qux3el3-ZywEv0",
  authDomain: "preorder-list.firebaseapp.com",
  databaseURL: "https://preorder-list-default-rtdb.firebaseio.com",
  projectId: "preorder-list",
  storageBucket: "preorder-list.appspot.com",
  messagingSenderId: "91009138689",
  appId: "1:91009138689:web:6a8d4646d2ed983a91c000",
  measurementId: "G-2LYHRSDWP3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export
export const db = getDatabase(app);
export const auth = getAuth();
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyARHY8ztnhzKgs_2269-4GfQ6dCztyOWmU",
  authDomain: "mpower-outfoxed.firebaseapp.com",
  projectId: "mpower-outfoxed",
  storageBucket: "mpower-outfoxed.firebasestorage.app",
  messagingSenderId: "981099150842",
  appId: "1:981099150842:web:7b3b0b39ddb7b5ddf43843"
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

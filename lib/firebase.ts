// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBAsb2N140NHxniT9W_h5Dwd_ybUk4DiDI",
    authDomain: "statefarmhackprofile.firebaseapp.com",
    projectId: "statefarmhackprofile",
    storageBucket: "statefarmhackprofile.appspot.com",
    messagingSenderId: "640000197229",
    appId: "1:640000197229:web:2d9a36f83dee897578b564",
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

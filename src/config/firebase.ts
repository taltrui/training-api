import dotenv from 'dotenv';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import fbAdmin, {ServiceAccount} from 'firebase-admin';

dotenv.config();

import serviceAccount  from "../../serviceAccountKey.json";

export const admin = fbAdmin.initializeApp({
  credential: fbAdmin.credential.cert(serviceAccount as ServiceAccount)
});


const firebaseConfig = {
  apiKey: process.env.FIRESTORE_API_KEY,
  authDomain: process.env.FIRESTORE_AUTH_DOMAIN,
  databaseURL: process.env.FIRESTORE_DATABASE_URL,
  projectId: process.env.FIRESTORE_PROJECT_ID,
  storageBucket: process.env.FIRESTORE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRESTORE_MESSAGING_SENDER_ID,
  appId: process.env.FIRESTORE_APP_ID,
  measurementId: process.env.FIRESTORE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

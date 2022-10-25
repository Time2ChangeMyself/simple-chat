import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCR7BksJPLrpq5YOhoKG8xLBmDXyQ0bB9c',
  authDomain: 'chat-36ab0.firebaseapp.com',
  projectId: 'chat-36ab0',
  storageBucket: 'chat-36ab0.appspot.com',
  messagingSenderId: '119893139796',
  appId: '1:119893139796:web:f126ccb396830c37a4a8c1',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

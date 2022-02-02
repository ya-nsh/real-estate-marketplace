// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAjV55-w1LiCQdhv2S6zJqEPYt1dhpK1WU',
  authDomain: 'real-estate-marketplace-f9743.firebaseapp.com',
  projectId: 'real-estate-marketplace-f9743',
  storageBucket: 'real-estate-marketplace-f9743.appspot.com',
  messagingSenderId: '898484924437',
  appId: '1:898484924437:web:12cb5535e322859deb5e1c'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDhd4NhiNhSjP-IeksTXYzlKGYEKBvVhJ0",
  authDomain: "lavavelox.firebaseapp.com",
  databaseURL: "https://lavavelox-default-rtdb.firebaseio.com",
  projectId: "lavavelox",
  storageBucket: "lavavelox.appspot.com",
  messagingSenderId: "556143067475",
  appId: "1:556143067475:web:d106cf52e59900943fe1a6"
};


const app = initializeApp(firebaseConfig)

export { app }
import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXBvDE1nKy9O63Cv1iHeouOEGQMfd4YtA",
  authDomain: "urunga-1c092.firebaseapp.com",
  projectId: "urunga-1c092",
  storageBucket: "urunga-1c092.appspot.com",
  messagingSenderId: "682995738569",
  appId: "1:682995738569:web:6d48bad9f2c2b4b1f8ea18",
  measurementId: "G-JLVLLTFCHW",
};

firebase.initializeApp(firebaseConfig);

export default firebase;

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCA-NmbKjEwiGU15M5hEo8pVal2UOo6S_M",
  authDomain: "dp-clone-3c2d8.firebaseapp.com",
  projectId: "dp-clone-3c2d8",
  storageBucket: "dp-clone-3c2d8.appspot.com",
  messagingSenderId: "1048970731010",
  appId: "1:1048970731010:web:5c739f9c8d015be5aed11b",
  measurementId: "G-55Q5MRQYJ0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCwlSM2M1Av312FjEAff-4Gc1Flad_f1No",
  authDomain: "disney-clone-f74c7.firebaseapp.com",
  projectId: "disney-clone-f74c7",
  storageBucket: "disney-clone-f74c7.appspot.com",
  messagingSenderId: "127765675237",
  appId: "1:127765675237:web:bdadc5172eb1b6dff4e80c",
  measurementId: "G-1T2QB0N34Q",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };

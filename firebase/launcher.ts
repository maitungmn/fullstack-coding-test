import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./configs";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export default firebase;

export const auth = firebase.auth();
export const DB = firebase.firestore();

export const usersCol = DB.collection("Users");



import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseConfig from "./configs";

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();

export const usersCol = (userID: string = "") => firebase.database().ref("Users/" + (userID || ""));



import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import firebaseConfig from "./configs";

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();

export const realTimeDB = firebase.database()

export const usersCol = (userID: string = "") => realTimeDB.ref("Users/" + (userID || ""));
export const usersColGetOnce = (userID: string = "") => realTimeDB.ref().child("Users").child(userID);

export const DB = firebase.firestore();
export const blogsCol = DB.collection("blogs")

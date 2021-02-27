import * as firebaseAdmin from "firebase-admin";
import firebaseConfig from "./configs";
import serviceAccount from "../firebase-admin.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: firebaseConfig.databaseURL,
  });
}

export { firebaseAdmin };

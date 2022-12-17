import admin from "firebase-admin";
import * as serviceAccount from "./adminCredential.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;

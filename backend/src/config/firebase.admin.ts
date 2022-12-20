import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

const serviceAccount = JSON.parse(
  process.env?.FIREBASE_ADMIN_CREDENTIALS || "{}",
);

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  // eslint-disable-next-line no-console
  console.log("[FIREBASE] Successful connection.");
} catch (e) {
  // eslint-disable-next-line no-console
  console.error(
    "[FIREBASE] Error - Failed to connect to Firebase. Check env keys.",
  );
}

export default admin;

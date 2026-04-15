const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
// For production: use a service account JSON key file
// For development: uses FIREBASE_PROJECT_ID and other env vars OR application default credentials

let firebaseApp;

if (!admin.apps.length) {
  try {
    // Try service account file first (production)
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
    } else {
      // Development fallback: use application default credentials
      firebaseApp = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL: process.env.FIREBASE_DATABASE_URL || "https://learnova-dc989-default-rtdb.firebaseio.com",
        projectId: process.env.FIREBASE_PROJECT_ID || "learnova-dc989",
      });
    }
    console.log("✅ Firebase Admin SDK initialized");
  } catch (err) {
    console.warn("⚠️  Firebase Admin not initialized (running without auth verification):", err.message);
  }
} else {
  firebaseApp = admin.apps[0];
}

const adminAuth = admin.apps.length ? admin.auth() : null;
const adminDb   = admin.apps.length ? admin.database() : null;

module.exports = { admin, adminAuth, adminDb };

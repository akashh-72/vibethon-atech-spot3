const { adminDb } = require("../config/firebase");

/**
 * GET /api/auth/user/:uid
 * Returns a user's profile from Firebase Realtime Database.
 */
const getUserProfile = async (req, res, next) => {
  try {
    const { uid } = req.params;
    if (!adminDb) {
      return res.json({ message: "Firebase Admin not configured — use client SDK directly" });
    }
    const snap = await adminDb.ref(`users/${uid}`).get();
    if (!snap.exists()) return res.status(404).json({ error: "User not found" });
    res.json(snap.val());
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/verify
 * Verifies the calling user's token (used by frontend to confirm auth).
 */
const verifyAuth = (req, res) => {
  res.json({ uid: req.user.uid, email: req.user.email, verified: true });
};

module.exports = { getUserProfile, verifyAuth };

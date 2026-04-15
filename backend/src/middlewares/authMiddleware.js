const { adminAuth } = require("../config/firebase");

/**
 * Middleware: Verifies Firebase ID token from Authorization header.
 * Attaches decoded user info to req.user.
 */
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split("Bearer ")[1];

  // If Firebase Admin is not initialized (dev mode), skip verification
  if (!adminAuth) {
    console.warn("⚠️  Token verification skipped (Firebase Admin not initialized)");
    req.user = { uid: "dev-user" };
    return next();
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };

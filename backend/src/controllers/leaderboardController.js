const { adminDb } = require("../config/firebase");

/**
 * GET /api/leaderboard
 * Returns top users sorted by XP (default limit: 50).
 */
const getLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    if (!adminDb) {
      return res.json({ leaderboard: [], message: "Firebase Admin not configured" });
    }

    const snap = await adminDb.ref("users").orderByChild("xp").limitToLast(limit).get();
    if (!snap.exists()) return res.json({ leaderboard: [] });

    const users = [];
    snap.forEach((child) => {
      const u = child.val();
      users.push({
        uid: child.key,
        displayName: u.displayName || "Anonymous",
        xp: u.xp || 0,
        level: u.level || 1,
        streak: u.streak || 0,
        completedModules: (u.completedModules || []).length,
        badges: (u.badges || []).length,
      });
    });

    // Sort desc by XP
    users.sort((a, b) => b.xp - a.xp);
    res.json({ leaderboard: users, total: users.length });
  } catch (err) {
    next(err);
  }
};

module.exports = { getLeaderboard };

const { adminDb } = require("../config/firebase");

/**
 * GET /api/progress/:uid
 * Returns progress data for a specific user.
 */
const getProgress = async (req, res, next) => {
  try {
    const { uid } = req.params;
    if (!adminDb) return res.json({ message: "Firebase Admin not configured" });
    const snap = await adminDb.ref(`users/${uid}`).get();
    if (!snap.exists()) return res.status(404).json({ error: "User not found" });
    const data = snap.val();
    res.json({
      uid,
      xp: data.xp || 0,
      level: data.level || 1,
      streak: data.streak || 0,
      completedModules: data.completedModules || [],
      quizScores: data.quizScores || {},
      badges: data.badges || [],
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/progress/update
 * Updates progress fields for the authenticated user.
 */
const updateProgress = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const { xp, level, completedModules, quizScores, badges, streak } = req.body;
    if (!adminDb) return res.json({ message: "Firebase Admin not configured" });

    const updates = {};
    if (xp              !== undefined) updates.xp = xp;
    if (level           !== undefined) updates.level = level;
    if (streak          !== undefined) updates.streak = streak;
    if (completedModules !== undefined) updates.completedModules = completedModules;
    if (quizScores      !== undefined) updates.quizScores = quizScores;
    if (badges          !== undefined) updates.badges = badges;

    await adminDb.ref(`users/${uid}`).update(updates);
    res.json({ success: true, updated: Object.keys(updates) });
  } catch (err) {
    next(err);
  }
};

module.exports = { getProgress, updateProgress };

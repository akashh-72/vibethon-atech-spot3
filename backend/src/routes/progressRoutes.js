const express = require("express");
const router = express.Router();
const { getProgress, updateProgress } = require("../controllers/progressController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Get progress for a specific user (protected - user can only get their own)
router.get("/:uid", verifyToken, (req, res, next) => {
  // Allow only the authenticated user or add admin check here
  if (req.user.uid !== req.params.uid) {
    return res.status(403).json({ error: "Forbidden: Cannot access another user's progress" });
  }
  getProgress(req, res, next);
});

// Update progress for the authenticated user
router.post("/update", verifyToken, updateProgress);

module.exports = router;

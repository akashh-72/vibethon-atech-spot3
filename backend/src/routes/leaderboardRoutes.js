const express = require("express");
const router = express.Router();
const { getLeaderboard } = require("../controllers/leaderboardController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Public leaderboard with optional ?limit=N
router.get("/", verifyToken, getLeaderboard);

module.exports = router;

const express = require("express");
const router = express.Router();
const { getUserProfile, verifyAuth } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Verify the current user's token
router.post("/verify", verifyToken, verifyAuth);

// Get any user's public profile by UID
router.get("/user/:uid", verifyToken, getUserProfile);

module.exports = router;

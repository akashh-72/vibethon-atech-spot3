require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes        = require("./routes/authRoutes");
const progressRoutes    = require("./routes/progressRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const errorHandler      = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

// ===== HEALTH CHECK =====
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "LearNova API is running 🚀",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

// ===== ROUTES =====
app.use("/api/auth",        authRoutes);
app.use("/api/progress",    progressRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// ===== 404 =====
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ===== ERROR HANDLER =====
app.use(errorHandler);

// ===== START =====
app.listen(PORT, () => {
  console.log(`\n🚀 LearNova API running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}\n`);
});

module.exports = app;

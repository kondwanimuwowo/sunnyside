// ============================================================================
// FILE: backend/server.js
// Main server entry point - Clean and minimal
// ============================================================================

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const donationRoutes = require("./routes/donations.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    lencoConfigured: !!process.env.LENCO_SECRET_KEY,
  });
});

// Routes
app.use("/api/donations", donationRoutes);
app.use("/api/enrollment", enrollmentRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║  🚀 Sunnyside Backend API                     ║
║                                               ║
║  Port: ${PORT}                                    ║
║  Environment: ${process.env.NODE_ENV || "development"}                     ║
║  Lenco API: ${
    process.env.LENCO_SECRET_KEY ? "✅ Configured" : "❌ Not configured"
  }            ║
║  Ready for donations & enrollments! 💚        ║
╚═══════════════════════════════════════════════╝
  `);
});

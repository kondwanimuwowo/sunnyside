// ============================================================================
// FILE: backend/server.js
// Main server entry point - Clean, safe, production-ready
// ============================================================================

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const donationRoutes = require("./routes/donations.routes");
const enrollmentRoutes = require("./routes/enrollment.routes");
const webhookRoutes = require("./routes/webhooks.routes");

const app = express();

// ---------------------------------------------------------------------------
// Trust proxy (important if deployed behind Nginx / Railway / Render / Vercel)
// ---------------------------------------------------------------------------
app.set("trust proxy", 1);

// ---------------------------------------------------------------------------
// CORS
// ---------------------------------------------------------------------------
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean),
    credentials: true,
  })
);

// ---------------------------------------------------------------------------
// Webhooks (RAW body required for signature verification)
// ---------------------------------------------------------------------------
app.use(
  "/api/webhooks",
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use("/api/webhooks", webhookRoutes);

// ---------------------------------------------------------------------------
// Standard JSON parser (everything except webhooks)
// ---------------------------------------------------------------------------
app.use(express.json());

// ---------------------------------------------------------------------------
// Rate limiters (MUST be before routes)
// ---------------------------------------------------------------------------
const donationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 donation attempts
  message: {
    success: false,
    message: "Too many donation attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const statusCheckLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // 30 status checks per minute
  message: {
    success: false,
    message: "Too many status checks. Please slow down.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiters to specific endpoints
app.use("/api/donations/initiate", donationLimiter);
app.use("/api/donations/status", statusCheckLimiter);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use("/api/donations", donationRoutes);
app.use("/api/enrollment", enrollmentRoutes);

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    lencoConfigured: !!process.env.LENCO_SECRET_KEY,
  });
});

// ---------------------------------------------------------------------------
// Global error handler (ALWAYS last)
// ---------------------------------------------------------------------------
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", err);
  } else {
    console.error("❌ Error:", err.message);
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ---------------------------------------------------------------------------
// Server start
// ---------------------------------------------------------------------------
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
// ============================================================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes =
  require("./routes/profileRoutes");

// =========================================================
// ROUTES
// =========================================================

const authorityProjectRoutes = require(
  "./routes/authorityProjectRoutes"
);

const builderProjectRoutes = require(
  "./routes/builderProjectRoutes"
);

const leadRoutes = require(
  "./routes/leadRoutes"
);

// =========================================================
// BLOG ROUTES
// =========================================================

const blogRoutes = require(
  "./routes/blogRoutes"
);


// =========================================================
// APP
// =========================================================

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);


// =========================================================
// DATABASE
// =========================================================

connectDB();


// =========================================================
// CORS
// =========================================================

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Origin not allowed by CORS")
      );
    },
    credentials: true,
  })
);


// =========================================================
// BODY PARSER
// =========================================================

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);


// =========================================================
// ROOT / HEALTH CHECK
// =========================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Real Estate API is running",
  });
});


// ==========================================
// AUTH API
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/auth",
  profileRoutes
);


// =========================================================
// AUTHORITY PROJECT API
// =========================================================
//
// GET    /api/authority-projects
// GET    /api/authority-projects/:id
// POST   /api/authority-projects
// PUT    /api/authority-projects/:id
// DELETE /api/authority-projects/:id
//
// =========================================================

app.use(
  "/api/authority-projects",
  authorityProjectRoutes
);


// =========================================================
// BUILDER PROJECT API
// =========================================================
//
// GET    /api/builder-projects
// GET    /api/builder-projects/:id
// POST   /api/builder-projects
// PUT    /api/builder-projects/:id
// DELETE /api/builder-projects/:id
//
// =========================================================

app.use(
  "/api/builder-projects",
  builderProjectRoutes
);


// =========================================================
// LEAD API
// =========================================================
//
// GET    /api/leads
// GET    /api/leads/:id
// POST   /api/leads
// PUT    /api/leads/:id
// PATCH  /api/leads/:id/status
// DELETE /api/leads/:id
// GET    /api/leads/stats
//
// =========================================================

app.use(
  "/api/leads",
  leadRoutes
);


// =========================================================
// BLOG API
// =========================================================
//
// GET    /api/blogs
// GET    /api/blogs/:id
// POST   /api/blogs
// PUT    /api/blogs/:id
// DELETE /api/blogs/:id
//
// =========================================================

app.use(
  "/api/blogs",
  blogRoutes
);


// =========================================================
// 404 HANDLER
// =========================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});


// =========================================================
// GLOBAL ERROR HANDLER
// =========================================================

app.use(
  (err, req, res, next) => {
    console.error(
      "Server Error:",
      err
    );

    res.status(500).json({
      success: false,
      message: "Internal server error",

      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : undefined,
    });
  }
);


// =========================================================
// SERVER
// =========================================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  }
);
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes =
  require("./routes/profileRoutes");
const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL,
].filter(Boolean);


// ==========================================
// DATABASE
// ==========================================

connectDB();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);


// Base64 images ke liye limit
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


// ==========================================
// TEST
// ==========================================

app.get("/", (req, res) => {
  res.json({
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
// ==========================================
// SERVER
// ==========================================


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});

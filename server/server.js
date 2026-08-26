require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const propertyRoutes = require("./routes/propertyRoutes");

const app = express();


// ==========================================
// DATABASE
// ==========================================

connectDB();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
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
// PROPERTY API
// ==========================================

app.use(
  "/api/properties",
  propertyRoutes
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
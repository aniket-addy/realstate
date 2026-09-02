const express = require("express");

const router =
  express.Router();

const protect =
  require("../middleware/authMiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/profileController");

// =====================================================
// GET PROFILE
// =====================================================

router.get(
  "/profile",
  protect,
  getProfile
);

// =====================================================
// UPDATE PROFILE
// =====================================================

router.put(
  "/profile",
  protect,
  updateProfile
);

// =====================================================
// CHANGE PASSWORD
// =====================================================

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;
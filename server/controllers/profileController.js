const User = require("../models/User");
const bcrypt = require("bcryptjs");

// =====================================================
// GET ADMIN PROFILE
// =====================================================

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// =====================================================
// UPDATE ADMIN PROFILE
// =====================================================

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      profileImage,
    } = req.body;

    // ==========================================
    // FIND USER
    // ==========================================

    const user = await User.findById(
      req.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    // ==========================================
    // CHECK EMAIL
    // ==========================================

    const normalizedEmail =
      email.toLowerCase().trim();

    if (normalizedEmail !== user.email) {
      const emailExists =
        await User.findOne({
          email: normalizedEmail,
          _id: {
            $ne: user._id,
          },
        });

      if (emailExists) {
        return res.status(400).json({
          success: false,
          message:
            "This email is already registered.",
        });
      }
    }

    // ==========================================
    // UPDATE
    // ==========================================

    user.name = name.trim();

    user.email =
      normalizedEmail;

    user.phone =
      phone ? phone.trim() : "";

    if (
      profileImage !== undefined
    ) {
      user.profileImage =
        profileImage;
    }

    const updatedUser =
      await user.save();

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully.",

      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone:
          updatedUser.phone || "",
        role: updatedUser.role,
        profileImage:
          updatedUser.profileImage || "",
        isActive:
          updatedUser.isActive,
        createdAt:
          updatedUser.createdAt,
        lastLogin:
          updatedUser.lastLogin,
      },
    });
  } catch (error) {
    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

// =====================================================
// CHANGE PASSWORD
// =====================================================

const changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Current password and new password are required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters.",
      });
    }

    // ==========================================
    // FIND USER
    // ==========================================

    const user =
      await User.findById(
        req.userId
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==========================================
    // CHECK CURRENT PASSWORD
    // ==========================================

    const passwordMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect.",
      });
    }

    // ==========================================
    // HASH NEW PASSWORD
    // ==========================================

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password changed successfully.",
    });
  } catch (error) {
    console.error(
      "CHANGE PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
};
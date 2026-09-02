const express = require("express");

const {
  createAuthorityProject,
  getAuthorityProjects,
  getAuthorityProjectById,
  updateAuthorityProject,
  deleteAuthorityProject,
  uploadAuthorityProjectImages,
  uploadAuthorityProjectDocuments,
} = require("../controllers/authorityProjectController");

// IMPORTANT:
// Apne multer/cloudinary upload middleware ka actual path yahan lagao.
//
// Example:
// const {
//   uploadImages,
//   uploadDocuments,
// } = require("../middleware/upload");

const {
  uploadImages,
  uploadDocuments,
} = require("../middleware/upload");

const router = express.Router();


// =========================================================
// GET ALL AUTHORITY PROJECTS
// =========================================================

router.get(
  "/",
  getAuthorityProjects
);


// =========================================================
// UPLOAD AUTHORITY PROJECT IMAGES
// =========================================================
//
// POST /api/authority-projects/upload-images
//
// Frontend:
// FormData.append("images", file)
//
// Middleware:
// uploadImages.array("images", 20)
// =========================================================

router.post(
  "/upload-images",
  uploadImages.array("images", 20),
  uploadAuthorityProjectImages
);


// =========================================================
// UPLOAD AUTHORITY PROJECT DOCUMENTS
// =========================================================
//
// POST /api/authority-projects/upload-documents
//
// Frontend:
// FormData.append("documents", file)
//
// Middleware:
// uploadDocuments.array("documents", 20)
// =========================================================

router.post(
  "/upload-documents",
  uploadDocuments.array("documents", 20),
  uploadAuthorityProjectDocuments
);


// =========================================================
// GET SINGLE AUTHORITY PROJECT
// =========================================================

router.get(
  "/:id",
  getAuthorityProjectById
);


// =========================================================
// CREATE AUTHORITY PROJECT
// =========================================================

router.post(
  "/",
  createAuthorityProject
);


// =========================================================
// UPDATE AUTHORITY PROJECT
// =========================================================

router.put(
  "/:id",
  updateAuthorityProject
);


// =========================================================
// DELETE AUTHORITY PROJECT
// =========================================================

router.delete(
  "/:id",
  deleteAuthorityProject
);


// =========================================================
// EXPORT
// =========================================================

module.exports = router;
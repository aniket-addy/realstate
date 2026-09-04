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

router.post(
  "/upload-images",
  uploadImages.array("images", 20),
  uploadAuthorityProjectImages
);

// =========================================================
// UPLOAD AUTHORITY PROJECT DOCUMENTS
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
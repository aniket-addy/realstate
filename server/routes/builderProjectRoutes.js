const express = require("express");

const {
  createBuilderProject,
  getBuilderProjects,
  getBuilderProjectById,
  updateBuilderProject,
  deleteBuilderProject,
  uploadBuilderProjectImages,
  uploadBuilderProjectDocuments,
} = require("../controllers/builderProjectController");

// IMPORTANT:
// Same multer middleware used for Authority Projects.
// Adjust the path below if your project keeps it elsewhere.
const {
  uploadImages,
  uploadDocuments,
} = require("../middleware/upload");

const router = express.Router();


// =========================================================
// GET ALL BUILDER PROJECTS
// =========================================================

router.get(
  "/",
  getBuilderProjects
);


// =========================================================
// GET SINGLE BUILDER PROJECT
// =========================================================

router.get(
  "/:id",
  getBuilderProjectById
);


// =========================================================
// CREATE BUILDER PROJECT
// =========================================================

router.post(
  "/",
  createBuilderProject
);


// =========================================================
// UPDATE BUILDER PROJECT
// =========================================================

router.put(
  "/:id",
  updateBuilderProject
);


// =========================================================
// DELETE BUILDER PROJECT
// =========================================================

router.delete(
  "/:id",
  deleteBuilderProject
);


// =========================================================
// UPLOAD BUILDER PROJECT IMAGES
// =========================================================
// POST /api/builder-projects/upload-images
//
// FormData field:
// images
// =========================================================

router.post(
  "/upload-images",
  uploadImages.array("images", 20),
  uploadBuilderProjectImages
);


// =========================================================
// UPLOAD BUILDER PROJECT DOCUMENTS
// =========================================================
// POST /api/builder-projects/upload-documents
//
// FormData field:
// documents
// =========================================================

router.post(
  "/upload-documents",
  uploadDocuments.array("documents", 20),
  uploadBuilderProjectDocuments
);


module.exports = router;
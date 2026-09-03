const express = require("express");

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const {
  uploadBlogImage,
} = require("../middleware/Upload");

const router = express.Router();


// ==========================================
// BLOG ROUTES
// ==========================================

// Create Blog
router.post(
  "/",
  uploadBlogImage.single("featuredImage"),
  createBlog
);


// Get All Blogs
router.get(
  "/",
  getBlogs
);


// Get Single Blog
router.get(
  "/:id",
  getBlogById
);


// Update Blog
router.put(
  "/:id",
  uploadBlogImage.single("featuredImage"),
  updateBlog
);


// Delete Blog
router.delete(
  "/:id",
  deleteBlog
);


module.exports = router;
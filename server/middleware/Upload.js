const multer = require("multer");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require(
  "../config/cloudinary"
);


// =========================================================
// AUTHORITY PROJECT IMAGE STORAGE
// =========================================================

const imageStorage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder:
        "real-estate/authority-projects/images",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      resource_type: "image",
    },
  });


// =========================================================
// AUTHORITY PROJECT DOCUMENT STORAGE
// =========================================================

const documentStorage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder:
        "real-estate/authority-projects/documents",

      resource_type: "raw",
    },
  });


// =========================================================
// BLOG IMAGE STORAGE
// =========================================================

const blogImageStorage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder:
        "real-estate/blogs",

      allowed_formats: [
        "jpg",
        "jpeg",
        "png",
        "webp",
      ],

      resource_type: "image",
    },
  });


// =========================================================
// AUTHORITY PROJECT IMAGE UPLOAD
// =========================================================

const uploadImages =
  multer({
    storage: imageStorage,

    limits: {
      fileSize:
        10 * 1024 * 1024,
    },
  });


// =========================================================
// AUTHORITY PROJECT DOCUMENT UPLOAD
// =========================================================

const uploadDocuments =
  multer({
    storage: documentStorage,

    limits: {
      fileSize:
        20 * 1024 * 1024,
    },
  });


// =========================================================
// BLOG IMAGE UPLOAD
// =========================================================

const uploadBlogImage =
  multer({
    storage: blogImageStorage,

    limits: {
      fileSize:
        10 * 1024 * 1024,
    },
  });


// =========================================================
// EXPORTS
// =========================================================

module.exports = {
  uploadImages,
  uploadDocuments,
  uploadBlogImage,
};
const multer = require("multer");
const { CloudinaryStorage } = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

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


const documentStorage =
  new CloudinaryStorage({
    cloudinary,

    params: {
      folder:
        "real-estate/authority-projects/documents",

      resource_type: "raw",
    },
  });


const uploadImages =
  multer({
    storage: imageStorage,

    limits: {
      fileSize:
        10 * 1024 * 1024,
    },
  });


const uploadDocuments =
  multer({
    storage: documentStorage,

    limits: {
      fileSize:
        20 * 1024 * 1024,
    },
  });


module.exports = {
  uploadImages,
  uploadDocuments,
};
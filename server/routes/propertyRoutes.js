const express = require("express");

const {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
} = require("../controllers/propertyController");

const router = express.Router();


// CREATE PROPERTY
router.post("/", createProperty);


// GET ALL PROPERTIES
router.get("/", getProperties);


// GET SINGLE PROPERTY
router.get("/:id", getProperty);


// DELETE PROPERTY
router.delete("/:id", deleteProperty);


module.exports = router;
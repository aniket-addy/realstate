const Property = require("../models/Property");

// ==========================================
// CREATE PROPERTY
// ==========================================

const createProperty = async (req, res) => {
  try {
    const {
      title,
      propertyImage,
      galleryImages,
      propertyType,
      bhkType,
      category,
      location,
      price,
      priceType,
      size,
      description,
    } = req.body;

    // ==============================
    // REQUIRED VALIDATION
    // ==============================

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Property title is required",
      });
    }

    if (!propertyImage) {
      return res.status(400).json({
        success: false,
        message: "Property image is required",
      });
    }

    if (!location) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    if (price === undefined || price === "") {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }

    // ==============================
    // CREATE PROPERTY
    // ==============================

    const property = await Property.create({
      title,
      propertyImage,
      galleryImages: galleryImages || [],
      propertyType: propertyType || [],
      bhkType: bhkType || [],
      category: category || "featured",
      location,
      price: Number(price),
      priceType: priceType || "Cr",
      size: size ? Number(size) : 0,
      description: description || "",
    });

    // ==============================
    // RESPONSE
    // ==============================

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: property,
    });

  } catch (error) {
    console.error("Create Property Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create property",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL PROPERTIES
// ==========================================

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });

  } catch (error) {
    console.error("Get Properties Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE PROPERTY
// ==========================================

const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: property,
    });

  } catch (error) {
    console.error("Get Property Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE PROPERTY
// ==========================================

const deleteProperty = async (req, res) => {
  try {
    const property =
      await Property.findByIdAndDelete(
        req.params.id
      );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {
    console.error("Delete Property Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete property",
      error: error.message,
    });
  }
};


module.exports = {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
};
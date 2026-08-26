const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    propertyImage: {
      type: String,
      required: true,
    },

    galleryImages: {
      type: [String],
      default: [],
    },

    propertyType: {
      type: [String],
      default: [],
    },

    bhkType: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      enum: ["featured", "new-project"],
      default: "featured",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    priceType: {
      type: String,
      enum: ["Lakh", "Cr"],
      default: "Cr",
    },

    size: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Property",
  propertySchema
);
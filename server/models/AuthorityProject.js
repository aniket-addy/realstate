const mongoose = require("mongoose");

const paymentPlanSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    percentage: { type: Number, default: 0 },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const documentSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    type: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

// =========================================================
// DYNAMIC PROJECT TABLE
// =========================================================

const tableColumnSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { _id: false }
);

const tableRowSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    cells: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { _id: false }
);

const customTableSchema = new mongoose.Schema(
  {
    columns: {
      type: [tableColumnSchema],
      default: [],
    },
    rows: {
      type: [tableRowSchema],
      default: [],
    },
  },
  { _id: false }
);

// =========================================================
// AUTHORITY PROJECT SCHEMA
// =========================================================

const authorityProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    authority: {
      type: String,
      required: true,
      trim: true,
    },

    projectCategory: {
      type: String,
      enum: ["residential", "commercial", "plot", "mixed"],
      default: "plot",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    city: {
      type: String,
      trim: true,
      default: "",
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    price: {
      type: String,
      trim: true,
      default: "",
    },

    priceFrom: {
      type: Number,
      default: 0,
    },

    totalArea: {
      type: String,
      trim: true,
      default: "",
    },

    possession: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "upcoming", "completed", "inactive"],
      default: "active",
    },

    reraNumber: {
      type: String,
      trim: true,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    newProject: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    images: {
      type: [String],
      default: [],
    },

    features: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    paymentPlans: {
      type: [paymentPlanSchema],
      default: [],
    },

    documents: {
      type: [documentSchema],
      default: [],
    },

    // =====================================================
    // DYNAMIC PROJECT TABLE
    // =====================================================

    customTable: {
      type: customTableSchema,
      default: () => ({
        columns: [],
        rows: [],
      }),
    },
  },

  { timestamps: true }
);

// =========================================================
// AUTO SLUG
// =========================================================
// Mongoose 9: pre hooks no longer receive a `next` callback.
// Just do the work synchronously (or return a Promise / use
// async function) and let the hook finish naturally.
// =========================================================

authorityProjectSchema.pre("save", function () {
  if (this.name && (!this.slug || this.isModified("name"))) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
});

module.exports = mongoose.model(
  "AuthorityProject",
  authorityProjectSchema
);
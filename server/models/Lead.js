const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| LEAD SCHEMA
|--------------------------------------------------------------------------
*/

const leadSchema = new mongoose.Schema(
  {
    /* =====================================================
       CUSTOMER INFORMATION
    ===================================================== */

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },


    /* =====================================================
       ENQUIRY INFORMATION
    ===================================================== */

    requirement: {
      type: String,
      default: "",
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },

    subject: {
      type: String,
      default: "",
      trim: true,
    },


    /* =====================================================
       PROPERTY / PROJECT
    ===================================================== */

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },

    propertyName: {
      type: String,
      default: "",
      trim: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    projectName: {
      type: String,
      default: "",
      trim: true,
    },


    /* =====================================================
       LEAD SOURCE
    ===================================================== */

    source: {
      type: String,
      default: "website",
      trim: true,
    },


    /* =====================================================
       LEAD STATUS
    ===================================================== */

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "follow-up",
        "closed",
      ],
      default: "new",
    },


    /* =====================================================
       ADMIN NOTES
    ===================================================== */

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    assignedTo: {
      type: String,
      default: "",
      trim: true,
    },


    /* =====================================================
       CONTACT PREFERENCES
    ===================================================== */

    preferredContact: {
      type: String,
      default: "",
      trim: true,
    },

    budget: {
      type: Number,
      default: 0,
      min: 0,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },
  },

  {
    timestamps: true,
  }
);


/*
|--------------------------------------------------------------------------
| INDEXES
|--------------------------------------------------------------------------
*/

leadSchema.index({
  name: "text",
  email: "text",
  phone: "text",
  requirement: "text",
  propertyName: "text",
  projectName: "text",
});

leadSchema.index({
  status: 1,
  createdAt: -1,
});

leadSchema.index({
  source: 1,
  createdAt: -1,
});


/*
|--------------------------------------------------------------------------
| MODEL
|--------------------------------------------------------------------------
*/

const Lead =
  mongoose.models.Lead ||
  mongoose.model("Lead", leadSchema);


module.exports = Lead;
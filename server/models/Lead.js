const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| LEAD SCHEMA
|--------------------------------------------------------------------------
*/

const leadSchema = new mongoose.Schema(
  {
    /*
    |--------------------------------------------------------------------------
    | BASIC CONTACT DETAILS
    |--------------------------------------------------------------------------
    */

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
      trim: true,
      lowercase: true,
      default: "",
    },

    /*
    |--------------------------------------------------------------------------
    | ENQUIRY DETAILS
    |--------------------------------------------------------------------------
    */

    requirement: {
      type: String,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    subject: {
      type: String,
      trim: true,
      default: "",
    },

    /*
    |--------------------------------------------------------------------------
    | PROPERTY / PROJECT
    |--------------------------------------------------------------------------
    */

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      default: null,
    },

    propertyName: {
      type: String,
      trim: true,
      default: "",
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    projectName: {
      type: String,
      trim: true,
      default: "",
    },

    /*
    |--------------------------------------------------------------------------
    | LEAD SOURCE
    |--------------------------------------------------------------------------
    */

    source: {
      type: String,
      trim: true,
      default: "website",
    },

    /*
    |--------------------------------------------------------------------------
    | LEAD STATUS
    |--------------------------------------------------------------------------
    |
    | new
    | contacted
    | qualified
    | converted
    | closed
    |
    */

    status: {
      type: String,
      enum: [
        "new",
        "contacted",
        "qualified",
        "converted",
        "closed",
      ],
      default: "new",
    },

    /*
    |--------------------------------------------------------------------------
    | ADMIN / CRM DETAILS
    |--------------------------------------------------------------------------
    */

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    assignedTo: {
      type: String,
      trim: true,
      default: "",
    },

    preferredContact: {
      type: String,
      trim: true,
      default: "",
    },

    /*
    |--------------------------------------------------------------------------
    | BUDGET / LOCATION
    |--------------------------------------------------------------------------
    */

    budget: {
      type: Number,
      min: 0,
      default: 0,
    },

    location: {
      type: String,
      trim: true,
      default: "",
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

/*
 * Search-related index
 */
leadSchema.index({
  name: "text",
  email: "text",
  phone: "text",
  requirement: "text",
  propertyName: "text",
  projectName: "text",
});

/*
 * Status + createdAt
 *
 * Useful for Admin Leads filtering/sorting.
 */
leadSchema.index({
  status: 1,
  createdAt: -1,
});

/*
 * Source + createdAt
 */
leadSchema.index({
  source: 1,
  createdAt: -1,
});

/*
|--------------------------------------------------------------------------
| MODEL
|--------------------------------------------------------------------------
*/

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
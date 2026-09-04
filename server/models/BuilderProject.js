const mongoose = require("mongoose");

/*
|--------------------------------------------------------------------------
| PAYMENT PLAN SCHEMA
|--------------------------------------------------------------------------
*/

const paymentPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    percentage: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);


/*
|--------------------------------------------------------------------------
| DOCUMENT SCHEMA
|--------------------------------------------------------------------------
*/

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },

    url: {
      type: String,
      trim: true,
      default: "",
    },

    type: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);


/*
|--------------------------------------------------------------------------
| CUSTOM TABLE COLUMN SCHEMA
|--------------------------------------------------------------------------
*/

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
  {
    _id: false,
  }
);


/*
|--------------------------------------------------------------------------
| CUSTOM TABLE ROW SCHEMA
|--------------------------------------------------------------------------
*/

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
  {
    _id: false,
  }
);


/*
|--------------------------------------------------------------------------
| CUSTOM TABLE SCHEMA
|--------------------------------------------------------------------------
*/

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
  {
    _id: false,
  }
);


/*
|--------------------------------------------------------------------------
| BUILDER PROJECT SCHEMA
|--------------------------------------------------------------------------
*/

const builderProjectSchema = new mongoose.Schema(
  {
    // =====================================================
    // BASIC INFORMATION
    // =====================================================

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


    // =====================================================
    // BUILDER / DEVELOPER
    // =====================================================

    developer: {
      type: String,
      required: true,
      trim: true,
    },


    // =====================================================
    // PROJECT CATEGORY
    // =====================================================

    projectCategory: {
      type: String,

      enum: [
        "residential",
        "commercial",
        "plot",
        "mixed",
      ],

      default: "residential",
    },


    // =====================================================
    // AUTHORITY / APPROVAL
    // =====================================================

    authority: {
      type: String,
      trim: true,
      default: "",
    },

    reraNumber: {
      type: String,
      trim: true,
      default: "",
    },


    // =====================================================
    // LOCATION
    // =====================================================

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


    // =====================================================
    // PRICE
    // =====================================================

    price: {
      type: String,
      trim: true,
      default: "",
    },

    priceFrom: {
      type: Number,
      default: 0,
    },


    // =====================================================
    // PROJECT DETAILS
    // =====================================================

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

      enum: [
        "active",
        "upcoming",
        "completed",
        "inactive",
      ],

      default: "active",
    },


    // =====================================================
    // WEBSITE VISIBILITY
    // =====================================================

    /*
     * Show project inside:
     * Featured Projects
     */

    featured: {
      type: Boolean,
      default: false,
    },


    /*
     * Show project inside:
     * New & Upcoming Projects
     */

    newProject: {
      type: Boolean,
      default: false,
    },


    /*
     * Public website visibility
     */

    published: {
      type: Boolean,
      default: true,
    },


    // =====================================================
    // MAIN IMAGE
    // =====================================================

    image: {
      type: String,
      trim: true,
      default: "",
    },


    // =====================================================
    // PROJECT IMAGES
    // =====================================================

    images: {
      type: [String],
      default: [],
    },


    // =====================================================
    // FEATURES
    // =====================================================

    features: {
      type: [String],
      default: [],
    },


    // =====================================================
    // AMENITIES
    // =====================================================

    amenities: {
      type: [String],
      default: [],
    },


    // =====================================================
    // PAYMENT PLANS
    // =====================================================

    paymentPlans: {
      type: [paymentPlanSchema],
      default: [],
    },


    // =====================================================
    // DOCUMENTS
    // =====================================================

    documents: {
      type: [documentSchema],
      default: [],
    },


    // =====================================================
    // CUSTOM PROJECT TABLE
    // =====================================================

    customTable: {
      type: customTableSchema,

      default: () => ({
        columns: [],
        rows: [],
      }),
    },
  },

  {
    timestamps: true,
  }
);


/*
|--------------------------------------------------------------------------
| AUTO CREATE SLUG
|--------------------------------------------------------------------------
| Mongoose 9: pre hooks no longer receive a `next` callback.
| Just do the work synchronously and let the hook finish naturally.
|--------------------------------------------------------------------------
*/

builderProjectSchema.pre("save", function () {
  if (
    this.name &&
    (!this.slug || this.isModified("name"))
  ) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
});


/*
|--------------------------------------------------------------------------
| MODEL
|--------------------------------------------------------------------------
*/

module.exports = mongoose.model(
  "BuilderProject",
  builderProjectSchema
);
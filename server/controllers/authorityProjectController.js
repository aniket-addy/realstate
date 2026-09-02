const AuthorityProject = require("../models/AuthorityProject");


// =========================================================
// CREATE AUTHORITY PROJECT
// =========================================================

const createAuthorityProject = async (req, res) => {
  try {
    const {
      name,
      description,
      authority,
      projectCategory,
      location,
      city,
      state,
      price,
      priceFrom,
      totalArea,
      possession,
      status,
      reraNumber,
      featured,
      newProject,
      published,
      image,
      images,
      features,
      amenities,
      paymentPlans,
      documents,
    } = req.body;


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project name is required.",
      });
    }


    if (!authority || !authority.trim()) {
      return res.status(400).json({
        success: false,
        message: "Authority name is required.",
      });
    }


    // -----------------------------------------------------
    // CREATE PROJECT
    // -----------------------------------------------------

    const project = await AuthorityProject.create({
      name: name.trim(),

      description:
        description?.trim() || "",

      authority:
        authority.trim(),

      projectCategory:
        projectCategory || "plot",

      location:
        location?.trim() || "",

      city:
        city?.trim() || "",

      state:
        state?.trim() || "",

      price:
        price?.trim() || "",

      priceFrom:
        Number(priceFrom) || 0,

      totalArea:
        totalArea?.trim() || "",

      possession:
        possession?.trim() || "",

      status:
        status || "active",

      reraNumber:
        reraNumber?.trim() || "",

      featured:
        Boolean(featured),

      newProject:
        Boolean(newProject),

      published:
        published !== false,

      image:
        image || "",

      images:
        Array.isArray(images)
          ? images
          : [],

      features:
        Array.isArray(features)
          ? features
          : [],

      amenities:
        Array.isArray(amenities)
          ? amenities
          : [],

      paymentPlans:
        Array.isArray(paymentPlans)
          ? paymentPlans
          : [],

      documents:
        Array.isArray(documents)
          ? documents
          : [],
    });


    return res.status(201).json({
      success: true,
      message:
        "Authority project created successfully.",
      data: project,
    });

  } catch (error) {

    console.error(
      "Create Authority Project Error:",
      error
    );


    // -----------------------------------------------------
    // DUPLICATE SLUG
    // -----------------------------------------------------

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A project with this name already exists.",
      });
    }


    return res.status(500).json({
      success: false,
      message:
        "Failed to create authority project.",
      error: error.message,
    });
  }
};


// =========================================================
// UPLOAD AUTHORITY PROJECT IMAGES
// =========================================================
//
// POST /api/authority-projects/upload-images
//
// Middleware:
// uploadImages.array("images", 20)
//
// Cloudinary se upload hone ke baad
// file.path mein secure Cloudinary URL milega.
// =========================================================

const uploadAuthorityProjectImages = async (
  req,
  res
) => {
  try {

    // -----------------------------------------------------
    // CHECK FILES
    // -----------------------------------------------------

    if (
      !req.files ||
      req.files.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please select at least one image.",
      });
    }


    // -----------------------------------------------------
    // GET CLOUDINARY URLS
    // -----------------------------------------------------

    const images = req.files.map(
      (file) => file.path
    );


    // -----------------------------------------------------
    // RESPONSE
    // -----------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Authority project images uploaded successfully.",

      images,

      data: {
        images,
      },
    });

  } catch (error) {

    console.error(
      "Upload Authority Project Images Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to upload authority project images.",
      error: error.message,
    });
  }
};


// =========================================================
// UPLOAD AUTHORITY PROJECT DOCUMENTS
// =========================================================
//
// POST /api/authority-projects/upload-documents
//
// Middleware:
// uploadDocuments.array("documents", 20)
// =========================================================

const uploadAuthorityProjectDocuments =
  async (req, res) => {
    try {

      // ---------------------------------------------------
      // CHECK FILES
      // ---------------------------------------------------

      if (
        !req.files ||
        req.files.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please select at least one document.",
        });
      }


      // ---------------------------------------------------
      // BUILD DOCUMENT DATA
      // ---------------------------------------------------

      const documents =
        req.files.map((file) => ({
          name:
            file.originalname,

          url:
            file.path,

          type:
            file.mimetype,
        }));


      // ---------------------------------------------------
      // RESPONSE
      // ---------------------------------------------------

      return res.status(200).json({
        success: true,
        message:
          "Authority project documents uploaded successfully.",

        documents,

        data: {
          documents,
        },
      });

    } catch (error) {

      console.error(
        "Upload Authority Project Documents Error:",
        error
      );


      return res.status(500).json({
        success: false,
        message:
          "Failed to upload authority project documents.",
        error: error.message,
      });
    }
  };


// =========================================================
// GET ALL AUTHORITY PROJECTS
// =========================================================

const getAuthorityProjects = async (req, res) => {
  try {

    const {
      featured,
      newProject,
      published,
      status,
      projectCategory,
      authority,
      search,
    } = req.query;


    // -----------------------------------------------------
    // BUILD FILTER
    // -----------------------------------------------------

    const filter = {};


    if (featured !== undefined) {
      filter.featured =
        featured === "true";
    }


    if (newProject !== undefined) {
      filter.newProject =
        newProject === "true";
    }


    if (published !== undefined) {
      filter.published =
        published === "true";
    }


    if (status) {
      filter.status = status;
    }


    if (projectCategory) {
      filter.projectCategory =
        projectCategory;
    }


    if (authority) {
      filter.authority = {
        $regex: authority,
        $options: "i",
      };
    }


    // -----------------------------------------------------
    // SEARCH
    // -----------------------------------------------------

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          authority: {
            $regex: search,
            $options: "i",
          },
        },
        {
          location: {
            $regex: search,
            $options: "i",
          },
        },
        {
          city: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }


    // -----------------------------------------------------
    // FETCH
    // -----------------------------------------------------

    const projects =
      await AuthorityProject
        .find(filter)
        .sort({
          createdAt: -1,
        });


    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });

  } catch (error) {

    console.error(
      "Get Authority Projects Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch authority projects.",
      error: error.message,
    });
  }
};


// =========================================================
// GET SINGLE AUTHORITY PROJECT
// =========================================================

const getAuthorityProjectById = async (
  req,
  res
) => {
  try {

    const { id } = req.params;


    const project =
      await AuthorityProject.findById(id);


    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Authority project not found.",
      });
    }


    return res.status(200).json({
      success: true,
      data: project,
    });

  } catch (error) {

    console.error(
      "Get Authority Project Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch authority project.",
      error: error.message,
    });
  }
};


// =========================================================
// UPDATE AUTHORITY PROJECT
// =========================================================

const updateAuthorityProject = async (
  req,
  res
) => {
  try {

    const { id } = req.params;


    const {
      name,
      description,
      authority,
      projectCategory,
      location,
      city,
      state,
      price,
      priceFrom,
      totalArea,
      possession,
      status,
      reraNumber,
      featured,
      newProject,
      published,
      image,
      images,
      features,
      amenities,
      paymentPlans,
      documents,
    } = req.body;


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (
      name !== undefined &&
      !name.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Project name cannot be empty.",
      });
    }


    if (
      authority !== undefined &&
      !authority.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Authority name cannot be empty.",
      });
    }


    // -----------------------------------------------------
    // UPDATE DATA
    // -----------------------------------------------------

    const updateData = {};


    if (name !== undefined) {
      updateData.name =
        name.trim();
    }


    if (description !== undefined) {
      updateData.description =
        description.trim();
    }


    if (authority !== undefined) {
      updateData.authority =
        authority.trim();
    }


    if (projectCategory !== undefined) {
      updateData.projectCategory =
        projectCategory;
    }


    if (location !== undefined) {
      updateData.location =
        location.trim();
    }


    if (city !== undefined) {
      updateData.city =
        city.trim();
    }


    if (state !== undefined) {
      updateData.state =
        state.trim();
    }


    if (price !== undefined) {
      updateData.price =
        price.trim();
    }


    if (priceFrom !== undefined) {
      updateData.priceFrom =
        Number(priceFrom) || 0;
    }


    if (totalArea !== undefined) {
      updateData.totalArea =
        totalArea.trim();
    }


    if (possession !== undefined) {
      updateData.possession =
        possession.trim();
    }


    if (status !== undefined) {
      updateData.status =
        status;
    }


    if (reraNumber !== undefined) {
      updateData.reraNumber =
        reraNumber.trim();
    }


    if (featured !== undefined) {
      updateData.featured =
        Boolean(featured);
    }


    if (newProject !== undefined) {
      updateData.newProject =
        Boolean(newProject);
    }


    if (published !== undefined) {
      updateData.published =
        Boolean(published);
    }


    if (image !== undefined) {
      updateData.image =
        image;
    }


    if (images !== undefined) {
      updateData.images =
        Array.isArray(images)
          ? images
          : [];
    }


    if (features !== undefined) {
      updateData.features =
        Array.isArray(features)
          ? features
          : [];
    }


    if (amenities !== undefined) {
      updateData.amenities =
        Array.isArray(amenities)
          ? amenities
          : [];
    }


    if (paymentPlans !== undefined) {
      updateData.paymentPlans =
        Array.isArray(paymentPlans)
          ? paymentPlans
          : [];
    }


    if (documents !== undefined) {
      updateData.documents =
        Array.isArray(documents)
          ? documents
          : [];
    }


    // -----------------------------------------------------
    // UPDATE
    // -----------------------------------------------------

    const project =
      await AuthorityProject.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );


    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Authority project not found.",
      });
    }


    return res.status(200).json({
      success: true,
      message:
        "Authority project updated successfully.",
      data: project,
    });

  } catch (error) {

    console.error(
      "Update Authority Project Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to update authority project.",
      error: error.message,
    });
  }
};


// =========================================================
// DELETE AUTHORITY PROJECT
// =========================================================

const deleteAuthorityProject = async (
  req,
  res
) => {
  try {

    const { id } = req.params;


    const project =
      await AuthorityProject.findByIdAndDelete(
        id
      );


    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Authority project not found.",
      });
    }


    return res.status(200).json({
      success: true,
      message:
        "Authority project deleted successfully.",
    });

  } catch (error) {

    console.error(
      "Delete Authority Project Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to delete authority project.",
      error: error.message,
    });
  }
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {
  createAuthorityProject,

  uploadAuthorityProjectImages,
  uploadAuthorityProjectDocuments,

  getAuthorityProjects,
  getAuthorityProjectById,
  updateAuthorityProject,
  deleteAuthorityProject,
};
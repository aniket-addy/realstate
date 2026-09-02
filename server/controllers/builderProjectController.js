const BuilderProject = require("../models/BuilderProject");


// =========================================================
// CREATE BUILDER PROJECT
// =========================================================

const createBuilderProject = async (req, res) => {
  try {
    const {
      name,
      description,
      developer,
      projectCategory,
      authority,
      reraNumber,
      location,
      city,
      state,
      price,
      priceFrom,
      totalArea,
      possession,
      status,
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


    if (!developer || !developer.trim()) {
      return res.status(400).json({
        success: false,
        message: "Builder / developer name is required.",
      });
    }


    // -----------------------------------------------------
    // CREATE PROJECT
    // -----------------------------------------------------

    const project = await BuilderProject.create({
      name: name.trim(),

      description:
        description?.trim() || "",

      developer:
        developer.trim(),

      projectCategory:
        projectCategory || "residential",

      authority:
        authority?.trim() || "",

      reraNumber:
        reraNumber?.trim() || "",

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
      message: "Builder project created successfully.",
      data: project,
    });

  } catch (error) {

    console.error(
      "Create Builder Project Error:",
      error
    );


    // -----------------------------------------------------
    // DUPLICATE SLUG
    // -----------------------------------------------------

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A builder project with this name already exists.",
      });
    }


    return res.status(500).json({
      success: false,
      message:
        "Failed to create builder project.",
      error: error.message,
    });
  }
};


// =========================================================
// GET ALL BUILDER PROJECTS
// =========================================================

const getBuilderProjects = async (req, res) => {
  try {

    const {
      featured,
      newProject,
      published,
      status,
      projectCategory,
      developer,
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


    if (developer) {
      filter.developer = {
        $regex: developer,
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
          developer: {
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

        {
          projectCategory: {
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
      await BuilderProject
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
      "Get Builder Projects Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch builder projects.",
      error: error.message,
    });
  }
};


// =========================================================
// GET SINGLE BUILDER PROJECT
// =========================================================

const getBuilderProjectById = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    const project =
      await BuilderProject.findById(id);


    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Builder project not found.",
      });
    }


    return res.status(200).json({
      success: true,
      data: project,
    });

  } catch (error) {

    console.error(
      "Get Builder Project Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch builder project.",
      error: error.message,
    });
  }
};


// =========================================================
// UPDATE BUILDER PROJECT
// =========================================================

const updateBuilderProject = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    const {
      name,
      description,
      developer,
      projectCategory,
      authority,
      reraNumber,
      location,
      city,
      state,
      price,
      priceFrom,
      totalArea,
      possession,
      status,
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
      developer !== undefined &&
      !developer.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Builder / developer name cannot be empty.",
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


    if (developer !== undefined) {
      updateData.developer =
        developer.trim();
    }


    if (projectCategory !== undefined) {
      updateData.projectCategory =
        projectCategory;
    }


    if (authority !== undefined) {
      updateData.authority =
        authority.trim();
    }


    if (reraNumber !== undefined) {
      updateData.reraNumber =
        reraNumber.trim();
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
      await BuilderProject.findByIdAndUpdate(
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
          "Builder project not found.",
      });
    }


    return res.status(200).json({
      success: true,
      message:
        "Builder project updated successfully.",
      data: project,
    });

  } catch (error) {

    console.error(
      "Update Builder Project Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to update builder project.",
      error: error.message,
    });
  }
};


// =========================================================
// DELETE BUILDER PROJECT
// =========================================================

const deleteBuilderProject = async (
  req,
  res
) => {

  try {

    const { id } = req.params;


    const project =
      await BuilderProject.findByIdAndDelete(id);


    if (!project) {
      return res.status(404).json({
        success: false,
        message:
          "Builder project not found.",
      });
    }


    return res.status(200).json({
      success: true,
      message:
        "Builder project deleted successfully.",
    });

  } catch (error) {

    console.error(
      "Delete Builder Project Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to delete builder project.",
      error: error.message,
    });
  }
};


// =========================================================
// UPLOAD BUILDER PROJECT IMAGES
// =========================================================
//
// POST /api/builder-projects/upload-images
//
// IMPORTANT:
// The `uploadImages` multer middleware (middleware/upload.js)
// already uses CloudinaryStorage, which uploads the file to
// Cloudinary automatically as part of multer's processing.
//
// That means by the time we get here, req.files already
// contain the uploaded Cloudinary result:
//   file.path      -> secure Cloudinary URL
//   file.filename  -> Cloudinary public_id
//
// There is NO file.buffer available (CloudinaryStorage is not
// memory storage), so we must NOT try to re-upload manually
// via cloudinary.uploader.upload_stream here.
// =========================================================

const uploadBuilderProjectImages = async (
  req,
  res
) => {

  try {

    const files = req.files;


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (!files || files.length === 0) {

      return res.status(400).json({
        success: false,
        message:
          "Please select at least one image.",
      });

    }


    // -----------------------------------------------------
    // BUILD IMAGE DATA FROM ALREADY-UPLOADED FILES
    // -----------------------------------------------------

    const uploadedImages = files.map(
      (file) => ({
        url: file.path,
        publicId: file.filename,
        originalName: file.originalname,
        type: file.mimetype,
      })
    );


    // -----------------------------------------------------
    // RESPONSE
    // -----------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Builder project images uploaded successfully.",

      images:
        uploadedImages.map(
          (image) => image.url
        ),

      data:
        uploadedImages,
    });

  } catch (error) {

    console.error(
      "Upload Builder Project Images Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to upload builder project images.",
      error: error.message,
    });

  }
};


// =========================================================
// UPLOAD BUILDER PROJECT DOCUMENTS
// =========================================================
//
// POST /api/builder-projects/upload-documents
//
// Same reasoning as above: uploadDocuments middleware already
// uploaded the files to Cloudinary via CloudinaryStorage.
// =========================================================

const uploadBuilderProjectDocuments = async (
  req,
  res
) => {

  try {

    const files = req.files;


    // -----------------------------------------------------
    // VALIDATION
    // -----------------------------------------------------

    if (!files || files.length === 0) {

      return res.status(400).json({
        success: false,
        message:
          "Please select at least one document.",
      });

    }


    // -----------------------------------------------------
    // BUILD DOCUMENT DATA FROM ALREADY-UPLOADED FILES
    // -----------------------------------------------------

    const uploadedDocuments = files.map(
      (file) => ({
        name: file.originalname,
        url: file.path,
        type: file.mimetype,
        publicId: file.filename,
      })
    );


    // -----------------------------------------------------
    // RESPONSE
    // -----------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Builder project documents uploaded successfully.",

      documents:
        uploadedDocuments,

    });

  } catch (error) {

    console.error(
      "Upload Builder Project Documents Error:",
      error
    );


    return res.status(500).json({
      success: false,
      message:
        "Failed to upload builder project documents.",
      error: error.message,
    });

  }
};


// =========================================================
// EXPORT
// =========================================================

module.exports = {

  createBuilderProject,

  getBuilderProjects,

  getBuilderProjectById,

  updateBuilderProject,

  deleteBuilderProject,

  uploadBuilderProjectImages,

  uploadBuilderProjectDocuments,

};
import api from "./api";

/*
|--------------------------------------------------------------------------
| BUILDER PROJECT SERVICE
|--------------------------------------------------------------------------
| All Builder Project API calls stay here.
|--------------------------------------------------------------------------
*/

// =========================================================
// GET ALL BUILDER PROJECTS
// =========================================================

export const getBuilderProjects = async (params = {}) => {
  const response = await api.get("/builder-projects", {
    params,
  });

  return response.data;
};

// =========================================================
// GET SINGLE BUILDER PROJECT
// =========================================================

export const getBuilderProjectById = async (id) => {
  if (!id) {
    throw new Error("Builder Project ID is required");
  }

  const response = await api.get(`/builder-projects/${id}`);

  return response.data;
};

// =========================================================
// CREATE BUILDER PROJECT
// =========================================================

export const createBuilderProject = async (projectData) => {
  const response = await api.post(
    "/builder-projects",
    projectData
  );

  return response.data;
};

// =========================================================
// UPDATE BUILDER PROJECT
// =========================================================

export const updateBuilderProject = async (
  id,
  projectData
) => {
  if (!id) {
    throw new Error("Builder Project ID is required");
  }

  const response = await api.put(
    `/builder-projects/${id}`,
    projectData
  );

  return response.data;
};

// =========================================================
// DELETE BUILDER PROJECT
// =========================================================

export const deleteBuilderProject = async (id) => {
  if (!id) {
    throw new Error("Builder Project ID is required");
  }

  const response = await api.delete(
    `/builder-projects/${id}`
  );

  return response.data;
};

// =========================================================
// UPLOAD BUILDER PROJECT IMAGES
// =========================================================

export const uploadBuilderProjectImages = async (
  formData
) => {
  const response = await api.post(
    "/builder-projects/upload-images",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// =========================================================
// UPLOAD BUILDER PROJECT DOCUMENTS
// =========================================================

export const uploadBuilderProjectDocuments = async (
  formData
) => {
  const response = await api.post(
    "/builder-projects/upload-documents",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
import api from "./api";

/*
|--------------------------------------------------------------------------
| AUTHORITY PROJECT SERVICE
|--------------------------------------------------------------------------
| All Authority Project API calls stay here.
|
| Backend base URL:
| VITE_API_URL=http://localhost:5000/api
|
| Final endpoints:
| GET    /api/authority-projects
| GET    /api/authority-projects/:id
| POST   /api/authority-projects
| PUT    /api/authority-projects/:id
| DELETE /api/authority-projects/:id
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| GET ALL AUTHORITY PROJECTS
|--------------------------------------------------------------------------
*/

export const getAuthorityProjects = async (params = {}) => {
  const response = await api.get(
    "/authority-projects",
    {
      params,
    }
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| GET SINGLE AUTHORITY PROJECT
|--------------------------------------------------------------------------
*/

export const getAuthorityProjectById = async (id) => {
  if (!id) {
    throw new Error(
      "Authority Project ID is required"
    );
  }

  const response = await api.get(
    `/authority-projects/${encodeURIComponent(id)}`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| CREATE AUTHORITY PROJECT
|--------------------------------------------------------------------------
*/

export const createAuthorityProject = async (
  projectData
) => {
  if (!projectData) {
    throw new Error(
      "Authority Project data is required"
    );
  }

  const response = await api.post(
    "/authority-projects",
    projectData
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| UPDATE AUTHORITY PROJECT
|--------------------------------------------------------------------------
*/

export const updateAuthorityProject = async (
  id,
  projectData
) => {
  if (!id) {
    throw new Error(
      "Authority Project ID is required"
    );
  }

  if (!projectData) {
    throw new Error(
      "Authority Project data is required"
    );
  }

  const response = await api.put(
    `/authority-projects/${encodeURIComponent(id)}`,
    projectData
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| DELETE AUTHORITY PROJECT
|--------------------------------------------------------------------------
*/

export const deleteAuthorityProject = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Authority Project ID is required"
    );
  }

  const response = await api.delete(
    `/authority-projects/${encodeURIComponent(id)}`
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| UPLOAD AUTHORITY PROJECT IMAGES
|--------------------------------------------------------------------------
| FormData automatically handled by api.js.
|
| Do NOT manually set:
| Content-Type: multipart/form-data
|
| Browser/Axios boundary automatically add karega.
|--------------------------------------------------------------------------
*/

export const uploadAuthorityProjectImages = async (
  formData
) => {
  if (!formData) {
    throw new Error(
      "Image FormData is required"
    );
  }

  const response = await api.post(
    "/authority-projects/upload-images",
    formData
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| UPLOAD AUTHORITY PROJECT DOCUMENTS
|--------------------------------------------------------------------------
| FormData automatically handled by api.js.
|--------------------------------------------------------------------------
*/

export const uploadAuthorityProjectDocuments = async (
  formData
) => {
  if (!formData) {
    throw new Error(
      "Document FormData is required"
    );
  }

  const response = await api.post(
    "/authority-projects/upload-documents",
    formData
  );

  return response.data;
};


/*
|--------------------------------------------------------------------------
| DEFAULT EXPORT
|--------------------------------------------------------------------------
| Optional convenience export.
|--------------------------------------------------------------------------
*/

const authorityProjectService = {
  getAuthorityProjects,
  getAuthorityProjectById,
  createAuthorityProject,
  updateAuthorityProject,
  deleteAuthorityProject,
  uploadAuthorityProjectImages,
  uploadAuthorityProjectDocuments,
};

export default authorityProjectService;
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getAuthorityProjects,
  getAuthorityProjectById,
  createAuthorityProject,
  updateAuthorityProject,
  deleteAuthorityProject,
} from "../services/authorityProjectService";

/*
|--------------------------------------------------------------------------
| useAuthorityProjects
|--------------------------------------------------------------------------
| Handles Authority Project listing, single project,
| CRUD operations and loading/error states.
|--------------------------------------------------------------------------
*/

function useAuthorityProjects(options = {}) {
  const {
    autoFetch = true,
    params: incomingParams = {},
  } = options;

  /*
  |--------------------------------------------------------------------------
  | KEEP PARAMS STABLE
  |--------------------------------------------------------------------------
  */

  const paramsKey = useMemo(
    () => JSON.stringify(incomingParams || {}),
    [incomingParams]
  );

  const params = useMemo(
    () => incomingParams || {},
    [paramsKey]
  );

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | GET ALL AUTHORITY PROJECTS
  |--------------------------------------------------------------------------
  */

  const fetchProjects = useCallback(
    async (customParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAuthorityProjects({
          ...params,
          ...customParams,
        });

        const data =
          Array.isArray(response)
            ? response
            : response?.data ||
              response?.projects ||
              [];

        setProjects(data);

        return response;
      } catch (err) {
        console.error(
          "Failed to fetch authority projects:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch authority projects";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  /*
  |--------------------------------------------------------------------------
  | GET SINGLE AUTHORITY PROJECT
  |--------------------------------------------------------------------------
  */

  const fetchProject = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await getAuthorityProjectById(id);

        const data =
          response?.data ||
          response?.project ||
          response;

        setProject(data);

        return data;
      } catch (err) {
        console.error(
          "Failed to fetch authority project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch authority project";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | CREATE AUTHORITY PROJECT
  |--------------------------------------------------------------------------
  */

  const addProject = useCallback(
    async (projectData) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await createAuthorityProject(
            projectData
          );

        const newProject =
          response?.data ||
          response?.project ||
          response;

        if (newProject) {
          setProjects((prev) => [
            newProject,
            ...prev,
          ]);
        }

        return response;
      } catch (err) {
        console.error(
          "Failed to create authority project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create authority project";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | UPDATE AUTHORITY PROJECT
  |--------------------------------------------------------------------------
  */

  const editProject = useCallback(
    async (id, projectData) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await updateAuthorityProject(
            id,
            projectData
          );

        const updatedProject =
          response?.data ||
          response?.project ||
          response;

        if (updatedProject) {
          setProjects((prev) =>
            prev.map((item) =>
              item._id === id
                ? updatedProject
                : item
            )
          );

          setProject(updatedProject);
        }

        return response;
      } catch (err) {
        console.error(
          "Failed to update authority project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update authority project";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | DELETE AUTHORITY PROJECT
  |--------------------------------------------------------------------------
  */

  const removeProject = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await deleteAuthorityProject(id);

        setProjects((prev) =>
          prev.filter(
            (item) => item._id !== id
          )
        );

        setProject((prev) =>
          prev?._id === id
            ? null
            : prev
        );

        return response;
      } catch (err) {
        console.error(
          "Failed to delete authority project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to delete authority project";

        setError(message);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | CLEAR ERROR
  |--------------------------------------------------------------------------
  */

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | CLEAR SELECTED PROJECT
  |--------------------------------------------------------------------------
  */

  const clearProject = useCallback(() => {
    setProject(null);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | AUTO FETCH
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!autoFetch) return;

    fetchProjects();
  }, [autoFetch, fetchProjects]);

  /*
  |--------------------------------------------------------------------------
  | RETURN
  |--------------------------------------------------------------------------
  */

  return {
    projects,
    project,

    loading,
    error,

    fetchProjects,
    fetchProject,

    addProject,
    editProject,
    removeProject,

    clearError,
    clearProject,
  };
}

export default useAuthorityProjects;
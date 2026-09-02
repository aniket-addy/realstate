import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getBuilderProjects,
  getBuilderProjectById,
  createBuilderProject,
  updateBuilderProject,
  deleteBuilderProject,
} from "../services/builderProjectService";

/*
|--------------------------------------------------------------------------
| useBuilderProjects
|--------------------------------------------------------------------------
| Handles Builder Project listing, single project,
| CRUD operations and loading/error states.
|--------------------------------------------------------------------------
*/

function useBuilderProjects(options = {}) {
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
  | GET ALL BUILDER PROJECTS
  |--------------------------------------------------------------------------
  */

  const fetchProjects = useCallback(
    async (customParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getBuilderProjects({
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
          "Failed to fetch builder projects:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch builder projects";

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
  | GET SINGLE BUILDER PROJECT
  |--------------------------------------------------------------------------
  */

  const fetchProject = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await getBuilderProjectById(id);

        const data =
          response?.data ||
          response?.project ||
          response;

        setProject(data);

        return data;
      } catch (err) {
        console.error(
          "Failed to fetch builder project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch builder project";

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
  | CREATE BUILDER PROJECT
  |--------------------------------------------------------------------------
  */

  const addProject = useCallback(
    async (projectData) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await createBuilderProject(
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
          "Failed to create builder project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to create builder project";

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
  | UPDATE BUILDER PROJECT
  |--------------------------------------------------------------------------
  */

  const editProject = useCallback(
    async (id, projectData) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await updateBuilderProject(
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
          "Failed to update builder project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update builder project";

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
  | DELETE BUILDER PROJECT
  |--------------------------------------------------------------------------
  */

  const removeProject = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await deleteBuilderProject(id);

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
          "Failed to delete builder project:",
          err
        );

        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to delete builder project";

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
  | CLEAR PROJECT
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

export default useBuilderProjects;
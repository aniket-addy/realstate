import { useEffect, useState } from "react";
import API from "../services/api";

function useNewProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          "/projects/new"
        );

        const result = response.data?.data ?? response.data;

        setProjects(
          Array.isArray(result) ? result : []
        );
      } catch (err) {
        console.error(
          "New Projects API Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load new projects."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNewProjects();
  }, []);

  return {
    projects,
    loading,
    error,
  };
}

export default useNewProjects;
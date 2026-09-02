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

        // Backend currently provides GET /api/properties
        const response = await API.get("/properties");

        const result =
          response.data?.data ?? response.data;

        const allProperties =
          Array.isArray(result) ? result : [];

        // Only new projects
        const newProjects =
          allProperties.filter(
            (property) =>
              property.category === "new-project"
          );

        setProjects(newProjects);
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
import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    location: "Any Location",
    price: "Any Price",
    configuration: "Any Configuration",
    status: "Any Status",
  });


  /* =========================================================
     FETCH NEW PROJECTS
  ========================================================= */

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/projects/new");

        const result =
          response.data?.data ?? response.data;

        setProjects(
          Array.isArray(result) ? result : []
        );

      } catch (err) {
        console.error("Projects API Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load projects."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);


  /* =========================================================
     FILTER PROJECTS
  ========================================================= */

  const filteredProjects = useMemo(() => {

    return projects.filter((project) => {

      /* -------------------------------------------------------
         LOCATION
      ------------------------------------------------------- */

      const locationMatch =
        filters.location === "Any Location" ||
        project.location === filters.location;


      /* -------------------------------------------------------
         PRICE
      ------------------------------------------------------- */

      const priceMatch =
        filters.price === "Any Price" ||
        project.price === filters.price;


      /* -------------------------------------------------------
         CONFIGURATION
      ------------------------------------------------------- */

      const configurationMatch =
        filters.configuration === "Any Configuration" ||
        project.configuration === filters.configuration;


      /* -------------------------------------------------------
         STATUS
      ------------------------------------------------------- */

      const statusMatch =
        filters.status === "Any Status" ||
        project.status === filters.status;


      return (
        locationMatch &&
        priceMatch &&
        configurationMatch &&
        statusMatch
      );

    });

  }, [projects, filters]);


  /* =========================================================
     UPDATE FILTER
  ========================================================= */

  const updateFilter = (name, value) => {

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  /* =========================================================
     CLEAR ALL FILTERS
  ========================================================= */

  const clearFilters = () => {

    setFilters({
      location: "Any Location",
      price: "Any Price",
      configuration: "Any Configuration",
      status: "Any Status",
    });

  };


  /* =========================================================
     RETURN
  ========================================================= */

  return {
    projects,
    filteredProjects,
    filters,
    updateFilter,
    clearFilters,
    loading,
    error,
  };
}

export default useProjects;
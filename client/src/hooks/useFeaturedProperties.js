import { useEffect, useState } from "react";
import API from "../services/api";

function useFeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          "/properties"
        );

        const result =
          response.data?.data ??
          response.data;

        const allProperties =
          Array.isArray(result)
            ? result
            : [];

        const featuredProperties =
          allProperties.filter(
            (property) =>
              property.category ===
              "featured"
          );

        console.log(
          "FEATURED PROJECTS:",
          featuredProperties
        );

        setProperties(
          featuredProperties
        );
      } catch (err) {
        console.error(
          "Featured Properties API Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load featured properties."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return {
    properties,
    loading,
    error,
  };
}

export default useFeaturedProperties;
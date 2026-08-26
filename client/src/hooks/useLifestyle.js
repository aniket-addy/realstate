import { useEffect, useState } from "react";
import API from "../services/api";

function useLifestyle() {
  const [lifestyles, setLifestyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLifestyles = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/lifestyles");

        const result = response.data?.data ?? response.data;

        setLifestyles(
          Array.isArray(result) ? result : []
        );
      } catch (err) {
        console.error("Lifestyle API Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load lifestyle categories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLifestyles();
  }, []);

  return {
    lifestyles,
    loading,
    error,
  };
}

export default useLifestyle;
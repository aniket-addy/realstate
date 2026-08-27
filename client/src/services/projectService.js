const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * Get single project by ID
 */
export const getProjectById = async (projectId) => {
  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};

/**
 * Get all projects
 */
export const getProjects = async () => {
  try {
    const response = await fetch(`${API_URL}/projects`);

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
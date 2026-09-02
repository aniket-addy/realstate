import api from "./api";

/*
|--------------------------------------------------------------------------
| LEAD SERVICE
|--------------------------------------------------------------------------
| All lead-related API calls are kept here.
|--------------------------------------------------------------------------
*/

/**
 * Get all leads
 *
 * Optional params:
 * {
 *   status,
 *   source,
 *   page,
 *   limit,
 *   search
 * }
 */
export const getLeads = async (params = {}) => {
  const response = await api.get("/leads", {
    params,
  });

  return response.data;
};

/**
 * Get single lead by ID
 */
export const getLeadById = async (id) => {
  if (!id) {
    throw new Error("Lead ID is required");
  }

  const response = await api.get(`/leads/${id}`);

  return response.data;
};

/**
 * Create a new lead
 *
 * Used by:
 * - Contact form
 * - Property enquiry
 * - Project enquiry
 * - Callback request
 */
export const createLead = async (leadData) => {
  const response = await api.post(
    "/leads",
    leadData
  );

  return response.data;
};

/**
 * Update lead
 *
 * Example:
 * {
 *   status: "contacted"
 * }
 */
export const updateLead = async (id, leadData) => {
  if (!id) {
    throw new Error("Lead ID is required");
  }

  const response = await api.put(
    `/leads/${id}`,
    leadData
  );

  return response.data;
};

/**
 * Update only lead status
 */
export const updateLeadStatus = async (
  id,
  status
) => {
  if (!id) {
    throw new Error("Lead ID is required");
  }

  if (!status) {
    throw new Error("Lead status is required");
  }

  const response = await api.patch(
    `/leads/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};

/**
 * Delete lead
 */
export const deleteLead = async (id) => {
  if (!id) {
    throw new Error("Lead ID is required");
  }

  const response = await api.delete(
    `/leads/${id}`
  );

  return response.data;
};

/**
 * Get lead statistics
 */
export const getLeadStats = async () => {
  const response = await api.get(
    "/leads/stats"
  );

  return response.data;
};
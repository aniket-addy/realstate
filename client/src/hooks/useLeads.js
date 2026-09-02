import { useCallback, useEffect, useState } from "react";

import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
} from "../services/leadService";

/*
|--------------------------------------------------------------------------
| useLeads
|--------------------------------------------------------------------------
| Handles lead data, loading, errors, CRUD operations and statistics.
|--------------------------------------------------------------------------
*/

function useLeads(options = {}) {
  const {
    autoFetch = true,
    params = {},
  } = options;

  const [leads, setLeads] = useState([]);
  const [lead, setLead] = useState(null);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [error, setError] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Fetch all leads
  |--------------------------------------------------------------------------
  */

  const fetchLeads = useCallback(
    async (customParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const response = await getLeads({
          ...params,
          ...customParams,
        });

        /*
         * Supports:
         *
         * [
         *   ...
         * ]
         *
         * {
         *   leads: [...]
         * }
         *
         * {
         *   data: [...]
         * }
         */

        const data = Array.isArray(response)
          ? response
          : response?.leads ||
            response?.data ||
            [];

        setLeads(data);

        return response;
      } catch (err) {
        console.error(
          "Failed to fetch leads:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to fetch leads."
        );

        setLeads([]);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  /*
  |--------------------------------------------------------------------------
  | Fetch single lead
  |--------------------------------------------------------------------------
  */

  const fetchLead = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await getLeadById(id);

        const data =
          response?.lead ||
          response?.data ||
          response;

        setLead(data);

        return data;
      } catch (err) {
        console.error(
          "Failed to fetch lead:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to fetch lead."
        );

        setLead(null);

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Add lead
  |--------------------------------------------------------------------------
  */

  const addLead = useCallback(
    async (leadData) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await createLead(leadData);

        const newLead =
          response?.lead ||
          response?.data ||
          response;

        /*
         * Add new lead to the top
         * of the current list.
         */

        if (newLead) {
          setLeads((currentLeads) => [
            newLead,
            ...currentLeads,
          ]);
        }

        return response;
      } catch (err) {
        console.error(
          "Failed to create lead:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to create lead."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Edit lead
  |--------------------------------------------------------------------------
  */

  const editLead = useCallback(
    async (id, leadData) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await updateLead(
            id,
            leadData
          );

        const updatedLead =
          response?.lead ||
          response?.data ||
          response;

        /*
         * Update lead in local list.
         */

        setLeads((currentLeads) =>
          currentLeads.map((item) =>
            item._id === id ||
            item.id === id
              ? updatedLead
              : item
          )
        );

        /*
         * Update currently selected lead.
         */

        setLead((currentLead) => {
          if (
            currentLead?._id === id ||
            currentLead?.id === id
          ) {
            return updatedLead;
          }

          return currentLead;
        });

        return response;
      } catch (err) {
        console.error(
          "Failed to update lead:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to update lead."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Update lead status
  |--------------------------------------------------------------------------
  */

  const changeLeadStatus = useCallback(
    async (id, status) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await updateLeadStatus(
            id,
            status
          );

        const updatedLead =
          response?.lead ||
          response?.data ||
          response;

        /*
         * Update status in local list.
         */

        setLeads((currentLeads) =>
          currentLeads.map((item) =>
            item._id === id ||
            item.id === id
              ? {
                  ...item,
                  ...(updatedLead || {}),
                  status:
                    updatedLead?.status ||
                    status,
                }
              : item
          )
        );

        /*
         * Update selected lead.
         */

        setLead((currentLead) => {
          if (
            currentLead?._id === id ||
            currentLead?.id === id
          ) {
            return {
              ...currentLead,
              ...(updatedLead || {}),
              status:
                updatedLead?.status ||
                status,
            };
          }

          return currentLead;
        });

        return response;
      } catch (err) {
        console.error(
          "Failed to update lead status:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to update lead status."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Remove lead
  |--------------------------------------------------------------------------
  */

  const removeLead = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await deleteLead(id);

        /*
         * Remove deleted lead
         * from local state.
         */

        setLeads((currentLeads) =>
          currentLeads.filter(
            (item) =>
              item._id !== id &&
              item.id !== id
          )
        );

        /*
         * Clear selected lead
         * if it was deleted.
         */

        setLead((currentLead) => {
          if (
            currentLead?._id === id ||
            currentLead?.id === id
          ) {
            return null;
          }

          return currentLead;
        });

        return response;
      } catch (err) {
        console.error(
          "Failed to delete lead:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to delete lead."
        );

        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Fetch lead statistics
  |--------------------------------------------------------------------------
  */

  const fetchLeadStats = useCallback(
    async () => {
      try {
        setStatsLoading(true);
        setError(null);

        const response =
          await getLeadStats();

        const data =
          response?.stats ||
          response?.data ||
          response;

        setStats(data);

        return data;
      } catch (err) {
        console.error(
          "Failed to fetch lead statistics:",
          err
        );

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to fetch lead statistics."
        );

        setStats(null);

        throw err;
      } finally {
        setStatsLoading(false);
      }
    },
    []
  );

  /*
  |--------------------------------------------------------------------------
  | Refetch leads
  |--------------------------------------------------------------------------
  */

  const refetch = useCallback(() => {
    return fetchLeads();
  }, [fetchLeads]);

  /*
  |--------------------------------------------------------------------------
  | Initial fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (autoFetch) {
      fetchLeads();
    }
  }, [autoFetch, fetchLeads]);

  /*
  |--------------------------------------------------------------------------
  | Return
  |--------------------------------------------------------------------------
  */

  return {
    leads,
    lead,
    stats,

    loading,
    statsLoading,
    error,

    fetchLeads,
    fetchLead,

    addLead,
    editLead,
    changeLeadStatus,
    removeLead,

    fetchLeadStats,

    refetch,

    setLeads,
    setLead,
    setStats,
    setError,
  };
}

export default useLeads;
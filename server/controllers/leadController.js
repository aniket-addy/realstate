const mongoose = require("mongoose");
const Lead = require("../models/Lead");

/*
|--------------------------------------------------------------------------
| LEAD CONTROLLER
|--------------------------------------------------------------------------
| Handles all lead-related API operations.
|--------------------------------------------------------------------------
*/


/* =========================================================
   GET ALL LEADS
========================================================= */

/**
 * GET /api/leads
 *
 * Optional query params:
 * ?status=new
 * ?source=website
 * ?search=rahul
 * ?page=1
 * ?limit=20
 */

const getLeads = async (req, res) => {
  try {
    const {
      status,
      source,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    /* -------------------------------------------------------
       STATUS FILTER
    ------------------------------------------------------- */

    if (status) {
      filter.status = status;
    }


    /* -------------------------------------------------------
       SOURCE FILTER
    ------------------------------------------------------- */

    if (source) {
      filter.source = source;
    }


    /* -------------------------------------------------------
       SEARCH
    ------------------------------------------------------- */

    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: search,
            $options: "i",
          },
        },
        {
          requirement: {
            $regex: search,
            $options: "i",
          },
        },
        {
          propertyName: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }


    /* -------------------------------------------------------
       PAGINATION
    ------------------------------------------------------- */

    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const currentLimit = Math.min(
      Math.max(Number(limit) || 20, 1),
      100
    );

    const skip =
      (currentPage - 1) * currentLimit;


    /* -------------------------------------------------------
       DATABASE QUERY
    ------------------------------------------------------- */

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(currentLimit),

      Lead.countDocuments(filter),
    ]);


    /* -------------------------------------------------------
       RESPONSE
    ------------------------------------------------------- */

    return res.status(200).json({
      success: true,
      count: leads.length,
      total,
      page: currentPage,
      limit: currentLimit,
      totalPages: Math.ceil(
        total / currentLimit
      ),
      data: leads,
    });
  } catch (error) {
    console.error(
      "Get Leads Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
      error: error.message,
    });
  }
};


/* =========================================================
   GET SINGLE LEAD
========================================================= */

/**
 * GET /api/leads/:id
 */

const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;


    /* -------------------------------------------------------
       VALIDATE ID
    ------------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }


    /* -------------------------------------------------------
       FIND LEAD
    ------------------------------------------------------- */

    const lead =
      await Lead.findById(id);


    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }


    return res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error(
      "Get Lead Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
      error: error.message,
    });
  }
};


/* =========================================================
   CREATE LEAD
========================================================= */

/**
 * POST /api/leads
 */

const createLead = async (req, res) => {
  try {
    const leadData = req.body;


    /* -------------------------------------------------------
       EMPTY DATA CHECK
    ------------------------------------------------------- */

    if (
      !leadData ||
      Object.keys(leadData).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Lead data is required",
      });
    }


    /* -------------------------------------------------------
       CREATE
    ------------------------------------------------------- */

    const lead =
      await Lead.create(leadData);


    return res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead,
    });
  } catch (error) {
    console.error(
      "Create Lead Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create lead",
      error: error.message,
    });
  }
};


/* =========================================================
   UPDATE LEAD
========================================================= */

/**
 * PUT /api/leads/:id
 */

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;


    /* -------------------------------------------------------
       VALIDATE ID
    ------------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }


    /* -------------------------------------------------------
       UPDATE
    ------------------------------------------------------- */

    const lead =
      await Lead.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );


    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error(
      "Update Lead Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update lead",
      error: error.message,
    });
  }
};


/* =========================================================
   UPDATE LEAD STATUS
========================================================= */

/**
 * PATCH /api/leads/:id/status
 *
 * Body:
 * {
 *   "status": "contacted"
 * }
 */

const updateLeadStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;


    /* -------------------------------------------------------
       VALIDATE ID
    ------------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }


    /* -------------------------------------------------------
       VALIDATE STATUS
    ------------------------------------------------------- */

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Lead status is required",
      });
    }


    /* -------------------------------------------------------
       UPDATE STATUS
    ------------------------------------------------------- */

    const lead =
      await Lead.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );


    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error(
      "Update Lead Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update lead status",
      error: error.message,
    });
  }
};


/* =========================================================
   DELETE LEAD
========================================================= */

/**
 * DELETE /api/leads/:id
 */

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;


    /* -------------------------------------------------------
       VALIDATE ID
    ------------------------------------------------------- */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }


    /* -------------------------------------------------------
       DELETE
    ------------------------------------------------------- */

    const lead =
      await Lead.findByIdAndDelete(id);


    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }


    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      data: lead,
    });
  } catch (error) {
    console.error(
      "Delete Lead Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete lead",
      error: error.message,
    });
  }
};


/* =========================================================
   LEAD STATISTICS
========================================================= */

/**
 * GET /api/leads/stats
 */

const getLeadStats = async (req, res) => {
  try {
    const [
      total,
      newLeads,
      contacted,
      followUp,
      closed,
    ] = await Promise.all([
      Lead.countDocuments(),

      Lead.countDocuments({
        status: "new",
      }),

      Lead.countDocuments({
        status: "contacted",
      }),

      Lead.countDocuments({
        status: "follow-up",
      }),

      Lead.countDocuments({
        status: "closed",
      }),
    ]);


    return res.status(200).json({
      success: true,
      data: {
        total,
        new: newLeads,
        contacted,
        followUp,
        closed,
      },
    });
  } catch (error) {
    console.error(
      "Get Lead Stats Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead statistics",
      error: error.message,
    });
  }
};


/* =========================================================
   EXPORTS
========================================================= */

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
};
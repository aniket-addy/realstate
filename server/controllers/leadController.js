const mongoose = require("mongoose");
const Lead = require("../models/Lead");

/*
|--------------------------------------------------------------------------
| GET ALL LEADS
|--------------------------------------------------------------------------
| GET /api/leads
|--------------------------------------------------------------------------
*/

const getLeads = async (req, res) => {
  try {
    const {
      status,
      source,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    /*
    |--------------------------------------------------------------------------
    | BUILD QUERY
    |--------------------------------------------------------------------------
    */

    const query = {};

    /*
    |--------------------------------------------------------------------------
    | STATUS FILTER
    |--------------------------------------------------------------------------
    */

    if (status) {
      query.status = status;
    }

    /*
    |--------------------------------------------------------------------------
    | SOURCE FILTER
    |--------------------------------------------------------------------------
    */

    if (source) {
      query.source = source;
    }

    /*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

    if (search && search.trim()) {
      const searchValue = search.trim();

      query.$or = [
        {
          name: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          email: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          requirement: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          propertyName: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          projectName: {
            $regex: searchValue,
            $options: "i",
          },
        },
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | PAGINATION
    |--------------------------------------------------------------------------
    */

    const currentPage = Math.max(
      Number(page) || 1,
      1
    );

    const perPage = Math.min(
      Math.max(Number(limit) || 10, 1),
      100
    );

    const skip =
      (currentPage - 1) * perPage;

    /*
    |--------------------------------------------------------------------------
    | FETCH LEADS + TOTAL
    |--------------------------------------------------------------------------
    */

    const [leads, total] =
      await Promise.all([
        Lead.find(query)
          .sort({
            createdAt: -1,
          })
          .skip(skip)
          .limit(perPage),

        Lead.countDocuments(query),
      ]);

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,

      count: leads.length,

      total,

      page: currentPage,

      limit: perPage,

      totalPages: Math.ceil(
        total / perPage
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

/*
|--------------------------------------------------------------------------
| GET LEAD BY ID
|--------------------------------------------------------------------------
| GET /api/leads/:id
|--------------------------------------------------------------------------
*/

const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;

    /*
    |--------------------------------------------------------------------------
    | VALIDATE OBJECT ID
    |--------------------------------------------------------------------------
    */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | FIND LEAD
    |--------------------------------------------------------------------------
    */

    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    console.error(
      "Get Lead By ID Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| CREATE LEAD
|--------------------------------------------------------------------------
| POST /api/leads
|--------------------------------------------------------------------------
*/

const createLead = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      requirement,
      message,
      subject,
      propertyId,
      propertyName,
      projectId,
      projectName,
      source,
      status,
      notes,
      assignedTo,
      preferredContact,
      budget,
      location,
    } = req.body;

    /*
    |--------------------------------------------------------------------------
    | REQUIRED VALIDATION
    |--------------------------------------------------------------------------
    */

    if (!name || !String(name).trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!phone || !String(phone).trim()) {
      return res.status(400).json({
        success: false,
        message: "Phone is required",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE LEAD
    |--------------------------------------------------------------------------
    */

    const lead = await Lead.create({
      name: String(name).trim(),

      phone: String(phone).trim(),

      email: email
        ? String(email).trim().toLowerCase()
        : "",

      requirement:
        requirement || "",

      message:
        message || "",

      subject:
        subject || "",

      propertyId:
        propertyId || null,

      propertyName:
        propertyName || "",

      projectId:
        projectId || null,

      projectName:
        projectName || "",

      source:
        source || "website",

      status:
        status || "new",

      notes:
        notes || "",

      assignedTo:
        assignedTo || "",

      preferredContact:
        preferredContact || "",

      budget:
        Number(budget) || 0,

      location:
        location || "",
    });

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

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

/*
|--------------------------------------------------------------------------
| UPDATE COMPLETE LEAD
|--------------------------------------------------------------------------
| PUT /api/leads/:id
|--------------------------------------------------------------------------
*/

const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    /*
    |--------------------------------------------------------------------------
    | VALIDATE ID
    |--------------------------------------------------------------------------
    */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE
    |--------------------------------------------------------------------------
    */

    const lead =
      await Lead.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    /*
    |--------------------------------------------------------------------------
    | NOT FOUND
    |--------------------------------------------------------------------------
    */

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

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

/*
|--------------------------------------------------------------------------
| UPDATE LEAD STATUS
|--------------------------------------------------------------------------
| PATCH /api/leads/:id/status
|--------------------------------------------------------------------------
*/

const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    /*
    |--------------------------------------------------------------------------
    | VALIDATE ID
    |--------------------------------------------------------------------------
    */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | STATUS REQUIRED
    |--------------------------------------------------------------------------
    */

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | ALLOWED STATUSES
    |--------------------------------------------------------------------------
    */

    const allowedStatuses = [
      "new",
      "contacted",
      "qualified",
      "converted",
      "closed",
    ];

    /*
    |--------------------------------------------------------------------------
    | NORMALIZE STATUS
    |--------------------------------------------------------------------------
    */

    const normalizedStatus = String(
      status
    )
      .trim()
      .toLowerCase();

    /*
    |--------------------------------------------------------------------------
    | VALIDATE STATUS
    |--------------------------------------------------------------------------
    */

    if (
      !allowedStatuses.includes(
        normalizedStatus
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead status",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | UPDATE STATUS
    |--------------------------------------------------------------------------
    */

    const lead =
      await Lead.findByIdAndUpdate(
        id,
        {
          $set: {
            status: normalizedStatus,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

    /*
    |--------------------------------------------------------------------------
    | LEAD NOT FOUND
    |--------------------------------------------------------------------------
    */

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,
      message:
        "Lead status updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error(
      "Update Lead Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update lead status",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| DELETE LEAD
|--------------------------------------------------------------------------
| DELETE /api/leads/:id
|--------------------------------------------------------------------------
*/

const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    /*
    |--------------------------------------------------------------------------
    | VALIDATE ID
    |--------------------------------------------------------------------------
    */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | DELETE
    |--------------------------------------------------------------------------
    */

    const lead =
      await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

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

/*
|--------------------------------------------------------------------------
| GET LEAD STATISTICS
|--------------------------------------------------------------------------
| GET /api/leads/stats
|--------------------------------------------------------------------------
*/

const getLeadStats = async (req, res) => {
  try {
    /*
    |--------------------------------------------------------------------------
    | COUNT ALL STATUSES
    |--------------------------------------------------------------------------
    */

    const [
      total,
      newLeads,
      contacted,
      qualified,
      converted,
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
        status: "qualified",
      }),

      Lead.countDocuments({
        status: "converted",
      }),

      Lead.countDocuments({
        status: "closed",
      }),
    ]);

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return res.status(200).json({
      success: true,

      data: {
        total,

        new: newLeads,

        contacted,

        qualified,

        converted,

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
      message:
        "Failed to fetch lead statistics",
      error: error.message,
    });
  }
};

/*
|--------------------------------------------------------------------------
| EXPORTS
|--------------------------------------------------------------------------
*/

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
};
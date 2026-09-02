const express = require("express");

const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
} = require("../controllers/leadController");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| LEAD ROUTES
|--------------------------------------------------------------------------
|
| Base URL:
| /api/leads
|
|--------------------------------------------------------------------------
*/


/* =====================================================
   LEAD STATISTICS
===================================================== */

// GET /api/leads/stats
router.get("/stats", getLeadStats);


/* =====================================================
   ALL LEADS
===================================================== */

// GET /api/leads
router.get("/", getLeads);


/* =====================================================
   CREATE LEAD
===================================================== */

// POST /api/leads
router.post("/", createLead);


/* =====================================================
   SINGLE LEAD
===================================================== */

// GET /api/leads/:id
router.get("/:id", getLeadById);


/* =====================================================
   UPDATE LEAD
===================================================== */

// PUT /api/leads/:id
router.put("/:id", updateLead);


/* =====================================================
   UPDATE LEAD STATUS
===================================================== */

// PATCH /api/leads/:id/status
router.patch(
  "/:id/status",
  updateLeadStatus
);


/* =====================================================
   DELETE LEAD
===================================================== */

// DELETE /api/leads/:id
router.delete("/:id", deleteLead);


/*
|--------------------------------------------------------------------------
| EXPORT ROUTER
|--------------------------------------------------------------------------
*/

module.exports = router;
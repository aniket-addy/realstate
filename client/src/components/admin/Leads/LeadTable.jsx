import {
  Eye,
  Mail,
  Phone,
  Search,
  User,
} from "lucide-react";

import { useMemo, useState } from "react";
import LeadStatus from "./LeadStatus";

function LeadTable({
  leads = [],
  onStatusChange,
  onViewLead,
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const defaultLeads = [
    {
      id: "1",
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      email: "rahul@example.com",
      requirement: "Residential Property",
      project: "Yamuna Expressway Project",
      date: "31 Aug 2026",
      status: "New",
    },
    {
      id: "2",
      name: "Priya Verma",
      phone: "+91 98765 12345",
      email: "priya@example.com",
      requirement: "Investment Project",
      project: "Dholera Smart City",
      date: "30 Aug 2026",
      status: "Contacted",
    },
    {
      id: "3",
      name: "Amit Singh",
      phone: "+91 98111 22334",
      email: "amit@example.com",
      requirement: "Commercial Property",
      project: "Premium Heights",
      date: "29 Aug 2026",
      status: "Follow Up",
    },
    {
      id: "4",
      name: "Neha Gupta",
      phone: "+91 99100 44556",
      email: "neha@example.com",
      requirement: "Plot",
      project: "Green Valley Residency",
      date: "28 Aug 2026",
      status: "Closed",
    },
  ];

  const leadList =
    leads.length > 0 ? leads : defaultLeads;

  // =========================================================
  // FILTER LEADS
  // =========================================================

  const filteredLeads = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return leadList.filter((lead) => {
      const matchesSearch =
        !searchValue ||
        lead.name
          ?.toLowerCase()
          .includes(searchValue) ||
        lead.email
          ?.toLowerCase()
          .includes(searchValue) ||
        lead.phone
          ?.toLowerCase()
          .includes(searchValue) ||
        lead.project
          ?.toLowerCase()
          .includes(searchValue) ||
        lead.requirement
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leadList, search, statusFilter]);

  // =========================================================
  // STATUS CHANGE
  // =========================================================

  const handleStatusChange = (
    leadId,
    newStatus
  ) => {
    if (onStatusChange) {
      onStatusChange(
        leadId,
        newStatus
      );
    }
  };

  // =========================================================
  // VIEW LEAD
  // =========================================================

  const handleViewLead = (lead) => {
    if (onViewLead) {
      onViewLead(lead);
    }
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          border-b
          border-slate-200
          p-4
          sm:p-5
        "
      >
        <div
          className="
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* TITLE */}
          <div>
            <h2 className="text-base font-extrabold text-slate-950">
              All Leads
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage and track website enquiries
            </p>
          </div>

          {/* FILTERS */}
          <div
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
            "
          >
            {/* SEARCH */}
            <div className="relative">
              <Search
                size={15}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search leads..."
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  pl-9
                  pr-3
                  text-xs
                  font-medium
                  text-slate-800
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#d6a84f]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#d6a84f]/10
                  sm:w-[220px]
                "
              />
            </div>

            {/* STATUS FILTER */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
                h-10
                cursor-pointer
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-3
                text-xs
                font-semibold
                text-slate-700
                outline-none
                transition
                focus:border-[#d6a84f]
                focus:bg-white
                focus:ring-2
                focus:ring-[#d6a84f]/10
              "
            >
              <option value="All">
                All Status
              </option>

              <option value="New">
                New
              </option>

              <option value="Contacted">
                Contacted
              </option>

              <option value="Follow Up">
                Follow Up
              </option>

              <option value="Qualified">
                Qualified
              </option>

              <option value="Closed">
                Closed
              </option>

              <option value="Lost">
                Lost
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* =====================================================
          DESKTOP TABLE
      ====================================================== */}

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th
                className="
                  px-5
                  py-3
                  text-left
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                  text-slate-500
                "
              >
                Lead
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                  text-slate-500
                "
              >
                Requirement
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                  text-slate-500
                "
              >
                Project
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                  text-slate-500
                "
              >
                Date
              </th>

              <th
                className="
                  px-4
                  py-3
                  text-left
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                  text-slate-500
                "
              >
                Status
              </th>

              <th
                className="
                  px-5
                  py-3
                  text-right
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.08em]
                  text-slate-500
                "
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className="
                  transition
                  hover:bg-slate-50
                "
              >
                {/* LEAD */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#f7f0e2]
                        text-[#b88b32]
                      "
                    >
                      <User size={16} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-900">
                        {lead.name}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <Mail
                          size={11}
                          className="shrink-0 text-slate-400"
                        />

                        <span className="max-w-[180px] truncate text-[10px] text-slate-500">
                          {lead.email}
                        </span>
                      </div>

                      {lead.phone && (
                        <div className="mt-0.5 flex items-center gap-1.5">
                          <Phone
                            size={10}
                            className="text-slate-400"
                          />

                          <span className="text-[10px] text-slate-500">
                            {lead.phone}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* REQUIREMENT */}
                <td className="px-4 py-4">
                  <span className="text-xs font-semibold text-slate-700">
                    {lead.requirement || "-"}
                  </span>
                </td>

                {/* PROJECT */}
                <td className="px-4 py-4">
                  <span className="text-xs text-slate-600">
                    {lead.project || "-"}
                  </span>
                </td>

                {/* DATE */}
                <td className="px-4 py-4">
                  <span className="text-[11px] text-slate-500">
                    {lead.date || "-"}
                  </span>
                </td>

                {/* STATUS */}
                <td className="px-4 py-4">
                  <LeadStatus
                    status={
                      lead.status || "New"
                    }
                    editable
                    onChange={(newStatus) =>
                      handleStatusChange(
                        lead.id,
                        newStatus
                      )
                    }
                  />
                </td>

                {/* ACTION */}
                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        handleViewLead(lead)
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-400
                        transition
                        hover:border-[#d6a84f]
                        hover:bg-[#f7f0e2]
                        hover:text-[#b88b32]
                      "
                      title="View lead"
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          MOBILE / TABLET CARDS
      ====================================================== */}

      <div className="divide-y divide-slate-100 lg:hidden">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="
              p-4
              transition
              hover:bg-slate-50
              sm:p-5
            "
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#f7f0e2]
                    text-[#b88b32]
                  "
                >
                  <User size={17} />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-bold text-slate-900">
                    {lead.name}
                  </h3>

                  <p className="mt-1 truncate text-[11px] text-slate-500">
                    {lead.email}
                  </p>

                  {lead.phone && (
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {lead.phone}
                    </p>
                  )}
                </div>
              </div>

              <LeadStatus
                status={lead.status || "New"}
                editable
                onChange={(newStatus) =>
                  handleStatusChange(
                    lead.id,
                    newStatus
                  )
                }
              />
            </div>

            {/* DETAILS */}
            <div
              className="
                mt-4
                grid
                grid-cols-1
                gap-3
                rounded-xl
                bg-slate-50
                p-3
                sm:grid-cols-3
              "
            >
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
                  Requirement
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-700">
                  {lead.requirement || "-"}
                </p>
              </div>

              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
                  Project
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-700">
                  {lead.project || "-"}
                </p>
              </div>

              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.08em] text-slate-400">
                  Date
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-700">
                  {lead.date || "-"}
                </p>
              </div>
            </div>

            {/* ACTION */}
            <button
              type="button"
              onClick={() =>
                handleViewLead(lead)
              }
              className="
                mt-3
                inline-flex
                items-center
                gap-2
                text-xs
                font-bold
                text-[#b88b32]
                transition
                hover:text-[#9a7428]
              "
            >
              <Eye size={14} />

              View Lead
            </button>
          </div>
        ))}
      </div>

      {/* =====================================================
          NO RESULTS
      ====================================================== */}

      {filteredLeads.length === 0 && (
        <div className="px-5 py-14 text-center">
          <div
            className="
              mx-auto
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-400
            "
          >
            <Search size={20} />
          </div>

          <h3 className="mt-3 text-sm font-bold text-slate-900">
            No leads found
          </h3>

          <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
            Try changing your search or status
            filter.
          </p>
        </div>
      )}

      {/* =====================================================
          FOOTER COUNT
      ====================================================== */}

      {filteredLeads.length > 0 && (
        <div
          className="
            border-t
            border-slate-200
            bg-slate-50
            px-5
            py-3
          "
        >
          <p className="text-[11px] text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredLeads.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {leadList.length}
            </span>{" "}
            leads
          </p>
        </div>
      )}
    </div>
  );
}

export default LeadTable;
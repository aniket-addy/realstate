
import { useEffect, useMemo, useState } from "react";

import {
  AlertCircle,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  getLeads,
  getLeadStats,
  updateLeadStatus,
  deleteLead,
} from "../../services/leadService";

/*
|--------------------------------------------------------------------------
| STATUS OPTIONS
|--------------------------------------------------------------------------
*/

const statusOptions = [
  {
    value: "",
    label: "All Status",
  },
  {
    value: "new",
    label: "New",
  },
  {
    value: "contacted",
    label: "Contacted",
  },
  {
    value: "qualified",
    label: "Qualified",
  },
  {
    value: "converted",
    label: "Converted",
  },
  {
    value: "closed",
    label: "Closed",
  },
];

const sourceOptions = [
  {
    value: "",
    label: "All Sources",
  },
  {
    value: "contact-form",
    label: "Contact Form",
  },
  {
    value: "property",
    label: "Property",
  },
  {
    value: "project",
    label: "Project",
  },
  {
    value: "callback",
    label: "Callback",
  },
  {
    value: "website",
    label: "Website",
  },
];

/*
|--------------------------------------------------------------------------
| STATUS STYLES
|--------------------------------------------------------------------------
*/

const getStatusClasses = (status) => {
  switch (String(status || "").toLowerCase()) {
    case "new":
      return "bg-blue-50 text-blue-600 border-blue-100";

    case "contacted":
      return "bg-amber-50 text-amber-600 border-amber-100";

    case "qualified":
      return "bg-purple-50 text-purple-600 border-purple-100";

    case "converted":
      return "bg-emerald-50 text-emerald-600 border-emerald-100";

    case "closed":
      return "bg-slate-100 text-slate-500 border-slate-200";

    default:
      return "bg-slate-50 text-slate-500 border-slate-200";
  }
};

/*
|--------------------------------------------------------------------------
| FORMAT HELPERS
|--------------------------------------------------------------------------
*/

const formatStatus = (status) => {
  if (!status) return "Unknown";

  return String(status)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatSource = (source) => {
  if (!source) return "Website";

  return String(source)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/*
|--------------------------------------------------------------------------
| ADMIN ENQUIRIES
|--------------------------------------------------------------------------
*/

function AdminLeads() {
  const [leads, setLeads] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    qualified: 0,
    converted: 0,
  });

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");

  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [page, setPage] = useState(1);

  const limit = 10;

  /*
  |--------------------------------------------------------------------------
  | FETCH ENQUIRIES
  |--------------------------------------------------------------------------
  */

  const fetchLeads = async ({ showRefresh = false } = {}) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const params = {
        page,
        limit,
      };

      if (status) {
        params.status = status;
      }

      if (source) {
        params.source = source;
      }

      if (search.trim()) {
        params.search = search.trim();
      }

      const response = await getLeads(params);

      const receivedLeads =
        response?.leads ||
        response?.data?.leads ||
        response?.data ||
        [];

      setLeads(
        Array.isArray(receivedLeads)
          ? receivedLeads
          : []
      );
    } catch (err) {
      console.error("Fetch enquiries error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load enquiries."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FETCH STATS
  |--------------------------------------------------------------------------
  */

  const fetchStats = async () => {
    try {
      const response = await getLeadStats();

      const receivedStats =
        response?.stats ||
        response?.data?.stats ||
        response?.data ||
        response;

      if (
        receivedStats &&
        typeof receivedStats === "object"
      ) {
        setStats({
          total:
            receivedStats.total ??
            receivedStats.totalLeads ??
            0,

          new:
            receivedStats.new ??
            receivedStats.newLeads ??
            0,

          contacted:
            receivedStats.contacted ??
            receivedStats.contactedLeads ??
            0,

          qualified:
            receivedStats.qualified ??
            receivedStats.qualifiedLeads ??
            0,

          converted:
            receivedStats.converted ??
            receivedStats.convertedLeads ??
            0,
        });
      }
    } catch (err) {
      console.error(
        "Fetch enquiry stats error:",
        err
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD / FILTER LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchLeads();
    fetchStats();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status, source]);

  /*
  |--------------------------------------------------------------------------
  | SEARCH DEBOUNCE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchLeads();
    }, 400);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  /*
  |--------------------------------------------------------------------------
  | REFRESH
  |--------------------------------------------------------------------------
  */

  const handleRefresh = async () => {
    await Promise.all([
      fetchLeads({
        showRefresh: true,
      }),
      fetchStats(),
    ]);
  };

  /*
  |--------------------------------------------------------------------------
  | STATUS UPDATE
  |--------------------------------------------------------------------------
  */

  const handleStatusChange = async (
    lead,
    newStatus
  ) => {
    if (!lead?._id || !newStatus) {
      return;
    }

    try {
      setUpdatingId(lead._id);
      setError("");

      await updateLeadStatus(
        lead._id,
        newStatus
      );

      setLeads((current) =>
        current.map((item) =>
          item._id === lead._id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );

      if (
        selectedLead?._id ===
        lead._id
      ) {
        setSelectedLead((current) =>
          current
            ? {
                ...current,
                status: newStatus,
              }
            : current
        );
      }

      await fetchStats();
    } catch (err) {
      console.error(
        "Update enquiry status error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to update enquiry status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE ENQUIRY
  |--------------------------------------------------------------------------
  */

  const handleDelete = async () => {
    if (!deleteTarget?._id) {
      return;
    }

    try {
      setDeletingId(deleteTarget._id);
      setError("");

      await deleteLead(deleteTarget._id);

      setLeads((current) =>
        current.filter(
          (item) =>
            item._id !==
            deleteTarget._id
        )
      );

      if (
        selectedLead?._id ===
        deleteTarget._id
      ) {
        setSelectedLead(null);
      }

      setDeleteTarget(null);

      await fetchStats();
    } catch (err) {
      console.error(
        "Delete enquiry error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to delete enquiry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FALLBACK CLIENT FILTER
  |--------------------------------------------------------------------------
  */

  const visibleLeads = useMemo(() => {
    if (!Array.isArray(leads)) {
      return [];
    }

    if (
      !search.trim() &&
      !status &&
      !source
    ) {
      return leads;
    }

    const searchValue =
      search.trim().toLowerCase();

    return leads.filter((lead) => {
      const name = String(
        lead?.name ||
          lead?.fullName ||
          ""
      ).toLowerCase();

      const email = String(
        lead?.email || ""
      ).toLowerCase();

      const phone = String(
        lead?.phone ||
          lead?.mobile ||
          ""
      ).toLowerCase();

      const leadStatus = String(
        lead?.status || ""
      ).toLowerCase();

      const leadSource = String(
        lead?.source || ""
      ).toLowerCase();

      const matchesSearch =
        !searchValue ||
        name.includes(searchValue) ||
        email.includes(searchValue) ||
        phone.includes(searchValue);

      const matchesStatus =
        !status ||
        leadStatus ===
          status.toLowerCase();

      const matchesSource =
        !source ||
        leadSource ===
          source.toLowerCase();

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource
      );
    });
  }, [
    leads,
    search,
    status,
    source,
  ]);

  /*
  |--------------------------------------------------------------------------
  | RESET FILTERS
  |--------------------------------------------------------------------------
  */

  const resetFilters = () => {
    setSearch("");
    setStatus("");
    setSource("");
    setPage(1);
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="w-full min-w-0 bg-[#f6f7f9]">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <header className="relative z-10 border-b border-slate-200 bg-white">

        <div className="flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex min-w-0 items-center gap-3">

            <Link
              to="/admin"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                transition
                hover:bg-slate-50
                hover:text-slate-900
              "
            >
              <ArrowLeft size={16} />
            </Link>

            <div className="min-w-0">

              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#b88b32]">
                Admin Panel
              </p>

              <h1 className="truncate text-lg font-extrabold tracking-tight text-slate-950 sm:text-xl">
                Enquiries
              </h1>

            </div>

          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="
              inline-flex
              h-9
              shrink-0
              items-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              text-xs
              font-bold
              text-slate-600
              transition
              hover:bg-slate-50
              hover:text-slate-900
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <RefreshCw
              size={14}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            <span className="hidden sm:inline">
              Refresh
            </span>
          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* ERROR */}

        {error && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

            <AlertCircle
              size={16}
              className="mt-0.5 shrink-0 text-red-500"
            />

            <p className="flex-1 text-xs font-semibold text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="text-red-400 transition hover:text-red-600"
            >
              <X size={15} />
            </button>

          </div>
        )}


        {/* =================================================
            STATS
        ================================================== */}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">

          <StatCard
            label="Total Enquiries"
            value={stats.total}
            icon={UserRound}
          />

          <StatCard
            label="New"
            value={stats.new}
            icon={AlertCircle}
          />

          <StatCard
            label="Contacted"
            value={stats.contacted}
            icon={Phone}
          />

          <StatCard
            label="Qualified"
            value={stats.qualified}
            icon={Filter}
          />

          <StatCard
            label="Converted"
            value={stats.converted}
            icon={Mail}
          />

        </div>


        {/* =================================================
            FILTER BAR
        ================================================== */}

        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            <div className="relative min-w-0 flex-1">

              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by name, email or phone..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-9
                  pr-9
                  text-xs
                  font-semibold
                  text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#d6a84f]
                  focus:ring-4
                  focus:ring-[#d6a84f]/10
                "
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}

            </div>


            <div className="relative w-full lg:w-[170px]">

              <select
                value={status}
                onChange={(event) => {
                  setStatus(
                    event.target.value
                  );
                  setPage(1);
                }}
                className="
                  h-11
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-3
                  pr-9
                  text-xs
                  font-semibold
                  text-slate-700
                  outline-none
                  focus:border-[#d6a84f]
                  focus:ring-4
                  focus:ring-[#d6a84f]/10
                "
              >
                {statusOptions.map(
                  (item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>


            <div className="relative w-full lg:w-[170px]">

              <select
                value={source}
                onChange={(event) => {
                  setSource(
                    event.target.value
                  );
                  setPage(1);
                }}
                className="
                  h-11
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-3
                  pr-9
                  text-xs
                  font-semibold
                  text-slate-700
                  outline-none
                  focus:border-[#d6a84f]
                  focus:ring-4
                  focus:ring-[#d6a84f]/10
                "
              >
                {sourceOptions.map(
                  (item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

            </div>


            {(search ||
              status ||
              source) && (
              <button
                type="button"
                onClick={resetFilters}
                className="
                  inline-flex
                  h-11
                  shrink-0
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  px-4
                  text-xs
                  font-bold
                  text-slate-600
                  transition
                  hover:bg-slate-50
                "
              >
                <X size={14} />
                Reset
              </button>
            )}

          </div>

        </section>


        {/* =================================================
            ENQUIRIES TABLE
        ================================================== */}

        <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-sm font-extrabold text-slate-900">
                All Enquiries
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Manage enquiries and customer follow-ups.
              </p>

            </div>

            <span className="text-[10px] font-bold text-slate-400">
              {visibleLeads.length} shown
            </span>

          </div>


          {loading ? (
            <LoadingState />
          ) : visibleLeads.length === 0 ? (
            <EmptyState
              hasFilters={Boolean(
                search ||
                  status ||
                  source
              )}
              onReset={resetFilters}
            />
          ) : (
            <>
              <div className="hidden overflow-x-auto md:block">

                <table className="w-full min-w-[900px]">

                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">

                      <th className="px-5 py-3 text-left text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        Enquiry
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        Contact
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        Source
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        Status
                      </th>

                      <th className="px-4 py-3 text-left text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        Date
                      </th>

                      <th className="px-5 py-3 text-right text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                        Actions
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {visibleLeads.map(
                      (lead) => (
                        <LeadRow
                          key={
                            lead._id ||
                            lead.id
                          }
                          lead={lead}
                          updatingId={
                            updatingId
                          }
                          onStatusChange={
                            handleStatusChange
                          }
                          onView={() =>
                            setSelectedLead(
                              lead
                            )
                          }
                          onDelete={() =>
                            setDeleteTarget(
                              lead
                            )
                          }
                        />
                      )
                    )}

                  </tbody>

                </table>

              </div>


              <div className="divide-y divide-slate-100 md:hidden">

                {visibleLeads.map(
                  (lead) => (
                    <LeadMobileCard
                      key={
                        lead._id ||
                        lead.id
                      }
                      lead={lead}
                      updatingId={
                        updatingId
                      }
                      onStatusChange={
                        handleStatusChange
                      }
                      onView={() =>
                        setSelectedLead(
                          lead
                        )
                      }
                      onDelete={() =>
                        setDeleteTarget(
                          lead
                        )
                      }
                    />
                  )
                )}

              </div>
            </>
          )}


          {!loading &&
            visibleLeads.length > 0 && (
              <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">

                <p className="text-[10px] font-semibold text-slate-400">
                  Page {page}
                </p>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() =>
                      setPage(
                        (current) =>
                          Math.max(
                            1,
                            current - 1
                          )
                      )
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
                      text-slate-500
                      transition
                      hover:bg-slate-50
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <ChevronLeft size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPage(
                        (current) =>
                          current + 1
                      )
                    }
                    disabled={
                      visibleLeads.length <
                      limit
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
                      text-slate-500
                      transition
                      hover:bg-slate-50
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <ChevronRight size={14} />
                  </button>

                </div>

              </div>
            )}

        </section>

      </main>


      {/* =====================================================
          ENQUIRY DETAILS MODAL
      ====================================================== */}

      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          updatingId={updatingId}
          onStatusChange={handleStatusChange}
          onClose={() =>
            setSelectedLead(null)
          }
        />
      )}


      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      {deleteTarget && (
        <DeleteModal
          lead={deleteTarget}
          deleting={Boolean(
            deletingId
          )}
          onCancel={() =>
            setDeleteTarget(null)
          }
          onConfirm={handleDelete}
        />
      )}

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| STAT CARD
|--------------------------------------------------------------------------
*/

function StatCard({
  label,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between gap-3">

        <div>

          <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
            {value ?? 0}
          </p>

        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f7f0e2] text-[#b88b32]">
          <Icon size={16} />
        </div>

      </div>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| ENQUIRY ROW
|--------------------------------------------------------------------------
*/

function LeadRow({
  lead,
  updatingId,
  onStatusChange,
  onView,
  onDelete,
}) {
  const name =
    lead?.name ||
    lead?.fullName ||
    "Unnamed Enquiry";

  const email =
    lead?.email || "—";

  const phone =
    lead?.phone ||
    lead?.mobile ||
    "—";

  const currentStatus =
    lead?.status || "new";

  return (
    <tr className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/60">

      <td className="px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-extrabold text-slate-600">
            {name
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="min-w-0">

            <p className="truncate text-xs font-extrabold text-slate-800">
              {name}
            </p>

            {lead?.projectName && (
              <p className="mt-0.5 max-w-[220px] truncate text-[10px] font-semibold text-slate-400">
                {lead.projectName}
              </p>
            )}

            {lead?.propertyName && (
              <p className="mt-0.5 max-w-[220px] truncate text-[10px] font-semibold text-slate-400">
                {lead.propertyName}
              </p>
            )}

          </div>

        </div>

      </td>


      <td className="px-4 py-4">

        <div className="space-y-1">

          {email !== "—" && (
            <a
              href={`mailto:${email}`}
              className="block max-w-[210px] truncate text-[10px] font-semibold text-slate-600 hover:text-[#b88b32]"
            >
              {email}
            </a>
          )}

          {phone !== "—" && (
            <a
              href={`tel:${phone}`}
              className="block text-[10px] font-semibold text-slate-400 hover:text-[#b88b32]"
            >
              {phone}
            </a>
          )}

        </div>

      </td>


      <td className="px-4 py-4">

        <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold text-slate-600">
          {formatSource(
            lead?.source
          )}
        </span>

      </td>


      <td className="px-4 py-4">

        <div className="relative inline-block">

          <select
            value={currentStatus}
            disabled={
              updatingId ===
              lead?._id
            }
            onChange={(event) =>
              onStatusChange(
                lead,
                event.target.value
              )
            }
            className={`
              h-8
              appearance-none
              rounded-lg
              border
              pl-2.5
              pr-7
              text-[10px]
              font-extrabold
              outline-none
              ${getStatusClasses(
                currentStatus
              )}
            `}
          >
            {statusOptions
              .filter(
                (item) =>
                  item.value
              )
              .map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
          </select>

          <ChevronDown
            size={12}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
          />

        </div>

      </td>


      <td className="px-4 py-4 text-[10px] font-semibold text-slate-400">
        {formatDate(
          lead?.createdAt ||
            lead?.created_at ||
            lead?.date
        )}
      </td>


      <td className="px-5 py-4">

        <div className="flex items-center justify-end gap-1">

          <button
            type="button"
            onClick={onView}
            title="View enquiry"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <Eye size={14} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            title="Delete enquiry"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-red-50
              hover:text-red-500
            "
          >
            <Trash2 size={14} />
          </button>

        </div>

      </td>

    </tr>
  );
}


/*
|--------------------------------------------------------------------------
| MOBILE ENQUIRY CARD
|--------------------------------------------------------------------------
*/

function LeadMobileCard({
  lead,
  updatingId,
  onStatusChange,
  onView,
  onDelete,
}) {
  const name =
    lead?.name ||
    lead?.fullName ||
    "Unnamed Enquiry";

  const email =
    lead?.email || "—";

  const phone =
    lead?.phone ||
    lead?.mobile ||
    "—";

  const currentStatus =
    lead?.status || "new";

  return (
    <div className="p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-extrabold text-slate-600">
          {name
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <h3 className="truncate text-xs font-extrabold text-slate-800">
                {name}
              </h3>

              <p className="mt-1 text-[10px] font-semibold text-slate-400">
                {formatSource(
                  lead?.source
                )}
              </p>

            </div>

            <span className="shrink-0 text-[9px] font-semibold text-slate-400">
              {formatDate(
                lead?.createdAt ||
                  lead?.created_at ||
                  lead?.date
              )}
            </span>

          </div>


          <div className="mt-3 space-y-1">

            {email !== "—" && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 truncate text-[10px] font-semibold text-slate-600"
              >
                <Mail size={12} />
                {email}
              </a>
            )}

            {phone !== "—" && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-[10px] font-semibold text-slate-600"
              >
                <Phone size={12} />
                {phone}
              </a>
            )}

          </div>


          <div className="mt-3 flex items-center justify-between gap-2">

            <div className="relative">

              <select
                value={currentStatus}
                disabled={
                  updatingId ===
                  lead?._id
                }
                onChange={(event) =>
                  onStatusChange(
                    lead,
                    event.target.value
                  )
                }
                className={`
                  h-8
                  appearance-none
                  rounded-lg
                  border
                  pl-2.5
                  pr-7
                  text-[10px]
                  font-extrabold
                  outline-none
                  ${getStatusClasses(
                    currentStatus
                  )}
                `}
              >
                {statusOptions
                  .filter(
                    (item) =>
                      item.value
                  )
                  .map((item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ))}
              </select>

              <ChevronDown
                size={11}
                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
              />

            </div>


            <div className="flex items-center gap-1">

              <button
                type="button"
                onClick={onView}
                title="View enquiry"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100"
              >
                <Eye size={14} />
              </button>

              <button
                type="button"
                onClick={onDelete}
                title="Delete enquiry"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| ENQUIRY DETAILS MODAL
|--------------------------------------------------------------------------
*/

function LeadDetailsModal({
  lead,
  updatingId,
  onStatusChange,
  onClose,
}) {
  const name =
    lead?.name ||
    lead?.fullName ||
    "Unnamed Enquiry";

  const email =
    lead?.email || "—";

  const phone =
    lead?.phone ||
    lead?.mobile ||
    "—";

  const currentStatus =
    lead?.status || "new";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">

      <div className="max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">

          <div>

            <p className="text-[9px] font-extrabold uppercase tracking-wider text-[#b88b32]">
              Enquiry Details
            </p>

            <h2 className="mt-1 text-base font-extrabold text-slate-900">
              {name}
            </h2>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>

        </div>


        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-5">

          <div className="grid gap-3 sm:grid-cols-2">

            <DetailItem
              label="Name"
              value={name}
            />

            <DetailItem
              label="Email"
              value={email}
            />

            <DetailItem
              label="Phone"
              value={phone}
            />

            <DetailItem
              label="Source"
              value={formatSource(
                lead?.source
              )}
            />

            <DetailItem
              label="Project"
              value={
                lead?.projectName ||
                lead?.project?.name ||
                "—"
              }
            />

            <DetailItem
              label="Property"
              value={
                lead?.propertyName ||
                lead?.property?.name ||
                "—"
              }
            />

            <DetailItem
              label="Created"
              value={formatDate(
                lead?.createdAt ||
                  lead?.created_at ||
                  lead?.date
              )}
            />


            <div>

              <p className="mb-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Status
              </p>

              <div className="relative">

                <select
                  value={currentStatus}
                  disabled={
                    updatingId ===
                    lead?._id
                  }
                  onChange={(event) =>
                    onStatusChange(
                      lead,
                      event.target.value
                    )
                  }
                  className={`
                    h-9
                    w-full
                    appearance-none
                    rounded-lg
                    border
                    pl-3
                    pr-8
                    text-xs
                    font-bold
                    outline-none
                    ${getStatusClasses(
                      currentStatus
                    )}
                  `}
                >
                  {statusOptions
                    .filter(
                      (item) =>
                        item.value
                    )
                    .map((item) => (
                      <option
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </option>
                    ))}
                </select>

                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                />

              </div>

            </div>

          </div>


          {lead?.message && (
            <div className="mt-5">

              <p className="mb-2 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                Message
              </p>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

                <p className="whitespace-pre-wrap text-xs leading-5 text-slate-600">
                  {lead.message}
                </p>

              </div>

            </div>
          )}


          {(lead?.budget ||
            lead?.location ||
            lead?.propertyType) && (
            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              {lead?.budget && (
                <DetailItem
                  label="Budget"
                  value={lead.budget}
                />
              )}

              {lead?.location && (
                <DetailItem
                  label="Location"
                  value={lead.location}
                />
              )}

              {lead?.propertyType && (
                <DetailItem
                  label="Property Type"
                  value={formatStatus(
                    lead.propertyType
                  )}
                />
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| DETAIL ITEM
|--------------------------------------------------------------------------
*/

function DetailItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

      <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-bold text-slate-700">
        {value || "—"}
      </p>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| DELETE ENQUIRY MODAL
|--------------------------------------------------------------------------
*/

function DeleteModal({
  lead,
  deleting,
  onCancel,
  onConfirm,
}) {
  const name =
    lead?.name ||
    lead?.fullName ||
    "this enquiry";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4">

      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
          <Trash2 size={17} />
        </div>

        <h2 className="mt-4 text-base font-extrabold text-slate-900">
          Delete Enquiry?
        </h2>

        <p className="mt-2 text-xs leading-5 text-slate-500">

          Are you sure you want to delete{" "}

          <span className="font-bold text-slate-700">
            {name}
          </span>

          ? This action cannot be undone.

        </p>


        <div className="mt-5 flex gap-2">

          <button
            type="button"
            onClick={onCancel}
            disabled={deleting}
            className="
              h-10
              flex-1
              rounded-xl
              border
              border-slate-200
              bg-white
              text-xs
              font-bold
              text-slate-600
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            Cancel
          </button>


          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="
              h-10
              flex-1
              rounded-xl
              bg-red-500
              text-xs
              font-bold
              text-white
              transition
              hover:bg-red-600
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {deleting
              ? "Deleting..."
              : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| LOADING
|--------------------------------------------------------------------------
*/

function LoadingState() {
  return (
    <div className="p-10">

      <div className="flex flex-col items-center justify-center">

        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-[#b88b32]" />

        <p className="mt-3 text-xs font-semibold text-slate-400">
          Loading enquiries...
        </p>

      </div>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| EMPTY
|--------------------------------------------------------------------------
*/

function EmptyState({
  hasFilters,
  onReset,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-14 text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <UserRound size={20} />
      </div>

      <h3 className="mt-4 text-sm font-extrabold text-slate-800">
        No enquiries found
      </h3>

      <p className="mt-1 max-w-sm text-[11px] leading-5 text-slate-400">
        {hasFilters
          ? "No enquiries match your current filters."
          : "There are no enquiries available yet."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onReset}
          className="
            mt-4
            h-9
            rounded-lg
            bg-slate-950
            px-4
            text-xs
            font-bold
            text-white
            transition
            hover:bg-slate-800
          "
        >
          Clear Filters
        </button>
      )}

    </div>
  );
}

export default AdminLeads;


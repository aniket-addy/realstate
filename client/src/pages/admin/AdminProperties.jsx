import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Edit3,
  Eye,
  Filter,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

function AdminProperties() {
  const navigate = useNavigate();

  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [deleteId, setDeleteId] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | FETCH PROPERTIES
  |--------------------------------------------------------------------------
  */

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/properties");

      const data = response.data;

      /*
       * Supports:
       * response.data
       * response.data.properties
       * response.data.results
       */

      const list =
        Array.isArray(data)
          ? data
          : data?.properties ||
            data?.results ||
            data?.data ||
            [];

      setProperties(list);
    } catch (err) {
      console.error(
        "Fetch properties error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | DELETE PROPERTY
  |--------------------------------------------------------------------------
  */

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleting(true);

      await api.delete(
        `/properties/${deleteId}`
      );

      setProperties((current) =>
        current.filter(
          (property) =>
            property._id !== deleteId &&
            property.id !== deleteId
        )
      );

      setDeleteId(null);
    } catch (err) {
      console.error(
        "Delete property error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to delete property."
      );
    } finally {
      setDeleting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | FILTER
  |--------------------------------------------------------------------------
  */

  const filteredProperties = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return properties.filter(
      (property) => {
        const name =
          property.name ||
          property.title ||
          "";

        const location =
          property.location ||
          property.city ||
          "";

        const status =
          property.status ||
          "";

        const type =
          property.propertyType ||
          property.type ||
          "";

        const matchesSearch =
          !query ||
          name
            .toLowerCase()
            .includes(query) ||
          location
            .toLowerCase()
            .includes(query);

        const matchesStatus =
          statusFilter === "all" ||
          status.toLowerCase() ===
            statusFilter.toLowerCase();

        const matchesType =
          typeFilter === "all" ||
          type.toLowerCase() ===
            typeFilter.toLowerCase();

        return (
          matchesSearch &&
          matchesStatus &&
          matchesType
        );
      }
    );
  }, [
    properties,
    search,
    statusFilter,
    typeFilter,
  ]);

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  const getId = (property) =>
    property._id || property.id;

  const getName = (property) =>
    property.name ||
    property.title ||
    "Untitled Property";

  const getLocation = (property) =>
    property.location ||
    property.city ||
    "Location not available";

  const getType = (property) =>
    property.propertyType ||
    property.type ||
    "Property";

  const getStatus = (property) =>
    property.status || "active";

  const getPrice = (property) => {
    if (property.priceLabel) {
      return property.priceLabel;
    }

    if (
      property.price !== undefined &&
      property.price !== null &&
      property.price !== ""
    ) {
      return `₹${Number(
        property.price
      ).toLocaleString("en-IN")}`;
    }

    return "Price on request";
  };

  const getImage = (property) => {
    if (
      Array.isArray(property.images) &&
      property.images.length > 0
    ) {
      const first =
        property.images[0];

      if (
        typeof first === "string"
      ) {
        return first;
      }

      return (
        first?.url ||
        first?.secure_url ||
        ""
      );
    }

    return (
      property.image ||
      property.thumbnail ||
      ""
    );
  };

  /*
  |--------------------------------------------------------------------------
  | STATUS UI
  |--------------------------------------------------------------------------
  */

  const statusClasses = (status) => {
    switch (
      status?.toLowerCase()
    ) {
      case "active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "upcoming":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "sold-out":
      case "soldout":
        return "bg-red-50 text-red-700 border-red-200";

      case "inactive":
        return "bg-slate-100 text-slate-600 border-slate-200";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
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
                text-slate-600
                transition
                hover:bg-slate-50
              "
            >
              <ArrowRight
                size={15}
                className="rotate-180"
              />
            </Link>

            <div className="min-w-0">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#b88b32]">
                Admin Panel
              </p>

              <h1 className="truncate text-lg font-extrabold tracking-tight text-slate-950">
                Properties
              </h1>
            </div>
          </div>

          <Link
            to="/admin/add-property"
            className="
              inline-flex
              h-9
              items-center
              gap-2
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
            <Plus size={14} />

            <span className="hidden sm:inline">
              Add Property
            </span>
          </Link>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* =================================================
            TITLE
        ================================================== */}

        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f0e2] text-[#b88b32]">
              <Building2 size={18} />
            </div>

            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-slate-950">
                All Properties
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Manage all residential,
                commercial and plot properties.
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs font-semibold text-red-600">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="text-red-400 hover:text-red-600"
            >
              <XCircle size={16} />
            </button>
          </div>
        )}

        {/* =================================================
            FILTER BAR
        ================================================== */}

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
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
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search property or location..."
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-9
                  pr-3
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
            </div>

            {/* STATUS */}

            <div className="relative">
              <Filter
                size={14}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="
                  h-10
                  w-full
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  pl-9
                  text-xs
                  font-semibold
                  text-slate-700
                  outline-none
                  transition
                  focus:border-[#d6a84f]
                  focus:ring-4
                  focus:ring-[#d6a84f]/10
                "
              >
                <option value="all">
                  All Status
                </option>

                <option value="active">
                  Active
                </option>

                <option value="upcoming">
                  Upcoming
                </option>

                <option value="sold-out">
                  Sold Out
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>
            </div>

            {/* TYPE */}

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(
                  event.target.value
                )
              }
              className="
                h-10
                w-full
                rounded-xl
                border
                border-slate-200
                bg-white
                px-3
                text-xs
                font-semibold
                text-slate-700
                outline-none
                transition
                focus:border-[#d6a84f]
                focus:ring-4
                focus:ring-[#d6a84f]/10
              "
            >
              <option value="all">
                All Property Types
              </option>

              <option value="residential">
                Residential
              </option>

              <option value="commercial">
                Commercial
              </option>

              <option value="plot">
                Plot
              </option>

              <option value="villa">
                Villa
              </option>
            </select>

            {/* COUNT */}

            <div className="flex h-10 items-center justify-center rounded-xl bg-slate-50 px-4 text-xs font-bold text-slate-500">
              {filteredProperties.length}{" "}
              Properties
            </div>
          </div>
        </section>

        {/* =================================================
            CONTENT
        ================================================== */}

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({
              length: 8,
            }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <div className="aspect-[4/3] animate-pulse bg-slate-100" />

                <div className="space-y-3 p-4">
                  <div className="h-4 animate-pulse rounded bg-slate-100" />

                  <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />

                  <div className="h-8 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProperties.length ===
          0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
              <Building2 size={22} />
            </div>

            <h3 className="mt-4 text-sm font-extrabold text-slate-800">
              No properties found
            </h3>

            <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-400">
              Try changing your search or filters,
              or add a new property.
            </p>

            <Link
              to="/admin/add-property"
              className="
                mt-5
                inline-flex
                h-9
                items-center
                gap-2
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
              <Plus size={14} />

              Add Property
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProperties.map(
              (property) => {
                const id =
                  getId(property);

                const image =
                  getImage(
                    property
                  );

                const status =
                  getStatus(
                    property
                  );

                return (
                  <article
                    key={id}
                    className="
                      group
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      shadow-sm
                      transition
                      hover:-translate-y-0.5
                      hover:shadow-md
                    "
                  >
                    {/* IMAGE */}

                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {image ? (
                        <img
                          src={image}
                          alt={getName(
                            property
                          )}
                          className="
                            h-full
                            w-full
                            object-cover
                            transition
                            duration-500
                            group-hover:scale-105
                          "
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <Building2
                            size={34}
                          />
                        </div>
                      )}

                      {/* STATUS */}

                      <span
                        className={`
                          absolute
                          left-3
                          top-3
                          rounded-lg
                          border
                          px-2
                          py-1
                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-wide
                          ${statusClasses(
                            status
                          )}
                        `}
                      >
                        {status}
                      </span>

                      {/* FEATURED */}

                      {property.featured && (
                        <span className="absolute right-3 top-3 rounded-lg bg-[#b88b32] px-2 py-1 text-[9px] font-extrabold uppercase tracking-wide text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* BODY */}

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-extrabold text-slate-900">
                            {getName(
                              property
                            )}
                          </h3>

                          <p className="mt-1 truncate text-[10px] font-medium text-slate-400">
                            {getLocation(
                              property
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                            Price
                          </p>

                          <p className="mt-0.5 text-xs font-extrabold text-slate-800">
                            {getPrice(
                              property
                            )}
                          </p>
                        </div>

                        <span className="rounded-lg bg-slate-50 px-2 py-1 text-[9px] font-bold capitalize text-slate-500">
                          {getType(
                            property
                          )}
                        </span>
                      </div>

                      {/* ACTIONS */}

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/projects/${id}`
                            )
                          }
                          className="
                            flex
                            h-8
                            items-center
                            justify-center
                            gap-1
                            rounded-lg
                            border
                            border-slate-200
                            text-[10px]
                            font-bold
                            text-slate-600
                            transition
                            hover:bg-slate-50
                          "
                        >
                          <Eye size={12} />

                          View
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/edit-property/${id}`
                            )
                          }
                          className="
                            flex
                            h-8
                            items-center
                            justify-center
                            gap-1
                            rounded-lg
                            bg-slate-950
                            text-[10px]
                            font-bold
                            text-white
                            transition
                            hover:bg-slate-800
                          "
                        >
                          <Edit3
                            size={12}
                          />

                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setDeleteId(
                              id
                            )
                          }
                          className="
                            flex
                            h-8
                            items-center
                            justify-center
                            gap-1
                            rounded-lg
                            border
                            border-red-100
                            text-[10px]
                            font-bold
                            text-red-500
                            transition
                            hover:bg-red-50
                          "
                        >
                          <Trash2
                            size={12}
                          />

                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}
      </main>

      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <Trash2 size={19} />
            </div>

            <h3 className="mt-4 text-base font-extrabold text-slate-900">
              Delete Property?
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              This action cannot be undone. The
              property will be permanently removed.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteId(null)
                }
                className="
                  h-9
                  rounded-lg
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
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={
                  handleDelete
                }
                className="
                  h-9
                  rounded-lg
                  bg-red-500
                  px-4
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-red-600
                  disabled:opacity-60
                "
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Property"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProperties;
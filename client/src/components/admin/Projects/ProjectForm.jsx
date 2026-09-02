import {
  Building2,
  ChevronDown,
  FileText,
  IndianRupee,
  MapPin,
  Plus,
  Save,
  Tag,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";

const DEFAULT_FORM = {
  projectName: "",
  projectCategory: "Authority Project",
  projectType: "Residential",
  location: "",
  city: "",
  state: "",
  price: "",
  priceUnit: "Lakh",
  bhkType: "",
  propertyType: "",
  status: "Upcoming",
  possession: "",
  developer: "",
  projectSize: "",
  reraNumber: "",
  description: "",
  highlights: [""],
};

const PROJECT_CATEGORIES = [
  "Authority Project",
  "Builder Project",
];

const PROJECT_TYPES = [
  "Residential",
  "Commercial",
  "Plot",
  "Villa",
  "Mixed Use",
];

const STATUS_OPTIONS = [
  "Upcoming",
  "Active",
  "Ready to Move",
  "Sold Out",
  "Completed",
  "Draft",
];

const PRICE_UNITS = [
  "Lakh",
  "Crore",
  "₹ / Sq. Ft.",
  "On Request",
];

function ProjectForm({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
  submitLabel,
}) {
  const [formData, setFormData] =
    useState(DEFAULT_FORM);

  const [errors, setErrors] =
    useState({});

  // =========================================================
  // LOAD EDIT DATA
  // =========================================================

  useEffect(() => {
    if (!initialData) {
      setFormData(DEFAULT_FORM);
      return;
    }

    setFormData({
      ...DEFAULT_FORM,
      ...initialData,
      highlights:
        Array.isArray(initialData.highlights) &&
        initialData.highlights.length > 0
          ? initialData.highlights
          : [""],
    });
  }, [initialData]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // =========================================================
  // HIGHLIGHTS
  // =========================================================

  const handleHighlightChange = (
    index,
    value
  ) => {
    setFormData((previous) => {
      const highlights = [
        ...previous.highlights,
      ];

      highlights[index] = value;

      return {
        ...previous,
        highlights,
      };
    });
  };

  const addHighlight = () => {
    setFormData((previous) => ({
      ...previous,
      highlights: [
        ...previous.highlights,
        "",
      ],
    }));
  };

  const removeHighlight = (index) => {
    setFormData((previous) => {
      const highlights =
        previous.highlights.filter(
          (_, itemIndex) =>
            itemIndex !== index
        );

      return {
        ...previous,
        highlights:
          highlights.length > 0
            ? highlights
            : [""],
      };
    });
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    const newErrors = {};

    if (!formData.projectName.trim()) {
      newErrors.projectName =
        "Project name is required.";
    }

    if (!formData.location.trim()) {
      newErrors.location =
        "Location is required.";
    }

    if (!formData.city.trim()) {
      newErrors.city =
        "City is required.";
    }

    if (!formData.state.trim()) {
      newErrors.state =
        "State is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description =
        "Project description is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const cleanedData = {
      ...formData,

      projectName:
        formData.projectName.trim(),

      location:
        formData.location.trim(),

      city:
        formData.city.trim(),

      state:
        formData.state.trim(),

      developer:
        formData.developer.trim(),

      possession:
        formData.possession.trim(),

      projectSize:
        formData.projectSize.trim(),

      reraNumber:
        formData.reraNumber.trim(),

      description:
        formData.description.trim(),

      highlights:
        formData.highlights
          .map((item) => item.trim())
          .filter(Boolean),
    };

    if (onSubmit) {
      onSubmit(cleanedData);
    }
  };

  // =========================================================
  // INPUT CLASS
  // =========================================================

  const inputClass = (field) => `
    mt-1.5
    h-11
    w-full
    rounded-xl
    border
    bg-white
    px-3.5
    text-sm
    font-medium
    text-slate-800
    outline-none
    transition
    placeholder:text-slate-400
    ${
      errors[field]
        ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-slate-200 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/10"
    }
  `;

  const selectClass = `
    mt-1.5
    h-11
    w-full
    appearance-none
    rounded-xl
    border
    border-slate-200
    bg-white
    px-3.5
    pr-10
    text-sm
    font-medium
    text-slate-800
    outline-none
    transition
    focus:border-[#d6a84f]
    focus:ring-2
    focus:ring-[#d6a84f]/10
  `;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =====================================================
          BASIC INFORMATION
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-slate-200
            px-5
            py-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-[#f7f0e2]
              text-[#b88b32]
            "
          >
            <Building2 size={17} />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-950">
              Basic Information
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Add the main project details
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2">
          {/* PROJECT NAME */}

          <div className="md:col-span-2">
            <label
              htmlFor="projectName"
              className="text-xs font-bold text-slate-700"
            >
              Project Name
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="projectName"
              name="projectName"
              type="text"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              className={inputClass(
                "projectName"
              )}
            />

            {errors.projectName && (
              <p className="mt-1.5 text-[11px] font-medium text-red-500">
                {errors.projectName}
              </p>
            )}
          </div>

          {/* CATEGORY */}

          <div>
            <label
              htmlFor="projectCategory"
              className="text-xs font-bold text-slate-700"
            >
              Project Category
            </label>

            <div className="relative">
              <select
                id="projectCategory"
                name="projectCategory"
                value={
                  formData.projectCategory
                }
                onChange={handleChange}
                className={selectClass}
              >
                {PROJECT_CATEGORIES.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  mt-1
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>
          </div>

          {/* PROJECT TYPE */}

          <div>
            <label
              htmlFor="projectType"
              className="text-xs font-bold text-slate-700"
            >
              Project Type
            </label>

            <div className="relative">
              <select
                id="projectType"
                name="projectType"
                value={
                  formData.projectType
                }
                onChange={handleChange}
                className={selectClass}
              >
                {PROJECT_TYPES.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  mt-1
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>
          </div>

          {/* DEVELOPER */}

          <div>
            <label
              htmlFor="developer"
              className="text-xs font-bold text-slate-700"
            >
              Developer / Authority
            </label>

            <input
              id="developer"
              name="developer"
              type="text"
              value={formData.developer}
              onChange={handleChange}
              placeholder="e.g. YEIDA / ABC Developers"
              className={inputClass(
                "developer"
              )}
            />
          </div>

          {/* STATUS */}

          <div>
            <label
              htmlFor="status"
              className="text-xs font-bold text-slate-700"
            >
              Project Status
            </label>

            <div className="relative">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={selectClass}
              >
                {STATUS_OPTIONS.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  mt-1
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          LOCATION & PRICING
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-slate-200
            px-5
            py-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-[#f7f0e2]
              text-[#b88b32]
            "
          >
            <MapPin size={17} />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-950">
              Location & Pricing
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Add location and price information
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2">
          {/* LOCATION */}

          <div className="md:col-span-2">
            <label
              htmlFor="location"
              className="text-xs font-bold text-slate-700"
            >
              Location
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Yamuna Expressway"
              className={inputClass(
                "location"
              )}
            />

            {errors.location && (
              <p className="mt-1.5 text-[11px] font-medium text-red-500">
                {errors.location}
              </p>
            )}
          </div>

          {/* CITY */}

          <div>
            <label
              htmlFor="city"
              className="text-xs font-bold text-slate-700"
            >
              City
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className={inputClass("city")}
            />

            {errors.city && (
              <p className="mt-1.5 text-[11px] font-medium text-red-500">
                {errors.city}
              </p>
            )}
          </div>

          {/* STATE */}

          <div>
            <label
              htmlFor="state"
              className="text-xs font-bold text-slate-700"
            >
              State
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className={inputClass("state")}
            />

            {errors.state && (
              <p className="mt-1.5 text-[11px] font-medium text-red-500">
                {errors.state}
              </p>
            )}
          </div>

          {/* PRICE */}

          <div>
            <label
              htmlFor="price"
              className="text-xs font-bold text-slate-700"
            >
              Starting Price
            </label>

            <div className="relative">
              <IndianRupee
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
                id="price"
                name="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 45"
                className="
                  mt-1.5
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-9
                  pr-3
                  text-sm
                  font-medium
                  text-slate-800
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#d6a84f]
                  focus:ring-2
                  focus:ring-[#d6a84f]/10
                "
              />
            </div>
          </div>

          {/* PRICE UNIT */}

          <div>
            <label
              htmlFor="priceUnit"
              className="text-xs font-bold text-slate-700"
            >
              Price Unit
            </label>

            <div className="relative">
              <select
                id="priceUnit"
                name="priceUnit"
                value={formData.priceUnit}
                onChange={handleChange}
                className={selectClass}
              >
                {PRICE_UNITS.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={15}
                className="
                  pointer-events-none
                  absolute
                  right-3
                  top-1/2
                  mt-1
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PROJECT DETAILS
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-slate-200
            px-5
            py-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-[#f7f0e2]
              text-[#b88b32]
            "
          >
            <Tag size={17} />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-950">
              Project Details
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Add configuration and project-specific details
            </p>
          </div>
        </div>

        <div className="grid gap-5 p-5 md:grid-cols-2">
          {/* BHK */}

          <div>
            <label
              htmlFor="bhkType"
              className="text-xs font-bold text-slate-700"
            >
              Configuration
            </label>

            <input
              id="bhkType"
              name="bhkType"
              type="text"
              value={formData.bhkType}
              onChange={handleChange}
              placeholder="e.g. 2 BHK, 3 BHK, 4 BHK"
              className={inputClass(
                "bhkType"
              )}
            />
          </div>

          {/* PROPERTY TYPE */}

          <div>
            <label
              htmlFor="propertyType"
              className="text-xs font-bold text-slate-700"
            >
              Property Type
            </label>

            <input
              id="propertyType"
              name="propertyType"
              type="text"
              value={formData.propertyType}
              onChange={handleChange}
              placeholder="e.g. Apartment / Plot / Villa"
              className={inputClass(
                "propertyType"
              )}
            />
          </div>

          {/* POSSESSION */}

          <div>
            <label
              htmlFor="possession"
              className="text-xs font-bold text-slate-700"
            >
              Possession
            </label>

            <input
              id="possession"
              name="possession"
              type="text"
              value={formData.possession}
              onChange={handleChange}
              placeholder="e.g. Dec 2028"
              className={inputClass(
                "possession"
              )}
            />
          </div>

          {/* PROJECT SIZE */}

          <div>
            <label
              htmlFor="projectSize"
              className="text-xs font-bold text-slate-700"
            >
              Project Size
            </label>

            <input
              id="projectSize"
              name="projectSize"
              type="text"
              value={formData.projectSize}
              onChange={handleChange}
              placeholder="e.g. 25 Acres"
              className={inputClass(
                "projectSize"
              )}
            />
          </div>

          {/* RERA */}

          <div className="md:col-span-2">
            <label
              htmlFor="reraNumber"
              className="text-xs font-bold text-slate-700"
            >
              RERA / Authority Number
            </label>

            <input
              id="reraNumber"
              name="reraNumber"
              type="text"
              value={formData.reraNumber}
              onChange={handleChange}
              placeholder="Enter registration / authority number"
              className={inputClass(
                "reraNumber"
              )}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          DESCRIPTION
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-slate-200
            px-5
            py-4
          "
        >
          <div
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-[#f7f0e2]
              text-[#b88b32]
            "
          >
            <FileText size={17} />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-950">
              Project Description
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Write a detailed overview of the project
            </p>
          </div>
        </div>

        <div className="p-5">
          <label
            htmlFor="description"
            className="text-xs font-bold text-slate-700"
          >
            Description
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <textarea
            id="description"
            name="description"
            rows={7}
            value={formData.description}
            onChange={handleChange}
            placeholder="Write project description..."
            className={`
              mt-1.5
              min-h-[170px]
              w-full
              resize-y
              rounded-xl
              border
              bg-white
              p-3.5
              text-sm
              font-medium
              leading-6
              text-slate-800
              outline-none
              transition
              placeholder:text-slate-400
              ${
                errors.description
                  ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/10"
              }
            `}
          />

          {errors.description && (
            <p className="mt-1.5 text-[11px] font-medium text-red-500">
              {errors.description}
            </p>
          )}
        </div>
      </section>

      {/* =====================================================
          PROJECT HIGHLIGHTS
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-slate-200
            px-5
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2 className="text-sm font-extrabold text-slate-950">
              Project Highlights
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Add important selling points of the project
            </p>
          </div>

          <button
            type="button"
            onClick={addHighlight}
            className="
              inline-flex
              w-fit
              items-center
              gap-1.5
              rounded-lg
              border
              border-[#d6a84f]/40
              bg-[#f7f0e2]
              px-3
              py-2
              text-[11px]
              font-bold
              text-[#9a7428]
              transition
              hover:bg-[#f1e6ce]
            "
          >
            <Plus size={14} />

            Add Highlight
          </button>
        </div>

        <div className="space-y-3 p-5">
          {formData.highlights.map(
            (highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-slate-100
                    text-xs
                    font-bold
                    text-slate-500
                  "
                >
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </div>

                <input
                  type="text"
                  value={highlight}
                  onChange={(e) =>
                    handleHighlightChange(
                      index,
                      e.target.value
                    )
                  }
                  placeholder="e.g. Prime location near Yamuna Expressway"
                  className="
                    h-11
                    min-w-0
                    flex-1
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-3.5
                    text-sm
                    font-medium
                    text-slate-800
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-[#d6a84f]
                    focus:ring-2
                    focus:ring-[#d6a84f]/10
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    removeHighlight(index)
                  }
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-200
                    text-slate-400
                    transition
                    hover:border-red-200
                    hover:bg-red-50
                    hover:text-red-500
                  "
                  title="Remove highlight"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          ACTIONS
      ====================================================== */}

      <div
        className="
          sticky
          bottom-0
          z-10
          flex
          flex-col-reverse
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white/95
          p-3
          shadow-lg
          backdrop-blur
          sm:flex-row
          sm:justify-end
        "
      >
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              inline-flex
              h-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              text-xs
              font-bold
              text-slate-600
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-slate-950
            px-6
            text-xs
            font-bold
            text-white
            shadow-sm
            transition
            hover:bg-slate-800
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? (
            <>
              <span
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                "
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={15} />

              {submitLabel ||
                (initialData
                  ? "Update Project"
                  : "Save Project")}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
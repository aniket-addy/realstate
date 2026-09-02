import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Check,
  CheckCircle2,
  ImagePlus,
  MapPin,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useProjects from "../../hooks/useProjects";

/*
|--------------------------------------------------------------------------
| DEFAULT FORM
|--------------------------------------------------------------------------
*/

const initialForm = {
  name: "",
  category: "builder",
  propertyType: "residential",
  status: "active",

  location: "",
  city: "",
  state: "",
  address: "",

  description: "",

  price: "",
  priceLabel: "",

  area: "",
  areaUnit: "sq.ft",

  bedrooms: "",
  bathrooms: "",
  floors: "",

  builderName: "",
  authorityName: "",

  possessionDate: "",
  launchDate: "",

  reraNumber: "",

  featured: false,

  amenities: [],
  highlights: [],

  images: [],
};

/*
|--------------------------------------------------------------------------
| OPTIONS
|--------------------------------------------------------------------------
*/

const propertyTypes = [
  {
    value: "residential",
    label: "Residential",
  },
  {
    value: "commercial",
    label: "Commercial",
  },
  {
    value: "plot",
    label: "Plot",
  },
  {
    value: "villa",
    label: "Villa",
  },
];

const categories = [
  {
    value: "authority",
    label: "Authority Project",
  },
  {
    value: "builder",
    label: "Builder Project",
  },
];

const statuses = [
  {
    value: "active",
    label: "Active",
  },
  {
    value: "upcoming",
    label: "Upcoming",
  },
  {
    value: "sold-out",
    label: "Sold Out",
  },
  {
    value: "inactive",
    label: "Inactive",
  },
];

const amenityOptions = [
  "Club House",
  "Swimming Pool",
  "Gym",
  "Park",
  "Security",
  "Parking",
  "CCTV",
  "Power Backup",
  "Lift",
  "Kids Play Area",
  "Jogging Track",
  "Community Hall",
];

/*
|--------------------------------------------------------------------------
| REUSABLE TAILWIND CLASSES
|--------------------------------------------------------------------------
*/

const inputClasses = `
  h-11
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
  placeholder:text-slate-400
  hover:border-slate-300
  focus:border-[#d6a84f]
  focus:ring-4
  focus:ring-[#d6a84f]/10
`;

const textareaClasses = `
  min-h-[130px]
  w-full
  resize-y
  rounded-xl
  border
  border-slate-200
  bg-white
  px-3
  py-3
  text-xs
  font-semibold
  leading-5
  text-slate-700
  outline-none
  transition
  placeholder:text-slate-400
  hover:border-slate-300
  focus:border-[#d6a84f]
  focus:ring-4
  focus:ring-[#d6a84f]/10
`;

/*
|--------------------------------------------------------------------------
| COMPONENT
|--------------------------------------------------------------------------
*/

function AddNewProperty() {
  const navigate = useNavigate();

  const {
    addProject,
    loading,
    error,
  } = useProjects({
    autoFetch: false,
  });

  const [form, setForm] = useState(
    initialForm
  );

  const [imagePreviews, setImagePreviews] =
    useState([]);

  const [newHighlight, setNewHighlight] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | AMENITIES
  |--------------------------------------------------------------------------
  */

  const toggleAmenity = (amenity) => {
    setForm((current) => {
      const exists =
        current.amenities.includes(
          amenity
        );

      return {
        ...current,

        amenities: exists
          ? current.amenities.filter(
              (item) =>
                item !== amenity
            )
          : [
              ...current.amenities,
              amenity,
            ],
      };
    });
  };

  /*
  |--------------------------------------------------------------------------
  | HIGHLIGHTS
  |--------------------------------------------------------------------------
  */

  const addHighlight = () => {
    const value =
      newHighlight.trim();

    if (!value) return;

    setForm((current) => ({
      ...current,

      highlights: [
        ...current.highlights,
        value,
      ],
    }));

    setNewHighlight("");
  };

  const removeHighlight = (index) => {
    setForm((current) => ({
      ...current,

      highlights:
        current.highlights.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | IMAGE UPLOAD
  |--------------------------------------------------------------------------
  */

  const handleImages = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const previews = files.map(
      (file) => ({
        file,
        url: URL.createObjectURL(file),
      })
    );

    setImagePreviews((current) => [
      ...current,
      ...previews,
    ]);

    setForm((current) => ({
      ...current,

      images: [
        ...current.images,
        ...files,
      ],
    }));

    event.target.value = "";
  };

  const removeImage = (index) => {
    setImagePreviews((current) => {
      const image = current[index];

      if (image?.url) {
        URL.revokeObjectURL(
          image.url
        );
      }

      return current.filter(
        (_, itemIndex) =>
          itemIndex !== index
      );
    });

    setForm((current) => ({
      ...current,

      images: current.images.filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | VALIDATION
  |--------------------------------------------------------------------------
  */

  const validateForm = () => {
    if (!form.name.trim()) {
      return "Project name is required.";
    }

    if (!form.category) {
      return "Project category is required.";
    }

    if (!form.propertyType) {
      return "Property type is required.";
    }

    if (!form.location.trim()) {
      return "Location is required.";
    }

    if (!form.city.trim()) {
      return "City is required.";
    }

    return "";
  };

  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setSubmitError("");
    setSuccess(false);

    const validationError =
      validateForm();

    if (validationError) {
      setSubmitError(
        validationError
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      const projectData = {
        ...form,

        name: form.name.trim(),

        location:
          form.location.trim(),

        city:
          form.city.trim(),

        state:
          form.state.trim(),

        address:
          form.address.trim(),

        description:
          form.description.trim(),

        price: form.price
          ? Number(form.price)
          : "",

        area: form.area
          ? Number(form.area)
          : "",

        bedrooms: form.bedrooms
          ? Number(form.bedrooms)
          : "",

        bathrooms: form.bathrooms
          ? Number(form.bathrooms)
          : "",

        floors: form.floors
          ? Number(form.floors)
          : "",
      };

      await addProject(
        projectData
      );

      setSuccess(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        navigate(
          "/admin/projects"
        );
      }, 900);
    } catch (err) {
      console.error(
        "Create project error:",
        err
      );

      setSubmitError(
        err?.response?.data
          ?.message ||
          err?.message ||
          error ||
          "Unable to create project. Please try again."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | RESET
  |--------------------------------------------------------------------------
  */

  const handleReset = () => {
    imagePreviews.forEach(
      (image) => {
        if (image?.url) {
          URL.revokeObjectURL(
            image.url
          );
        }
      }
    );

    setForm(initialForm);
    setImagePreviews([]);
    setNewHighlight("");
    setSubmitError("");
    setSuccess(false);
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
              to="/admin/projects"
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
              <ArrowLeft size={16} />
            </Link>

            <div className="min-w-0">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-[#b88b32]">
                Admin Panel
              </p>

              <h1 className="truncate text-lg font-extrabold tracking-tight text-slate-950">
                Add New Project
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="
                hidden
                h-9
                rounded-lg
                border
                border-slate-200
                bg-white
                px-4
                text-xs
                font-bold
                text-slate-600
                transition
                hover:bg-slate-50
                sm:block
              "
            >
              Reset
            </button>

            <button
              form="project-form"
              type="submit"
              disabled={loading}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Save size={14} />

              {loading
                ? "Saving..."
                : "Save Project"}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {/* SUCCESS */}

        {success && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700">
            <CheckCircle2 size={16} />

            Project created successfully.
          </div>
        )}

        {/* ERROR */}

        {(submitError || error) && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
            {submitError || error}
          </div>
        )}

        <form
          id="project-form"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* =================================================
              BASIC INFORMATION
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7f0e2] text-[#b88b32]">
                  <Building2 size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Basic Information
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Add the main details of the
                    project.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <Field
                label="Project Name"
                required
              >
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter project name"
                  className={inputClasses}
                />
              </Field>

              <Field
                label="Project Category"
                required
              >
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  {categories.map(
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
              </Field>

              <Field
                label="Property Type"
                required
              >
                <select
                  name="propertyType"
                  value={
                    form.propertyType
                  }
                  onChange={handleChange}
                  className={inputClasses}
                >
                  {propertyTypes.map(
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
              </Field>

              <Field label="Status">
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  {statuses.map(
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
              </Field>

              <Field label="Builder Name">
                <input
                  type="text"
                  name="builderName"
                  value={
                    form.builderName
                  }
                  onChange={handleChange}
                  placeholder="Builder / Developer name"
                  className={inputClasses}
                />
              </Field>

              <Field label="Authority Name">
                <input
                  type="text"
                  name="authorityName"
                  value={
                    form.authorityName
                  }
                  onChange={handleChange}
                  placeholder="YEIDA, DDA, Dholera etc."
                  className={inputClasses}
                />
              </Field>

              <Field label="RERA Number">
                <input
                  type="text"
                  name="reraNumber"
                  value={
                    form.reraNumber
                  }
                  onChange={handleChange}
                  placeholder="Enter RERA number"
                  className={inputClasses}
                />
              </Field>

              <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 transition hover:border-slate-300">
                <input
                  type="checkbox"
                  name="featured"
                  checked={
                    form.featured
                  }
                  onChange={handleChange}
                  className="h-4 w-4 cursor-pointer accent-[#b88b32]"
                />

                <div>
                  <p className="text-xs font-bold text-slate-700">
                    Featured Project
                  </p>

                  <p className="text-[10px] text-slate-400">
                    Show this project in featured
                    sections.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* =================================================
              LOCATION
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f7f0e2] text-[#b88b32]">
                  <MapPin size={17} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Location
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Add the project location details.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <Field
                label="Location"
                required
              >
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Greater Noida West"
                  className={inputClasses}
                />
              </Field>

              <Field
                label="City"
                required
              >
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Greater Noida"
                  className={inputClasses}
                />
              </Field>

              <Field label="State">
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Uttar Pradesh"
                  className={inputClasses}
                />
              </Field>

              <Field label="Full Address">
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Complete project address"
                  className={inputClasses}
                />
              </Field>
            </div>
          </section>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="p-5">
              <Field label="Project Description">
                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write a detailed project description..."
                  className={textareaClasses}
                />
              </Field>
            </div>
          </section>

          {/* =================================================
              PRICE & PROPERTY DETAILS
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                Price & Property Details
              </h2>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
              <Field label="Starting Price">
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="5000000"
                  min="0"
                  className={inputClasses}
                />
              </Field>

              <Field label="Price Label">
                <input
                  type="text"
                  name="priceLabel"
                  value={
                    form.priceLabel
                  }
                  onChange={handleChange}
                  placeholder="₹50 Lakh onwards"
                  className={inputClasses}
                />
              </Field>

              <Field label="Area">
                <input
                  type="number"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                  placeholder="1200"
                  min="0"
                  className={inputClasses}
                />
              </Field>

              <Field label="Area Unit">
                <select
                  name="areaUnit"
                  value={
                    form.areaUnit
                  }
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="sq.ft">
                    Sq. Ft.
                  </option>

                  <option value="sq.yd">
                    Sq. Yd.
                  </option>

                  <option value="sq.m">
                    Sq. M.
                  </option>

                  <option value="acre">
                    Acre
                  </option>
                </select>
              </Field>

              <Field label="Bedrooms">
                <input
                  type="number"
                  name="bedrooms"
                  value={
                    form.bedrooms
                  }
                  onChange={handleChange}
                  placeholder="3"
                  min="0"
                  className={inputClasses}
                />
              </Field>

              <Field label="Bathrooms">
                <input
                  type="number"
                  name="bathrooms"
                  value={
                    form.bathrooms
                  }
                  onChange={handleChange}
                  placeholder="2"
                  min="0"
                  className={inputClasses}
                />
              </Field>

              <Field label="Floors">
                <input
                  type="number"
                  name="floors"
                  value={form.floors}
                  onChange={handleChange}
                  placeholder="12"
                  min="0"
                  className={inputClasses}
                />
              </Field>
            </div>
          </section>

          {/* =================================================
              PROJECT TIMELINE
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                Project Timeline
              </h2>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <Field label="Launch Date">
                <input
                  type="date"
                  name="launchDate"
                  value={
                    form.launchDate
                  }
                  onChange={handleChange}
                  className={inputClasses}
                />
              </Field>

              <Field label="Possession Date">
                <input
                  type="date"
                  name="possessionDate"
                  value={
                    form.possessionDate
                  }
                  onChange={handleChange}
                  className={inputClasses}
                />
              </Field>
            </div>
          </section>

          {/* =================================================
              AMENITIES
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                Amenities
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Select all amenities available in
                the project.
              </p>
            </div>

            <div className="grid gap-2 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {amenityOptions.map(
                (amenity) => {
                  const selected =
                    form.amenities.includes(
                      amenity
                    );

                  return (
                    <button
                      type="button"
                      key={amenity}
                      onClick={() =>
                        toggleAmenity(
                          amenity
                        )
                      }
                      className={`
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        px-3
                        py-2.5
                        text-left
                        text-xs
                        font-semibold
                        transition
                        ${
                          selected
                            ? "border-[#d6a84f] bg-[#f7f0e2] text-[#9a7125]"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex
                          h-5
                          w-5
                          shrink-0
                          items-center
                          justify-center
                          rounded-md
                          border
                          ${
                            selected
                              ? "border-[#b88b32] bg-[#b88b32] text-white"
                              : "border-slate-300 bg-white"
                          }
                        `}
                      >
                        {selected && (
                          <Check size={12} />
                        )}
                      </span>

                      {amenity}
                    </button>
                  );
                }
              )}
            </div>
          </section>

          {/* =================================================
              HIGHLIGHTS
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                Project Highlights
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Add important project selling points.
              </p>
            </div>

            <div className="p-5">
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="text"
                  value={
                    newHighlight
                  }
                  onChange={(event) =>
                    setNewHighlight(
                      event.target.value
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.key ===
                      "Enter"
                    ) {
                      event.preventDefault();
                      addHighlight();
                    }
                  }}
                  placeholder="e.g. 5 minutes from metro"
                  className={inputClasses}
                />

                <button
                  type="button"
                  onClick={
                    addHighlight
                  }
                  className="
                    h-11
                    shrink-0
                    rounded-xl
                    bg-slate-950
                    px-5
                    text-xs
                    font-bold
                    text-white
                    transition
                    hover:bg-slate-800
                  "
                >
                  Add Highlight
                </button>
              </div>

              {form.highlights.length >
                0 && (
                <div className="mt-4 space-y-2">
                  {form.highlights.map(
                    (
                      highlight,
                      index
                    ) => (
                      <div
                        key={`${highlight}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <CheckCircle2
                            size={14}
                            className="shrink-0 text-[#b88b32]"
                          />

                          <span className="truncate text-xs font-medium text-slate-700">
                            {highlight}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeHighlight(
                              index
                            )
                          }
                          className="shrink-0 text-slate-400 transition hover:text-red-500"
                        >
                          <Trash2
                            size={14}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              PROJECT IMAGES
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-extrabold text-slate-900">
                Project Images
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Upload project images for the website
                gallery.
              </p>
            </div>

            <div className="p-5">
              <label
                htmlFor="project-images"
                className="
                  flex
                  min-h-[150px]
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  border-slate-200
                  bg-slate-50
                  px-5
                  text-center
                  transition
                  hover:border-[#d6a84f]
                  hover:bg-[#fffdf8]
                "
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#b88b32] shadow-sm">
                  <ImagePlus size={20} />
                </div>

                <p className="mt-3 text-xs font-bold text-slate-700">
                  Click to upload images
                </p>

                <p className="mt-1 text-[10px] text-slate-400">
                  PNG, JPG or WEBP
                </p>

                <input
                  id="project-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImages}
                  className="hidden"
                />
              </label>

              {imagePreviews.length >
                0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {imagePreviews.map(
                    (
                      image,
                      index
                    ) => (
                      <div
                        key={`${image.url}-${index}`}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
                      >
                        <img
                          src={image.url}
                          alt={`Project ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(
                              index
                            )
                          }
                          className="
                            absolute
                            right-2
                            top-2
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-lg
                            bg-white/95
                            text-red-500
                            opacity-0
                            shadow-sm
                            transition
                            group-hover:opacity-100
                          "
                        >
                          <Trash2
                            size={13}
                          />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              DOCUMENTATION / PAYMENT / TABLE
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-dashed border-[#d6a84f]/50 bg-[#fffdf8]">
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#f7f0e2] text-[#b88b32]">
                  <Upload size={16} />
                </div>

                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">
                    Project Documents &
                    Payment Details
                  </h2>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Payment plan, project table and
                    documentation sections will be
                    connected here.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="flex flex-col-reverse gap-3 pb-8 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/projects"
                )
              }
              className="
                h-11
                rounded-xl
                border
                border-slate-200
                bg-white
                px-6
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
                px-7
                text-xs
                font-bold
                text-white
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Save size={15} />

              {loading
                ? "Saving Project..."
                : "Save Project"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| FIELD COMPONENT
|--------------------------------------------------------------------------
*/

function Field({
  label,
  required = false,
  children,
}) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-slate-500">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

export default AddNewProperty;
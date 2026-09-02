import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Check,
  ImagePlus,
  MapPin,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

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

const emptyForm = {
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

  launchDate: "",
  possessionDate: "",

  reraNumber: "",

  featured: false,

  amenities: [],
  highlights: [],

  paymentPlan: [],
};

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

function AddProject() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState(emptyForm);

  const [images, setImages] =
    useState([]);

  const [newHighlight, setNewHighlight] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
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

  const toggleAmenity = (
    amenity
  ) => {
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

  const removeHighlight = (
    index
  ) => {
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
  | PAYMENT PLAN
  |--------------------------------------------------------------------------
  */

  const addPaymentStage = () => {
    setForm((current) => ({
      ...current,

      paymentPlan: [
        ...current.paymentPlan,

        {
          id: Date.now(),
          stage: "",
          percentage: "",
          amount: "",
          description: "",
        },
      ],
    }));
  };

  const updatePaymentStage = (
    index,
    field,
    value
  ) => {
    setForm((current) => {
      const updated = [
        ...current.paymentPlan,
      ];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...current,
        paymentPlan: updated,
      };
    });
  };

  const removePaymentStage = (
    index
  ) => {
    setForm((current) => ({
      ...current,

      paymentPlan:
        current.paymentPlan.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | IMAGE SELECT
  |--------------------------------------------------------------------------
  */

  const handleImages = (
    event
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const newImages =
      files.map((file) => ({
        id:
          Date.now() +
          Math.random(),

        file,

        preview:
          URL.createObjectURL(
            file
          ),
      }));

    setImages((current) => [
      ...current,
      ...newImages,
    ]);

    event.target.value = "";
  };

  /*
  |--------------------------------------------------------------------------
  | REMOVE IMAGE
  |--------------------------------------------------------------------------
  */

  const removeImage = (
    index
  ) => {
    setImages((current) => {
      const image =
        current[index];

      if (image?.preview) {
        URL.revokeObjectURL(
          image.preview
        );
      }

      return current.filter(
        (_, itemIndex) =>
          itemIndex !== index
      );
    });
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

    setError("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(
        validationError
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    try {
      setSaving(true);

      /*
      |--------------------------------------------------------------------------
      | PROJECT DATA
      |--------------------------------------------------------------------------
      */

      const projectData = {
        name: form.name.trim(),

        category:
          form.category,

        propertyType:
          form.propertyType,

        status:
          form.status,

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

        priceLabel:
          form.priceLabel,

        area: form.area
          ? Number(form.area)
          : "",

        areaUnit:
          form.areaUnit,

        bedrooms:
          form.bedrooms
            ? Number(
                form.bedrooms
              )
            : "",

        bathrooms:
          form.bathrooms
            ? Number(
                form.bathrooms
              )
            : "",

        floors: form.floors
          ? Number(form.floors)
          : "",

        builderName:
          form.builderName.trim(),

        authorityName:
          form.authorityName.trim(),

        launchDate:
          form.launchDate ||
          "",

        possessionDate:
          form.possessionDate ||
          "",

        reraNumber:
          form.reraNumber.trim(),

        featured:
          form.featured,

        amenities:
          form.amenities,

        highlights:
          form.highlights,

        paymentPlan:
          form.paymentPlan,
      };

      /*
      |--------------------------------------------------------------------------
      | CREATE PROJECT
      |--------------------------------------------------------------------------
      */

      const response =
        await api.post(
          "/projects",
          projectData
        );

      const createdProject =
        response.data?.project ||
        response.data?.data ||
        response.data;

      /*
      |--------------------------------------------------------------------------
      | UPLOAD IMAGES
      |--------------------------------------------------------------------------
      |
      | Project create hone ke baad images upload.
      |
      */

      if (
        images.length > 0 &&
        createdProject?._id
      ) {
        const formData =
          new FormData();

        images.forEach(
          (image) => {
            formData.append(
              "images",
              image.file
            );
          }
        );

        await api.post(
          `/projects/${createdProject._id}/images`,
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );
      }

      /*
      |--------------------------------------------------------------------------
      | SUCCESS
      |--------------------------------------------------------------------------
      */

      navigate(
        "/admin/projects"
      );
    } catch (err) {
      console.error(
        "Create project error:",
        err
      );

      setError(
        err?.response?.data
          ?.message ||
          err?.message ||
          "Unable to create project."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setSaving(false);
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
              <ArrowLeft
                size={16}
              />
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

          <button
            form="add-project-form"
            type="submit"
            disabled={saving}
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

            {saving
              ? "Saving..."
              : "Save Project"}
          </button>

        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        <form
          id="add-project-form"
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
                  <Building2
                    size={17}
                  />
                </div>

                <div>

                  <h2 className="text-sm font-extrabold text-slate-900">
                    Basic Information
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Add the main project information.
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
                  name="name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  placeholder="Project name"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Project Category">
                <select
                  name="category"
                  value={
                    form.category
                  }
                  onChange={
                    handleChange
                  }
                  className={
                    inputClasses
                  }
                >
                  {categories.map(
                    (item) => (
                      <option
                        key={
                          item.value
                        }
                        value={
                          item.value
                        }
                      >
                        {item.label}
                      </option>
                    )
                  )}
                </select>
              </Field>

              <Field label="Property Type">
                <select
                  name="propertyType"
                  value={
                    form.propertyType
                  }
                  onChange={
                    handleChange
                  }
                  className={
                    inputClasses
                  }
                >
                  {propertyTypes.map(
                    (item) => (
                      <option
                        key={
                          item.value
                        }
                        value={
                          item.value
                        }
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
                  onChange={
                    handleChange
                  }
                  className={
                    inputClasses
                  }
                >
                  {statuses.map(
                    (item) => (
                      <option
                        key={
                          item.value
                        }
                        value={
                          item.value
                        }
                      >
                        {item.label}
                      </option>
                    )
                  )}
                </select>
              </Field>

              <Field label="Builder Name">
                <input
                  name="builderName"
                  value={
                    form.builderName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Builder / Developer"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Authority Name">
                <input
                  name="authorityName"
                  value={
                    form.authorityName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="YEIDA / DDA / Authority"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="RERA Number">
                <input
                  name="reraNumber"
                  value={
                    form.reraNumber
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="RERA number"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3">

                <input
                  type="checkbox"
                  name="featured"
                  checked={
                    form.featured
                  }
                  onChange={
                    handleChange
                  }
                  className="h-4 w-4 accent-[#b88b32]"
                />

                <div>

                  <p className="text-xs font-bold text-slate-700">
                    Featured Project
                  </p>

                  <p className="text-[10px] text-slate-400">
                    Show this project in featured sections.
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
                    Add project location details.
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
                  name="location"
                  value={
                    form.location
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Greater Noida West"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field
                label="City"
                required
              >
                <input
                  name="city"
                  value={form.city}
                  onChange={
                    handleChange
                  }
                  placeholder="Greater Noida"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="State">
                <input
                  name="state"
                  value={form.state}
                  onChange={
                    handleChange
                  }
                  placeholder="Uttar Pradesh"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Full Address">
                <input
                  name="address"
                  value={
                    form.address
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Complete project address"
                  className={
                    inputClasses
                  }
                />
              </Field>

            </div>

          </section>

          {/* =================================================
              DESCRIPTION
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <Field label="Project Description">

              <textarea
                name="description"
                value={
                  form.description
                }
                onChange={
                  handleChange
                }
                rows={6}
                placeholder="Write complete project description..."
                className={
                  textareaClasses
                }
              />

            </Field>

          </section>

          {/* =================================================
              PRICE & DETAILS
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
                  onChange={
                    handleChange
                  }
                  placeholder="5000000"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Price Label">
                <input
                  name="priceLabel"
                  value={
                    form.priceLabel
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="₹50 Lakh onwards"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Area">
                <input
                  type="number"
                  name="area"
                  value={form.area}
                  onChange={
                    handleChange
                  }
                  placeholder="1200"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Area Unit">
                <select
                  name="areaUnit"
                  value={
                    form.areaUnit
                  }
                  onChange={
                    handleChange
                  }
                  className={
                    inputClasses
                  }
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
                  onChange={
                    handleChange
                  }
                  placeholder="3"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Bathrooms">
                <input
                  type="number"
                  name="bathrooms"
                  value={
                    form.bathrooms
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="2"
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Floors">
                <input
                  type="number"
                  name="floors"
                  value={form.floors}
                  onChange={
                    handleChange
                  }
                  placeholder="25"
                  className={
                    inputClasses
                  }
                />
              </Field>

            </div>

          </section>

          {/* =================================================
              DATES
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="grid gap-5 md:grid-cols-2">

              <Field label="Launch Date">
                <input
                  type="date"
                  name="launchDate"
                  value={
                    form.launchDate
                  }
                  onChange={
                    handleChange
                  }
                  className={
                    inputClasses
                  }
                />
              </Field>

              <Field label="Possession Date">
                <input
                  type="date"
                  name="possessionDate"
                  value={
                    form.possessionDate
                  }
                  onChange={
                    handleChange
                  }
                  className={
                    inputClasses
                  }
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
                          items-center
                          justify-center
                          rounded-md
                          border
                          ${
                            selected
                              ? "border-[#b88b32] bg-[#b88b32] text-white"
                              : "border-slate-300"
                          }
                        `}
                      >
                        {selected && (
                          <Check
                            size={12}
                          />
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

            </div>

            <div className="p-5">

              <div className="flex flex-col gap-2 sm:flex-row">

                <input
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
                  placeholder="e.g. 5 minutes from Metro"
                  className={
                    inputClasses
                  }
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
                  <span className="inline-flex items-center gap-2">
                    <Plus size={14} />
                    Add
                  </span>
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

                        <span className="text-xs font-semibold text-slate-700">
                          {highlight}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            removeHighlight(
                              index
                            )
                          }
                          className="text-slate-400 transition hover:text-red-500"
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
              PAYMENT PLAN
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-sm font-extrabold text-slate-900">
                  Payment Plan
                </h2>

                <p className="mt-1 text-[10px] text-slate-400">
                  Add payment milestones for this project.
                </p>

              </div>

              <button
                type="button"
                onClick={
                  addPaymentStage
                }
                className="
                  inline-flex
                  h-9
                  items-center
                  justify-center
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
                Add Stage
              </button>

            </div>

            <div className="space-y-3 p-5">

              {form.paymentPlan.length ===
                0 && (
                <div className="rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center text-xs text-slate-400">
                  No payment stages added yet.
                </div>
              )}

              {form.paymentPlan.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={
                      item.id ||
                      index
                    }
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >

                    <div className="mb-4 flex items-center justify-between">

                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#b88b32]">
                        Stage{" "}
                        {index + 1}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removePaymentStage(
                            index
                          )
                        }
                        className="text-slate-400 transition hover:text-red-500"
                      >
                        <Trash2
                          size={14}
                        />
                      </button>

                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                      <input
                        value={
                          item.stage
                        }
                        onChange={(
                          event
                        ) =>
                          updatePaymentStage(
                            index,
                            "stage",
                            event.target
                              .value
                          )
                        }
                        placeholder="Booking"
                        className={
                          inputClasses
                        }
                      />

                      <div className="relative">

                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={
                            item.percentage
                          }
                          onChange={(
                            event
                          ) =>
                            updatePaymentStage(
                              index,
                              "percentage",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="10"
                          className={`${inputClasses} pr-8`}
                        />

                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          %
                        </span>

                      </div>

                      <div className="relative">

                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          ₹
                        </span>

                        <input
                          type="number"
                          min="0"
                          value={
                            item.amount
                          }
                          onChange={(
                            event
                          ) =>
                            updatePaymentStage(
                              index,
                              "amount",
                              event
                                .target
                                .value
                            )
                          }
                          placeholder="500000"
                          className={`${inputClasses} pl-7`}
                        />

                      </div>

                      <input
                        value={
                          item.description
                        }
                        onChange={(
                          event
                        ) =>
                          updatePaymentStage(
                            index,
                            "description",
                            event
                              .target
                              .value
                          )
                        }
                        placeholder="Payment description"
                        className={
                          inputClasses
                        }
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

          {/* =================================================
              IMAGES
          ================================================== */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-4">

              <h2 className="text-sm font-extrabold text-slate-900">
                Project Images
              </h2>

              <p className="mt-1 text-[10px] text-slate-400">
                Upload project images.
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
                  text-center
                  transition
                  hover:border-[#d6a84f]
                  hover:bg-[#fffdf8]
                "
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#b88b32] shadow-sm">
                  <ImagePlus
                    size={20}
                  />
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
                  onChange={
                    handleImages
                  }
                  className="hidden"
                />

              </label>

              {images.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                  {images.map(
                    (
                      image,
                      index
                    ) => (
                      <div
                        key={
                          image.id
                        }
                        className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
                      >

                        <img
                          src={
                            image.preview
                          }
                          alt={`Project ${index + 1}`}
                          className="h-full w-full object-cover"
                        />

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
              disabled={saving}
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

              {saving
                ? "Saving..."
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

export default AddProject;
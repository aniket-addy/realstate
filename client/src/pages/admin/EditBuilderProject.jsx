import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  FileText,
  Star,
  Sparkles,
  Upload,
  X,
} from "lucide-react";

import useBuilderProjects from "../../hooks/useBuilderProjects";

function EditBuilderProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    project,
    loading,
    error,
    fetchProject,
    editProject,
  } = useBuilderProjects({
    autoFetch: false,
  });

  const [form, setForm] = useState({
    name: "",
    developer: "",
    description: "",

    projectCategory: "residential",

    authority: "",
    reraNumber: "",

    location: "",
    city: "",
    state: "",

    price: "",
    priceFrom: "",

    totalArea: "",
    possession: "",
    status: "active",

    featured: false,
    newProject: false,
    published: true,

    image: "",
    images: [],

    features: [],
    amenities: [],

    paymentPlans: [],
    documents: [],
  });

  const [featureInput, setFeatureInput] = useState("");
  const [amenityInput, setAmenityInput] = useState("");

  const [saving, setSaving] = useState(false);

  /* ============================================================
     IMAGE STATES
  ============================================================ */

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");

  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);

  /* ============================================================
     FETCH PROJECT
  ============================================================ */

  useEffect(() => {
    if (!id) return;

    fetchProject(id);
  }, [id, fetchProject]);

  /* ============================================================
     LOAD PROJECT INTO FORM
  ============================================================ */

  useEffect(() => {
    if (!project) return;

    setForm({
      name: project.name || "",
      developer: project.developer || "",
      description: project.description || "",

      projectCategory:
        project.projectCategory || "residential",

      authority: project.authority || "",
      reraNumber: project.reraNumber || "",

      location: project.location || "",
      city: project.city || "",
      state: project.state || "",

      price: project.price || "",

      priceFrom:
        project.priceFrom !== undefined &&
        project.priceFrom !== null
          ? project.priceFrom
          : "",

      totalArea: project.totalArea || "",
      possession: project.possession || "",
      status: project.status || "active",

      featured: Boolean(project.featured),
      newProject: Boolean(project.newProject),

      published:
        project.published !== undefined
          ? Boolean(project.published)
          : true,

      image: project.image || "",

      images: Array.isArray(project.images)
        ? project.images
        : [],

      features: Array.isArray(project.features)
        ? project.features
        : [],

      amenities: Array.isArray(project.amenities)
        ? project.amenities
        : [],

      paymentPlans: Array.isArray(
        project.paymentPlans
      )
        ? project.paymentPlans
        : [],

      documents: Array.isArray(
        project.documents
      )
        ? project.documents
        : [],
    });

    /* Existing main image */
    if (project.image) {
      setMainImagePreview(project.image);
    } else {
      setMainImagePreview("");
    }

    /* Existing gallery images are kept in form.images */
    setGalleryImageFiles([]);
    setGalleryImagePreviews([]);
  }, [project]);

  /* ============================================================
     INPUT CHANGE
  ============================================================ */

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* ============================================================
     MAIN IMAGE UPLOAD
  ============================================================ */

  const handleMainImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Main image must be less than 10MB.");
      event.target.value = "";
      return;
    }

    if (
      mainImagePreview &&
      mainImagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(mainImagePreview);
    }

    setMainImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setMainImagePreview(previewUrl);

    event.target.value = "";
  };

  /* ============================================================
     REMOVE MAIN IMAGE
  ============================================================ */

  const removeMainImage = () => {
    if (
      mainImagePreview &&
      mainImagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(mainImagePreview);
    }

    setMainImageFile(null);

    if (form.image) {
      setMainImagePreview(form.image);
    } else {
      setMainImagePreview("");
    }
  };

  /* ============================================================
     GALLERY IMAGE UPLOAD
  ============================================================ */

  const handleGalleryImagesChange = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const invalidFile = files.find(
      (file) =>
        !file.type.startsWith("image/")
    );

    if (invalidFile) {
      alert("Only image files are allowed.");
      event.target.value = "";
      return;
    }

    const largeFile = files.find(
      (file) =>
        file.size > 10 * 1024 * 1024
    );

    if (largeFile) {
      alert(
        "Each gallery image must be less than 10MB."
      );
      event.target.value = "";
      return;
    }

    setGalleryImageFiles((prev) => [
      ...prev,
      ...files,
    ]);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryImagePreviews((prev) => [
      ...prev,
      ...previews,
    ]);

    event.target.value = "";
  };

  /* ============================================================
     REMOVE EXISTING GALLERY IMAGE
  ============================================================ */

  const removeExistingGalleryImage = (
    index
  ) => {
    setForm((prev) => ({
      ...prev,

      images: prev.images.filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* ============================================================
     REMOVE NEW GALLERY IMAGE
  ============================================================ */

  const removeNewGalleryImage = (
    index
  ) => {
    const previewToRemove =
      galleryImagePreviews[index];

    if (
      previewToRemove &&
      previewToRemove.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewToRemove);
    }

    setGalleryImageFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setGalleryImagePreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* ============================================================
     REMOVE GALLERY IMAGE (combined index — existing + new)
  ============================================================ */

  const removeGalleryImage = (index) => {
    const existingCount = form.images.length;

    if (index < existingCount) {
      removeExistingGalleryImage(index);
      return;
    }

    removeNewGalleryImage(index - existingCount);
  };

  /* ============================================================
     ADD FEATURE
  ============================================================ */

  const addFeature = () => {
    const value = featureInput.trim();

    if (!value) return;

    setForm((prev) => ({
      ...prev,

      features: [
        ...prev.features,
        value,
      ],
    }));

    setFeatureInput("");
  };

  /* ============================================================
     REMOVE FEATURE
  ============================================================ */

  const removeFeature = (index) => {
    setForm((prev) => ({
      ...prev,

      features: prev.features.filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* ============================================================
     ADD AMENITY
  ============================================================ */

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (!value) return;

    setForm((prev) => ({
      ...prev,

      amenities: [
        ...prev.amenities,
        value,
      ],
    }));

    setAmenityInput("");
  };

  /* ============================================================
     REMOVE AMENITY
  ============================================================ */

  const removeAmenity = (index) => {
    setForm((prev) => ({
      ...prev,

      amenities: prev.amenities.filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* ============================================================
     PAYMENT PLAN
  ============================================================ */

  const addPaymentPlan = () => {
    setForm((prev) => ({
      ...prev,

      paymentPlans: [
        ...prev.paymentPlans,

        {
          name: "",
          percentage: 0,
          description: "",
        },
      ],
    }));
  };

  const updatePaymentPlan = (
    index,
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,

      paymentPlans:
        prev.paymentPlans.map(
          (plan, i) =>
            i === index
              ? {
                  ...plan,

                  [field]:
                    field ===
                    "percentage"
                      ? Number(value)
                      : value,
                }
              : plan
        ),
    }));
  };

  const removePaymentPlan = (index) => {
    setForm((prev) => ({
      ...prev,

      paymentPlans:
        prev.paymentPlans.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* ============================================================
     DOCUMENT
  ============================================================ */

  const addDocument = () => {
    setForm((prev) => ({
      ...prev,

      documents: [
        ...prev.documents,

        {
          name: "",
          url: "",
          type: "",
        },
      ],
    }));
  };

  const updateDocument = (
    index,
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,

      documents:
        prev.documents.map(
          (document, i) =>
            i === index
              ? {
                  ...document,
                  [field]: value,
                }
              : document
        ),
    }));
  };

  const removeDocument = (
    index
  ) => {
    setForm((prev) => ({
      ...prev,

      documents:
        prev.documents.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* ============================================================
     SUBMIT
  ============================================================ */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      alert(
        "Project name is required."
      );
      return;
    }

    if (!form.developer.trim()) {
      alert(
        "Developer name is required."
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,

        name: form.name.trim(),

        developer:
          form.developer.trim(),

        priceFrom:
          form.priceFrom === ""
            ? 0
            : Number(form.priceFrom),

        /*
         * Existing Cloudinary images
         */
        image: form.image,

        images: form.images.filter(
          Boolean
        ),

        /*
         * New image files
         * Your existing service can use these
         * for Cloudinary upload.
         */
        mainImageFile:
          mainImageFile,

        galleryImageFiles:
          galleryImageFiles,

        features:
          form.features.filter(Boolean),

        amenities:
          form.amenities.filter(Boolean),

        paymentPlans:
          form.paymentPlans.map(
            (plan) => ({
              name:
                plan.name || "",

              percentage:
                Number(
                  plan.percentage
                ) || 0,

              description:
                plan.description ||
                "",
            })
          ),

        documents:
          form.documents.map(
            (document) => ({
              name:
                document.name || "",

              url:
                document.url || "",

              type:
                document.type || "",
            })
          ),
      };

      await editProject(
        id,
        payload
      );

      alert(
        "Builder project updated successfully."
      );

      navigate(
        "/admin/builder-projects"
      );
    } catch (err) {
      console.error(
        "Failed to update builder project:",
        err
      );

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update builder project."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (
    loading &&
    !project
  ) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading builder project...
        </p>
      </div>
    );
  }

  /* Combined gallery preview list — existing (Cloudinary) + new (blob) */
  const combinedGalleryPreviews = [
    ...form.images,
    ...galleryImagePreviews,
  ];

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/builder-projects"
              )
            }
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft size={17} />

            Back to Builder Projects
          </button>

          <h1 className="text-2xl font-semibold text-gray-900">
            Edit Builder Project
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update builder project information.
          </p>

        </div>

      </div>

      {/* ERROR */}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* BASIC INFORMATION */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Basic details about the builder project.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* PROJECT NAME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Project Name *
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter project name"
                required
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400"
              />

            </div>

            {/* DEVELOPER */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Developer / Builder *
              </label>

              <input
                name="developer"
                value={form.developer}
                onChange={handleChange}
                placeholder="Enter developer name"
                required
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400"
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Project Category
              </label>

              <select
                name="projectCategory"
                value={
                  form.projectCategory
                }
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              >
                <option value="residential">
                  Residential
                </option>

                <option value="commercial">
                  Commercial
                </option>

                <option value="plot">
                  Plot
                </option>

                <option value="mixed">
                  Mixed
                </option>
              </select>

            </div>

            {/* STATUS */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-gray-400"
              >
                <option value="active">
                  Active
                </option>

                <option value="upcoming">
                  Upcoming
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="inactive">
                  Inactive
                </option>
              </select>

            </div>

            {/* DESCRIPTION */}

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter project description"
                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none focus:border-gray-400"
              />

            </div>

          </div>

        </section>

        {/* LOCATION */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Location
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Sector / Area"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>

              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                State
              </label>

              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

          </div>

        </section>

        {/* PRICE & DETAILS */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Price & Project Details
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="₹ 50 Lac onwards"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price From
              </label>

              <input
                name="priceFrom"
                type="number"
                value={form.priceFrom}
                onChange={handleChange}
                placeholder="5000000"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Total Area
              </label>

              <input
                name="totalArea"
                value={form.totalArea}
                onChange={handleChange}
                placeholder="10 Acres"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Possession
              </label>

              <input
                name="possession"
                value={form.possession}
                onChange={handleChange}
                placeholder="2028"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

          </div>

        </section>

        {/* AUTHORITY / RERA */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Authority & Approval
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Authority
              </label>

              <input
                name="authority"
                value={form.authority}
                onChange={handleChange}
                placeholder="YEIDA / RERA / Other"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                RERA Number
              </label>

              <input
                name="reraNumber"
                value={form.reraNumber}
                onChange={handleChange}
                placeholder="Enter RERA number"
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
              />

            </div>

          </div>

        </section>

        {/* WEBSITE VISIBILITY */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-gray-900">
              Website Visibility
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Choose where this project should appear on the website.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4">

              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="mt-1 h-4 w-4"
              />

              <div>

                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Star size={16} />
                  Featured Project
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Show this project in Featured Projects.
                </p>

              </div>

            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4">

              <input
                type="checkbox"
                name="newProject"
                checked={form.newProject}
                onChange={handleChange}
                className="mt-1 h-4 w-4"
              />

              <div>

                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <Sparkles size={16} />
                  New Project
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Show this project in New Projects.
                </p>

              </div>

            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4">

              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="mt-1 h-4 w-4"
              />

              <div>

                <div className="text-sm font-semibold text-gray-900">
                  Published
                </div>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Make this project visible on the public website.
                </p>

              </div>

            </label>

          </div>

        </section>

        {/* ============================================================
            PROJECT IMAGES (styled to match EditAuthorityProject)
        ============================================================ */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-2">
            <ImageIcon
              size={20}
              className="text-gray-700"
            />

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Project Images
              </h2>

              <p className="text-sm text-gray-500">
                Upload images directly. Images will be stored on Cloudinary.
              </p>
            </div>
          </div>

          {/* MAIN IMAGE */}
          <div className="mb-8">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Main Image
            </label>

            {!mainImagePreview ? (
              <label
                htmlFor="main-project-image"
                className="flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-gray-500 hover:bg-gray-100"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <Upload
                    size={25}
                    className="text-gray-600"
                  />
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Click to upload main image
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  PNG, JPG, JPEG or WEBP · Maximum 10MB
                </p>

                <input
                  id="main-project-image"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleMainImageChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="relative overflow-hidden rounded-2xl border border-gray-200">

                <img
                  src={mainImagePreview}
                  alt={form.name || "Project main preview"}
                  className="h-[320px] w-full object-cover"
                />

                {mainImageFile && (
                  <button
                    type="button"
                    onClick={removeMainImage}
                    className="absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-red-500 shadow-md hover:bg-red-50"
                  >
                    <X size={16} />
                    Cancel Replace
                  </button>
                )}

                <label
                  htmlFor="replace-main-image"
                  className="absolute bottom-4 left-4 flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md hover:bg-gray-50"
                >
                  <Upload size={16} />
                  Replace Image

                  <input
                    id="replace-main-image"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleMainImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* GALLERY */}
          <div>

            <div className="mb-3 flex items-center justify-between">

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gallery Images
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Existing images and newly selected images are shown here.
                </p>
              </div>

              <label
                htmlFor="gallery-project-images"
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <Plus size={17} />
                Add Images

                <input
                  id="gallery-project-images"
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleGalleryImagesChange}
                  className="hidden"
                />
              </label>
            </div>

            {combinedGalleryPreviews.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                {combinedGalleryPreviews.map(
                  (image, index) => {
                    const isNewImage =
                      index >= form.images.length;

                    return (
                      <div
                        key={`${image}-${index}`}
                        className="group relative overflow-hidden rounded-xl border border-gray-200"
                      >

                        <img
                          src={image}
                          alt={`Project gallery ${index + 1}`}
                          className="h-36 w-full object-cover transition group-hover:scale-105"
                        />

                        {isNewImage && (
                          <span className="absolute bottom-2 left-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
                            New
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            removeGalleryImage(index)
                          }
                          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-500 opacity-0 shadow-md transition group-hover:opacity-100"
                          title="Remove image"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    );
                  }
                )}

              </div>
            ) : (
              <label
                htmlFor="gallery-project-images"
                className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-500"
              >
                <ImageIcon
                  size={28}
                  className="mb-3 text-gray-400"
                />

                <p className="text-sm font-medium text-gray-600">
                  Add gallery images
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Select multiple images
                </p>
              </label>
            )}

          </div>
        </section>

        {/* FEATURES */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Features
          </h2>

          <div className="mt-4 flex gap-3">

            <input
              value={featureInput}
              onChange={(e) =>
                setFeatureInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addFeature();
                }
              }}
              placeholder="Add project feature"
              className="h-11 flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none"
            />

            <button
              type="button"
              onClick={addFeature}
              className="rounded-lg bg-gray-900 px-4 text-white"
            >
              <Plus size={18} />
            </button>

          </div>

          <div className="mt-4 flex flex-wrap gap-2">

            {form.features.map(
              (feature, index) => (

                <div
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                >

                  {feature}

                  <button
                    type="button"
                    onClick={() =>
                      removeFeature(
                        index
                      )
                    }
                    className="text-gray-400 hover:text-red-600"
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>

        </section>

        {/* AMENITIES */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <h2 className="text-lg font-semibold text-gray-900">
            Amenities
          </h2>

          <div className="mt-4 flex gap-3">

            <input
              value={amenityInput}
              onChange={(e) =>
                setAmenityInput(
                  e.target.value
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addAmenity();
                }
              }}
              placeholder="Add amenity"
              className="h-11 flex-1 rounded-lg border border-gray-200 px-3 text-sm outline-none"
            />

            <button
              type="button"
              onClick={addAmenity}
              className="rounded-lg bg-gray-900 px-4 text-white"
            >
              <Plus size={18} />
            </button>

          </div>

          <div className="mt-4 flex flex-wrap gap-2">

            {form.amenities.map(
              (amenity, index) => (

                <div
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
                >

                  {amenity}

                  <button
                    type="button"
                    onClick={() =>
                      removeAmenity(
                        index
                      )
                    }
                    className="text-gray-400 hover:text-red-600"
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>

        </section>

        {/* PAYMENT PLANS */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-gray-900">
                Payment Plans
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add payment plan details.
              </p>

            </div>

            <button
              type="button"
              onClick={addPaymentPlan}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50"
            >
              <Plus size={16} />
              Add Plan
            </button>

          </div>

          <div className="mt-5 space-y-4">

            {form.paymentPlans.map(
              (plan, index) => (

                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >

                  <div className="grid gap-4 md:grid-cols-[1fr_180px_auto]">

                    <input
                      value={plan.name}
                      onChange={(e) =>
                        updatePaymentPlan(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Plan name"
                      className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none"
                    />

                    <input
                      type="number"
                      value={
                        plan.percentage
                      }
                      onChange={(e) =>
                        updatePaymentPlan(
                          index,
                          "percentage",
                          e.target.value
                        )
                      }
                      placeholder="Percentage"
                      className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removePaymentPlan(
                          index
                        )
                      }
                      className="rounded-lg border border-gray-200 px-3 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <textarea
                    value={
                      plan.description
                    }
                    onChange={(e) =>
                      updatePaymentPlan(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    rows={3}
                    placeholder="Plan description"
                    className="mt-3 w-full rounded-lg border border-gray-200 px-3 py-3 text-sm outline-none"
                  />

                </div>

              )
            )}

          </div>

        </section>

        {/* DOCUMENTS */}

        <section className="rounded-xl border border-gray-200 bg-white p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <FileText
                size={19}
                className="text-gray-600"
              />

              <div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Documents
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add project documents and approvals.
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={addDocument}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium hover:bg-gray-50"
            >
              <Plus size={16} />
              Add Document
            </button>

          </div>

          <div className="mt-5 space-y-4">

            {form.documents.map(
              (document, index) => (

                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >

                  <div className="grid gap-4 md:grid-cols-3">

                    <input
                      value={
                        document.name
                      }
                      onChange={(e) =>
                        updateDocument(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Document name"
                      className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none"
                    />

                    <input
                      value={
                        document.type
                      }
                      onChange={(e) =>
                        updateDocument(
                          index,
                          "type",
                          e.target.value
                        )
                      }
                      placeholder="Document type"
                      className="h-11 rounded-lg border border-gray-200 px-3 text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeDocument(
                          index
                        )
                      }
                      className="rounded-lg border border-gray-200 px-3 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>

                  <input
                    value={
                      document.url
                    }
                    onChange={(e) =>
                      updateDocument(
                        index,
                        "url",
                        e.target.value
                      )
                    }
                    placeholder="Document URL"
                    className="mt-3 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none"
                  />

                </div>

              )
            )}

          </div>

        </section>

        {/* SAVE BAR */}

        <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white/95 p-4 shadow-lg backdrop-blur">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/builder-projects"
              )
            }
            className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Save size={17} />

            {saving
              ? "Updating..."
              : "Update Builder Project"}

          </button>

        </div>

      </form>

    </div>
  );
}

export default EditBuilderProject;
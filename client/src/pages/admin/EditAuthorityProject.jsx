
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";

import {
  getAuthorityProjectById,
  updateAuthorityProject,
} from "../../services/authorityProjectService";

function EditAuthorityProject() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    authority: "",
    projectCategory: "plot",
    location: "",
    city: "",
    state: "",
    price: "",
    priceFrom: "",
    totalArea: "",
    possession: "",
    status: "active",
    reraNumber: "",
    featured: false,
    newProject: false,
    published: true,

    // Existing Cloudinary images
    image: "",
    images: [],

    features: [],
    amenities: [],
    paymentPlans: [],
    documents: [],
  });

  /* ============================================================
     IMAGE STATES
  ============================================================ */

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");

  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);

  /* ============================================================
     OTHER STATES
  ============================================================ */

  const [featureInput, setFeatureInput] = useState("");
  const [amenityInput, setAmenityInput] = useState("");

  const [paymentPlan, setPaymentPlan] = useState({
    name: "",
    percentage: "",
    description: "",
  });

  const [document, setDocument] = useState({
    name: "",
    url: "",
    type: "",
  });

  /* ============================================================
     FETCH PROJECT
  ============================================================ */

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAuthorityProjectById(id);

        const project =
          response?.data ||
          response?.project ||
          response;

        const existingImages = Array.isArray(project?.images)
          ? project.images
          : [];

        setFormData({
          name: project?.name || "",
          description: project?.description || "",
          authority: project?.authority || "",
          projectCategory: project?.projectCategory || "plot",
          location: project?.location || "",
          city: project?.city || "",
          state: project?.state || "",
          price: project?.price || "",
          priceFrom: project?.priceFrom || "",
          totalArea: project?.totalArea || "",
          possession: project?.possession || "",
          status: project?.status || "active",
          reraNumber: project?.reraNumber || "",

          featured: Boolean(project?.featured),
          newProject: Boolean(project?.newProject),
          published: project?.published !== false,

          image: project?.image || "",
          images: existingImages,

          features: Array.isArray(project?.features)
            ? project.features
            : [],

          amenities: Array.isArray(project?.amenities)
            ? project.amenities
            : [],

          paymentPlans: Array.isArray(project?.paymentPlans)
            ? project.paymentPlans
            : [],

          documents: Array.isArray(project?.documents)
            ? project.documents
            : [],
        });

        // Existing main Cloudinary image
        if (project?.image) {
          setMainImagePreview(project.image);
        } else {
          setMainImagePreview("");
        }

        // Existing gallery Cloudinary images
        setGalleryImagePreviews(existingImages);

        // New files reset
        setMainImageFile(null);
        setGalleryImageFiles([]);
      } catch (err) {
        console.error("Fetch authority project error:", err);

        setError(
          err?.response?.data?.message ||
            "Failed to load project."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  /* ============================================================
     INPUT CHANGE
  ============================================================ */

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ============================================================
     MAIN IMAGE UPLOAD
  ============================================================ */

  const handleMainImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Main image must be less than 10MB.");
      return;
    }

    setError("");

    // Remove old preview object URL if needed
    if (
      mainImagePreview &&
      mainImagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(mainImagePreview);
    }

    setMainImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setMainImagePreview(previewUrl);

    // Reset input
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

    // Existing Cloudinary image ko preserve rakho
    setMainImagePreview(formData.image || "");
  };

  /* ============================================================
     GALLERY IMAGE UPLOAD
  ============================================================ */

  const handleGalleryImagesChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const invalidFile = files.find(
      (file) => !file.type.startsWith("image/")
    );

    if (invalidFile) {
      setError("Only image files are allowed.");
      event.target.value = "";
      return;
    }

    const largeFile = files.find(
      (file) => file.size > 10 * 1024 * 1024
    );

    if (largeFile) {
      setError(
        "Each gallery image must be less than 10MB."
      );
      event.target.value = "";
      return;
    }

    setError("");

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryImageFiles((prev) => [
      ...prev,
      ...files,
    ]);

    setGalleryImagePreviews((prev) => [
      ...prev,
      ...previews,
    ]);

    event.target.value = "";
  };

  /* ============================================================
     REMOVE GALLERY IMAGE
  ============================================================ */

  const removeGalleryImage = (index) => {
    const existingImages = formData.images || [];

    // Existing Cloudinary image
    if (index < existingImages.length) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter(
          (_, i) => i !== index
        ),
      }));

      setGalleryImagePreviews((prev) =>
        prev.filter((_, i) => i !== index)
      );

      return;
    }

    // New uploaded file
    const fileIndex =
      index - existingImages.length;

    const previewToRemove =
      galleryImagePreviews[index];

    if (
      previewToRemove &&
      previewToRemove.startsWith("blob:")
    ) {
      URL.revokeObjectURL(previewToRemove);
    }

    setGalleryImageFiles((prev) =>
      prev.filter((_, i) => i !== fileIndex)
    );

    setGalleryImagePreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /* ============================================================
     FEATURES
  ============================================================ */

  const addFeature = () => {
    const value = featureInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, value],
    }));

    setFeatureInput("");
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* ============================================================
     AMENITIES
  ============================================================ */

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      amenities: [...prev.amenities, value],
    }));

    setAmenityInput("");
  };

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* ============================================================
     PAYMENT PLAN
  ============================================================ */

  const handlePaymentPlanChange = (event) => {
    const { name, value } = event.target;

    setPaymentPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPaymentPlan = () => {
    if (!paymentPlan.name.trim()) return;

    setFormData((prev) => ({
      ...prev,
      paymentPlans: [
        ...prev.paymentPlans,
        {
          name: paymentPlan.name.trim(),
          percentage: paymentPlan.percentage,
          description:
            paymentPlan.description.trim(),
        },
      ],
    }));

    setPaymentPlan({
      name: "",
      percentage: "",
      description: "",
    });
  };

  const removePaymentPlan = (index) => {
    setFormData((prev) => ({
      ...prev,
      paymentPlans: prev.paymentPlans.filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* ============================================================
     DOCUMENT
  ============================================================ */

  const handleDocumentChange = (event) => {
    const { name, value } = event.target;

    setDocument((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addDocument = () => {
    if (!document.name.trim()) return;

    setFormData((prev) => ({
      ...prev,
      documents: [
        ...prev.documents,
        {
          name: document.name.trim(),
          url: document.url.trim(),
          type: document.type.trim(),
        },
      ],
    }));

    setDocument({
      name: "",
      url: "",
      type: "",
    });
  };

  const removeDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter(
        (_, i) => i !== index
      ),
    }));
  };

  /* ============================================================
     SUBMIT
  ============================================================ */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Project name is required.");
      return;
    }

    if (!formData.authority.trim()) {
      setError("Authority name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      /*
       * IMPORTANT
       *
       * Existing Cloudinary URLs are kept in:
       * formData.image
       * formData.images
       *
       * New files are sent separately:
       * mainImageFile
       * galleryImageFiles
       *
       * authorityProjectService.js should convert
       * these files into FormData and send multipart/form-data
       * to your backend.
       */

      const payload = {
        ...formData,

        // Existing images
        image: formData.image,
        images: formData.images,

        // New image files
        mainImageFile: mainImageFile,
        galleryImageFiles: galleryImageFiles,
      };

      await updateAuthorityProject(id, payload);

      navigate("/admin/authority-projects");
    } catch (err) {
      console.error(
        "Update authority project error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update authority project."
      );
    } finally {
      setSaving(false);
    }
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2
            size={24}
            className="animate-spin"
          />
          Loading project...
        </div>
      </div>
    );
  }

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/authority-projects"
                )
              }
              className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft size={17} />
              Back to Authority Projects
            </button>

            <h1 className="text-2xl font-bold text-gray-900">
              Edit Authority Project
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update project information and images
            </p>
          </div>

          <button
            type="submit"
            form="authority-project-form"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form
          id="authority-project-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* BASIC INFORMATION */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Project Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Authority *
                </label>

                <input
                  type="text"
                  name="authority"
                  value={formData.authority}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  placeholder="Enter authority"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Project Category
                </label>

                <select
                  name="projectCategory"
                  value={
                    formData.projectCategory
                  }
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                >
                  <option value="plot">
                    Plot
                  </option>
                  <option value="residential">
                    Residential
                  </option>
                  <option value="commercial">
                    Commercial
                  </option>
                  <option value="infrastructure">
                    Infrastructure
                  </option>
                  <option value="industrial">
                    Industrial
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                >
                  <option value="active">
                    Active
                  </option>
                  <option value="inactive">
                    Inactive
                  </option>
                  <option value="completed">
                    Completed
                  </option>
                  <option value="upcoming">
                    Upcoming
                  </option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                  placeholder="Enter project description"
                />
              </div>
            </div>
          </section>

          {/* LOCATION & PRICING */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Location & Pricing
            </h2>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {[
                ["location", "Location"],
                ["city", "City"],
                ["state", "State"],
                ["price", "Price"],
                ["priceFrom", "Price From"],
                ["totalArea", "Total Area"],
                ["possession", "Possession"],
                ["reraNumber", "RERA Number"],
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {label}
                  </label>

                  <input
                    type={
                      name === "priceFrom"
                        ? "number"
                        : "text"
                    }
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                    placeholder={
                      name === "price"
                        ? "₹50 Lakh onwards"
                        : ""
                    }
                  />
                </div>
              ))}
            </div>
          </section>

          {/* PROJECT IMAGES */}
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
                    onChange={
                      handleMainImageChange
                    }
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="relative overflow-hidden rounded-2xl border border-gray-200">

                  <img
                    src={mainImagePreview}
                    alt="Project main preview"
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
                      onChange={
                        handleMainImageChange
                      }
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
                    onChange={
                      handleGalleryImagesChange
                    }
                    className="hidden"
                  />
                </label>
              </div>

              {galleryImagePreviews.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

                  {galleryImagePreviews.map(
                    (image, index) => {
                      const isNewImage =
                        index >=
                        formData.images.length;

                      return (
                        <div
                          key={`${image}-${index}`}
                          className="group relative overflow-hidden rounded-xl border border-gray-200"
                        >

                          <img
                            src={image}
                            alt={`Project gallery ${
                              index + 1
                            }`}
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
                              removeGalleryImage(
                                index
                              )
                            }
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-red-500 opacity-0 shadow-md transition group-hover:opacity-100"
                            title="Remove image"
                          >
                            <Trash2
                              size={15}
                            />
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
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Features
            </h2>

            <div className="flex gap-3">

              <input
                type="text"
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
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

              <button
                type="button"
                onClick={addFeature}
                className="rounded-xl bg-gray-900 px-5 py-3 text-white"
              >
                <Plus size={18} />
              </button>
            </div>

            {formData.features.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.features.map(
                  (feature, index) => (
                    <div
                      key={`${feature}-${index}`}
                      className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700"
                    >
                      {feature}

                      <button
                        type="button"
                        onClick={() =>
                          removeFeature(
                            index
                          )
                        }
                        className="text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          {/* AMENITIES */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Amenities
            </h2>

            <div className="flex gap-3">

              <input
                type="text"
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
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

              <button
                type="button"
                onClick={addAmenity}
                className="rounded-xl bg-gray-900 px-5 py-3 text-white"
              >
                <Plus size={18} />
              </button>
            </div>

            {formData.amenities.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.amenities.map(
                  (amenity, index) => (
                    <div
                      key={`${amenity}-${index}`}
                      className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700"
                    >
                      {amenity}

                      <button
                        type="button"
                        onClick={() =>
                          removeAmenity(
                            index
                          )
                        }
                        className="text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </section>

          {/* PAYMENT PLANS */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Payment Plans
            </h2>

            <div className="grid gap-4 md:grid-cols-3">

              <input
                type="text"
                name="name"
                value={paymentPlan.name}
                onChange={
                  handlePaymentPlanChange
                }
                placeholder="Plan name"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

              <input
                type="text"
                name="percentage"
                value={
                  paymentPlan.percentage
                }
                onChange={
                  handlePaymentPlanChange
                }
                placeholder="Percentage"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

              <input
                type="text"
                name="description"
                value={
                  paymentPlan.description
                }
                onChange={
                  handlePaymentPlanChange
                }
                placeholder="Description"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />
            </div>

            <button
              type="button"
              onClick={addPaymentPlan}
              className="mt-4 flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white"
            >
              <Plus size={17} />
              Add Payment Plan
            </button>

            {formData.paymentPlans.length > 0 && (
              <div className="mt-5 space-y-3">

                {formData.paymentPlans.map(
                  (plan, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {plan.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {plan.percentage}
                        </p>

                        <p className="text-sm text-gray-500">
                          {plan.description}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removePaymentPlan(
                            index
                          )
                        }
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )
                )}

              </div>
            )}
          </section>

          {/* DOCUMENTS */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-2">
              <FileText size={19} />

              <h2 className="text-lg font-semibold text-gray-900">
                Documents
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">

              <input
                type="text"
                name="name"
                value={document.name}
                onChange={
                  handleDocumentChange
                }
                placeholder="Document name"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

              <input
                type="text"
                name="url"
                value={document.url}
                onChange={
                  handleDocumentChange
                }
                placeholder="Document URL"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />

              <input
                type="text"
                name="type"
                value={document.type}
                onChange={
                  handleDocumentChange
                }
                placeholder="Document type"
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              />
            </div>

            <button
              type="button"
              onClick={addDocument}
              className="mt-4 flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white"
            >
              <Plus size={17} />
              Add Document
            </button>

            {formData.documents.length > 0 && (
              <div className="mt-5 space-y-3">

                {formData.documents.map(
                  (doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {doc.name}
                        </p>

                        <p className="break-all text-sm text-gray-500">
                          {doc.url}
                        </p>

                        <p className="text-xs text-gray-400">
                          {doc.type}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeDocument(
                            index
                          )
                        }
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )
                )}

              </div>
            )}
          </section>

          {/* SETTINGS */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Project Settings
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  name="featured"
                  checked={
                    formData.featured
                  }
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium text-gray-700">
                  Featured Project
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  name="newProject"
                  checked={
                    formData.newProject
                  }
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium text-gray-700">
                  New Project
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
                <input
                  type="checkbox"
                  name="published"
                  checked={
                    formData.published
                  }
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium text-gray-700">
                  Published
                </span>
              </label>

            </div>
          </section>

          {/* BOTTOM ACTIONS */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/authority-projects"
                )
              }
              disabled={saving}
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Project
                </>
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditAuthorityProject;


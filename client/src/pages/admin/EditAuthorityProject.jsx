import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  ImagePlus,
  FileText,
  Loader2,
  Upload,
  X,
} from "lucide-react";

import {
  getAuthorityProjectById,
  updateAuthorityProject,
} from "../../services/authorityProjectService";

import DynamicTable, {
  createEmptyProjectTable,
} from "../../components/DynamicTable/DynamicTable";

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
    image: "",
    images: [],
    features: [],
    amenities: [],
    paymentPlans: [],
    documents: [],
    customTable: createEmptyProjectTable(),
  });

  // Main image
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");

  // Gallery
  const [galleryImageFiles, setGalleryImageFiles] = useState([]);
  const [galleryImagePreviews, setGalleryImagePreviews] = useState([]);

  // Temporary inputs
  const [featureInput, setFeatureInput] = useState("");
  const [amenityInput, setAmenityInput] = useState("");

  // =========================================================
  // FETCH PROJECT
  // =========================================================

  useEffect(() => {
    fetchProject();

    return () => {
      if (mainImagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(mainImagePreview);
      }

      galleryImagePreviews.forEach((url) => {
        if (url?.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [id]);

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

      const existingCustomTable =
        project?.customTable &&
        Array.isArray(project.customTable.columns) &&
        Array.isArray(project.customTable.rows)
          ? project.customTable
          : createEmptyProjectTable();

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
        customTable: existingCustomTable,
      });

      setMainImagePreview(project?.image || "");

      setGalleryImagePreviews(
        existingImages.length
          ? existingImages
          : project?.image
            ? [project.image]
            : []
      );

      setMainImageFile(null);
      setGalleryImageFiles([]);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load project."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // BASIC INPUT
  // =========================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // =========================================================
  // MAIN IMAGE
  // =========================================================

  const handleMainImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("Main image must be less than 10MB.");
      event.target.value = "";
      return;
    }

    setError("");

    if (mainImagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(mainImagePreview);
    }

    const previewUrl = URL.createObjectURL(file);

    setMainImageFile(file);
    setMainImagePreview(previewUrl);

    setFormData((prev) => ({
      ...prev,
      image: previewUrl,
    }));

    event.target.value = "";
  };

  // =========================================================
  // GALLERY IMAGES
  // =========================================================

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
      setError("Each gallery image must be less than 10MB.");
      event.target.value = "";
      return;
    }

    setError("");

    const newPreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setGalleryImageFiles((prev) => [
      ...prev,
      ...files,
    ]);

    setGalleryImagePreviews((prev) => [
      ...prev,
      ...newPreviews,
    ]);

    /*
      If project doesn't have a main image,
      first newly selected image becomes main image.
    */
    if (
      !formData.image &&
      !mainImageFile &&
      galleryImagePreviews.length === 0 &&
      files[0]
    ) {
      setMainImageFile(files[0]);
      setMainImagePreview(newPreviews[0]);

      setFormData((prev) => ({
        ...prev,
        image: newPreviews[0],
      }));
    }

    event.target.value = "";
  };

  // =========================================================
  // REMOVE GALLERY IMAGE
  // =========================================================

  const removeGalleryImage = (index) => {
    const existingImages = formData.images || [];

    // Existing image
    if (index < existingImages.length) {
      const removedImage = existingImages[index];

      const updatedExistingImages = existingImages.filter(
        (_, i) => i !== index
      );

      const updatedPreviews =
        galleryImagePreviews.filter(
          (_, i) => i !== index
        );

      setFormData((prev) => {
        let nextMainImage = prev.image;

        if (removedImage === prev.image) {
          nextMainImage =
            updatedExistingImages[0] || "";
        }

        return {
          ...prev,
          image: nextMainImage,
          images: updatedExistingImages,
        };
      });

      setGalleryImagePreviews(updatedPreviews);

      if (removedImage === mainImagePreview) {
        setMainImagePreview(
          updatedExistingImages[0] || ""
        );
      }

      return;
    }

    // New image
    const newFileIndex =
      index - existingImages.length;

    const previewToRemove =
      galleryImagePreviews[index];

    if (previewToRemove?.startsWith("blob:")) {
      URL.revokeObjectURL(previewToRemove);
    }

    const removedFile =
      galleryImageFiles[newFileIndex];

    setGalleryImageFiles((prev) =>
      prev.filter((_, i) => i !== newFileIndex)
    );

    setGalleryImagePreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );

    /*
      If removed new image was main image,
      select another available image.
    */
    if (previewToRemove === mainImagePreview) {
      const remainingPreviews =
        galleryImagePreviews.filter(
          (_, i) => i !== index
        );

      const nextMain =
        remainingPreviews[0] ||
        formData.images?.[0] ||
        "";

      const remainingNewFiles =
        galleryImageFiles.filter(
          (_, i) => i !== newFileIndex
        );

      const nextNewFile =
        remainingNewFiles[0] || null;

      setMainImagePreview(nextMain);

      if (nextMain?.startsWith("blob:")) {
        setMainImageFile(nextNewFile);
      } else {
        setMainImageFile(null);
      }

      setFormData((prev) => ({
        ...prev,
        image: nextMain,
      }));
    }
  };

  // =========================================================
  // SET IMAGE AS MAIN
  // =========================================================

  const setAsMainImage = (index) => {
    const preview = galleryImagePreviews[index];

    if (!preview) return;

    const existingImages = formData.images || [];

    setMainImagePreview(preview);

    setFormData((prev) => ({
      ...prev,
      image: preview,
    }));

    if (index < existingImages.length) {
      setMainImageFile(null);
    } else {
      const newFileIndex =
        index - existingImages.length;

      setMainImageFile(
        galleryImageFiles[newFileIndex] || null
      );
    }
  };

  // =========================================================
  // FEATURES
  // =========================================================

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

  const handleFeatureKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addFeature();
    }
  };

  // =========================================================
  // AMENITIES
  // =========================================================

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

  const handleAmenityKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addAmenity();
    }
  };

  // =========================================================
  // PAYMENT PLANS
  // =========================================================

  const addPaymentPlan = () => {
    setFormData((prev) => ({
      ...prev,
      paymentPlans: [
        ...prev.paymentPlans,
        {
          name: "",
          percentage: "",
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
    setFormData((prev) => ({
      ...prev,
      paymentPlans: prev.paymentPlans.map(
        (plan, i) =>
          i === index
            ? {
                ...plan,
                [field]: value,
              }
            : plan
      ),
    }));
  };

  const removePaymentPlan = (index) => {
    setFormData((prev) => ({
      ...prev,
      paymentPlans: prev.paymentPlans.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =========================================================
  // DOCUMENTS
  // =========================================================

  const addDocument = () => {
    setFormData((prev) => ({
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
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.map(
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

  const removeDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // =========================================================
  // DYNAMIC TABLE
  // =========================================================

  const handleCustomTableChange = (updatedTable) => {
    setFormData((prev) => ({
      ...prev,
      customTable: updatedTable,
    }));
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,
        image: formData.image,
        images: formData.images,
        customTable: formData.customTable,
        mainImageFile,
        galleryImageFiles,
      };

      await updateAuthorityProject(id, payload);

      navigate("/admin/authority-projects");
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update project."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading project...</span>
        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                navigate("/admin/authority-projects")
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Edit Authority Project
              </h1>

              <p className="text-sm text-slate-500">
                Update project information and images.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* =====================================================
            BASIC INFORMATION
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Basic Information
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Enter the basic project information.
            </p>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Project Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter project name"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Authority
              </label>

              <input
                type="text"
                name="authority"
                value={formData.authority}
                onChange={handleChange}
                placeholder="Enter authority"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Project Category
              </label>

              <select
                name="projectCategory"
                value={formData.projectCategory}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                <option value="plot">Plot</option>
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
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="completed">
                  Completed
                </option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Enter project description"
                className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            LOCATION & PRICING
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Location & Pricing
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Add project location, pricing and possession details.
            </p>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Sector / Location"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Price
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="₹ 50 Lac onwards"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Price From
              </label>

              <input
                type="number"
                name="priceFrom"
                value={formData.priceFrom}
                onChange={handleChange}
                placeholder="5000000"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Total Area
              </label>

              <input
                type="text"
                name="totalArea"
                value={formData.totalArea}
                onChange={handleChange}
                placeholder="100 Acres"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Possession
              </label>

              <input
                type="text"
                name="possession"
                value={formData.possession}
                onChange={handleChange}
                placeholder="2027"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                RERA Number
              </label>

              <input
                type="text"
                name="reraNumber"
                value={formData.reraNumber}
                onChange={handleChange}
                placeholder="RERA Number"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            PROJECT IMAGES - SCREENSHOT STYLE
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Project Images
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Upload project images. The first image will be used as the main image.
            </p>
          </div>

          <div className="p-5">
            {/* ================= MAIN IMAGE ================= */}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    Main Image
                  </p>
                </div>
              </div>

              {mainImagePreview ? (
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <img
                    src={mainImagePreview}
                    alt="Main project"
                    className="h-[320px] w-full object-cover sm:h-[380px] lg:h-[430px]"
                  />

                  <label className="absolute bottom-3 left-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                    <Upload className="h-3.5 w-3.5" />
                    Replace Image

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleMainImageChange}
                    />
                  </label>

                  <div className="absolute right-3 top-3 rounded-md bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold text-white">
                    Main Image
                  </div>
                </div>
              ) : (
                <label className="flex h-[320px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-slate-400 hover:bg-slate-100 sm:h-[380px]">
                  <ImagePlus className="mb-3 h-8 w-8 text-slate-400" />

                  <span className="text-sm font-semibold text-slate-700">
                    Choose main image
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    PNG, JPG, WEBP up to 10MB
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleMainImageChange}
                  />
                </label>
              )}
            </div>

            {/* ================= GALLERY HEADER ================= */}

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Gallery Images
                </p>

                <p className="mt-1 text-[11px] text-slate-500">
                  {galleryImagePreviews.length} image
                  {galleryImagePreviews.length !== 1
                    ? "s"
                    : ""}{" "}
                  selected
                </p>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <Plus className="h-3.5 w-3.5" />
                Add Image

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryImagesChange}
                />
              </label>
            </div>

            {/* ================= GALLERY ================= */}

            {galleryImagePreviews.length > 0 ? (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {galleryImagePreviews.map(
                  (image, index) => {
                    const isMain =
                      image === mainImagePreview;

                    return (
                      <div
                        key={`${image}-${index}`}
                        className={`group relative overflow-hidden rounded-lg border bg-slate-100 ${
                          isMain
                            ? "border-slate-900 ring-2 ring-slate-200"
                            : "border-slate-200"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="h-24 w-full object-cover sm:h-28"
                        />

                        {/* Main badge */}
                        {isMain && (
                          <span className="absolute left-1.5 top-1.5 rounded bg-slate-900 px-1.5 py-0.5 text-[8px] font-bold text-white">
                            MAIN
                          </span>
                        )}

                        {/* New badge */}
                        {index >=
                          (formData.images?.length || 0) && (
                          <span className="absolute bottom-1.5 left-1.5 rounded bg-white/90 px-1.5 py-0.5 text-[8px] font-semibold text-slate-700 shadow-sm">
                            New
                          </span>
                        )}

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            removeGalleryImage(index)
                          }
                          className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-md bg-white/95 text-slate-600 opacity-100 shadow-sm transition hover:bg-red-50 hover:text-red-600"
                          title="Remove image"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>

                        {/* Set main */}
                        {!isMain && (
                          <button
                            type="button"
                            onClick={() =>
                              setAsMainImage(index)
                            }
                            className="absolute bottom-1.5 right-1.5 rounded bg-white/95 px-1.5 py-1 text-[8px] font-semibold text-slate-700 opacity-0 shadow-sm transition group-hover:opacity-100 hover:bg-white"
                          >
                            Set Main
                          </button>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="mt-3 flex min-h-[120px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                <div className="text-center">
                  <ImageIcon className="mx-auto mb-2 h-6 w-6 text-slate-400" />

                  <p className="text-xs font-medium text-slate-600">
                    No gallery images
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    Click "Add Image" to upload images.
                  </p>
                </div>
              </div>
            )}

            <p className="mt-3 text-[10px] text-slate-400">
              Supported formats: JPG, JPEG, PNG, WEBP. Maximum
              size: 10MB per image.
            </p>
          </div>
        </section>

        {/* =====================================================
            FEATURES
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Features
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Add important project features.
            </p>
          </div>

          <div className="p-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) =>
                  setFeatureInput(e.target.value)
                }
                onKeyDown={handleFeatureKeyDown}
                placeholder="Enter feature"
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            {formData.features.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.features.map(
                  (feature, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {feature}

                      <button
                        type="button"
                        onClick={() =>
                          removeFeature(index)
                        }
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            AMENITIES
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Amenities
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Add project amenities.
            </p>
          </div>

          <div className="p-5">
            <div className="flex gap-2">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) =>
                  setAmenityInput(e.target.value)
                }
                onKeyDown={handleAmenityKeyDown}
                placeholder="Enter amenity"
                className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
              />

              <button
                type="button"
                onClick={addAmenity}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            {formData.amenities.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.amenities.map(
                  (amenity, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                    >
                      {amenity}

                      <button
                        type="button"
                        onClick={() =>
                          removeAmenity(index)
                        }
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            PAYMENT PLANS
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Payment Plans
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Add project payment plan details.
              </p>
            </div>

            <button
              type="button"
              onClick={addPaymentPlan}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Plan
            </button>
          </div>

          <div className="space-y-4 p-5">
            {formData.paymentPlans.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-xs text-slate-500">
                No payment plans added.
              </div>
            )}

            {formData.paymentPlans.map(
              (plan, index) => (
                <div
                  key={index}
                  className="relative rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <button
                    type="button"
                    onClick={() =>
                      removePaymentPlan(index)
                    }
                    className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Plan Name
                      </label>

                      <input
                        type="text"
                        value={plan.name || ""}
                        onChange={(e) =>
                          updatePaymentPlan(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Booking"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Percentage
                      </label>

                      <input
                        type="text"
                        value={plan.percentage || ""}
                        onChange={(e) =>
                          updatePaymentPlan(
                            index,
                            "percentage",
                            e.target.value
                          )
                        }
                        placeholder="10%"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Description
                      </label>

                      <textarea
                        value={plan.description || ""}
                        onChange={(e) =>
                          updatePaymentPlan(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows={2}
                        placeholder="Payment description"
                        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* =====================================================
            DOCUMENTS
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Documents
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Add project related documents.
              </p>
            </div>

            <button
              type="button"
              onClick={addDocument}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Document
            </button>
          </div>

          <div className="space-y-4 p-5">
            {formData.documents.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-center text-xs text-slate-500">
                No documents added.
              </div>
            )}

            {formData.documents.map(
              (document, index) => (
                <div
                  key={index}
                  className="relative rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <button
                    type="button"
                    onClick={() =>
                      removeDocument(index)
                    }
                    className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                      <FileText className="h-4 w-4 text-slate-500" />
                    </div>

                    <span className="text-xs font-semibold text-slate-700">
                      Document {index + 1}
                    </span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Name
                      </label>

                      <input
                        type="text"
                        value={document.name || ""}
                        onChange={(e) =>
                          updateDocument(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Brochure"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        URL
                      </label>

                      <input
                        type="text"
                        value={document.url || ""}
                        onChange={(e) =>
                          updateDocument(
                            index,
                            "url",
                            e.target.value
                          )
                        }
                        placeholder="https://..."
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-slate-700">
                        Type
                      </label>

                      <input
                        type="text"
                        value={document.type || ""}
                        onChange={(e) =>
                          updateDocument(
                            index,
                            "type",
                            e.target.value
                          )
                        }
                        placeholder="PDF"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        {/* =====================================================
            PROJECT SETTINGS
        ===================================================== */}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-semibold text-slate-900">
              Project Settings
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage project visibility and highlights.
            </p>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-slate-300"
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Featured Project
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Show this project as featured.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
              <input
                type="checkbox"
                name="newProject"
                checked={formData.newProject}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-slate-300"
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  New Project
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Mark this project as new.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-slate-300"
              />

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Published
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Make project visible on website.
                </p>
              </div>
            </label>
          </div>
        </section>

        {/* =====================================================
            PROJECT INFORMATION TABLE
        ===================================================== */}

        <DynamicTable
          value={formData.customTable}
          onChange={handleCustomTableChange}
          title="Project Information Table"
          description="Edit project-specific information using rows and columns."
        />

        {/* =====================================================
            BOTTOM ACTIONS
        ===================================================== */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              navigate("/admin/authority-projects")
            }
            className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAuthorityProject;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  Check,
  FileText,
  ImagePlus,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

import {
  createAuthorityProject,
  uploadAuthorityProjectImages,
  uploadAuthorityProjectDocuments,
} from "../../services/authorityProjectService";

import DynamicTable, {
  createEmptyProjectTable,
} from "../../components/DynamicTable/DynamicTable";

/*
|--------------------------------------------------------------------------
| ADD AUTHORITY PROJECT
|--------------------------------------------------------------------------
*/

function AddAuthorityProject() {
  const navigate = useNavigate();

  // =========================================================
  // FORM STATE
  // =========================================================

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

    // =======================================================
    // DYNAMIC TABLE
    // =======================================================

    customTable: createEmptyProjectTable(),
  });

  // =========================================================
  // UI STATE
  // =========================================================

  const [featureInput, setFeatureInput] = useState("");

  const [amenityInput, setAmenityInput] = useState("");

  const [paymentPlan, setPaymentPlan] = useState({
    name: "",
    percentage: "",
    description: "",
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================================
  // FEATURES
  // =========================================================

  const addFeature = () => {
    const value = featureInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,

      features: [
        ...prev.features,
        value,
      ],
    }));

    setFeatureInput("");
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,

      features:
        prev.features.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // =========================================================
  // AMENITIES
  // =========================================================

  const addAmenity = () => {
    const value = amenityInput.trim();

    if (!value) return;

    setFormData((prev) => ({
      ...prev,

      amenities: [
        ...prev.amenities,
        value,
      ],
    }));

    setAmenityInput("");
  };

  const removeAmenity = (index) => {
    setFormData((prev) => ({
      ...prev,

      amenities:
        prev.amenities.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // =========================================================
  // PAYMENT PLAN
  // =========================================================

  const handlePaymentChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setPaymentPlan((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const addPaymentPlan = () => {
    if (!paymentPlan.name.trim()) {
      return;
    }

    setFormData((prev) => ({
      ...prev,

      paymentPlans: [
        ...prev.paymentPlans,

        {
          name:
            paymentPlan.name.trim(),

          percentage:
            Number(
              paymentPlan.percentage || 0
            ),

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

      paymentPlans:
        prev.paymentPlans.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // =========================================================
  // IMAGE SELECT
  // =========================================================

  const handleImageSelect = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    setSelectedImages(files);

    setError("");
  };

  // =========================================================
  // DOCUMENT SELECT
  // =========================================================

  const handleDocumentSelect = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    setSelectedDocuments(files);
  };

  // =========================================================
  // EXTRACT IMAGE URLS
  // =========================================================

  const extractUploadedImages = (response) => {
    const possibleImages = [
      response?.images,

      response?.data?.images,

      response?.data?.data?.images,

      response?.result?.images,

      response?.result?.data?.images,
    ];

    let images = [];

    for (const value of possibleImages) {
      if (Array.isArray(value)) {
        images = value;
        break;
      }
    }

    return images
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item?.url) {
          return item.url;
        }

        if (item?.secure_url) {
          return item.secure_url;
        }

        if (item?.path) {
          return item.path;
        }

        if (item?.location) {
          return item.location;
        }

        return "";
      })
      .filter(Boolean);
  };

  // =========================================================
  // EXTRACT DOCUMENTS
  // =========================================================

  const extractUploadedDocuments = (response) => {
    const possibleDocuments = [
      response?.documents,

      response?.data?.documents,

      response?.data?.data?.documents,

      response?.result?.documents,

      response?.result?.data?.documents,
    ];

    let documents = [];

    for (const value of possibleDocuments) {
      if (Array.isArray(value)) {
        documents = value;
        break;
      }
    }

    return documents
      .map((item) => {
        if (typeof item === "string") {
          return {
            name:
              item.split("/").pop() ||
              "Document",

            url: item,

            type: "",
          };
        }

        return {
          name:
            item?.name ||
            item?.originalname ||
            "Document",

          url:
            item?.url ||
            item?.secure_url ||
            item?.path ||
            item?.location ||
            "",

          type:
            item?.type ||
            item?.mimetype ||
            "",
        };
      })
      .filter((item) => item.url);
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Project name is required.";
    }

    if (!formData.authority.trim()) {
      return "Authority name is required.";
    }

    if (
      selectedImages.length === 0 &&
      formData.images.length === 0
    ) {
      return "Please select at least one project image.";
    }

    return "";
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      let uploadedImages = [];
      let uploadedDocuments = [];

      // =====================================================
      // UPLOAD IMAGES
      // =====================================================

      if (selectedImages.length > 0) {
        const imageFormData = new FormData();

        selectedImages.forEach((file) => {
          imageFormData.append(
            "images",
            file
          );
        });

        let imageResponse;

        try {
          imageResponse =
            await uploadAuthorityProjectImages(
              imageFormData
            );
        } catch (uploadError) {
          console.error(
            "Authority image upload error:",
            uploadError
          );

          throw new Error(
            uploadError?.response?.data?.message ||
              uploadError?.message ||
              "Failed to upload project images."
          );
        }

        console.log(
          "Authority image upload response:",
          imageResponse
        );

        uploadedImages =
          extractUploadedImages(
            imageResponse
          );

        if (uploadedImages.length === 0) {
          console.error(
            "Image upload response did not contain image URLs:",
            imageResponse
          );

          throw new Error(
            "Images were selected, but the server did not return uploaded image URLs."
          );
        }
      }

      // =====================================================
      // UPLOAD DOCUMENTS
      // =====================================================

      if (selectedDocuments.length > 0) {
        const documentFormData =
          new FormData();

        selectedDocuments.forEach(
          (file) => {
            documentFormData.append(
              "documents",
              file
            );
          }
        );

        let documentResponse;

        try {
          documentResponse =
            await uploadAuthorityProjectDocuments(
              documentFormData
            );
        } catch (uploadError) {
          console.error(
            "Authority document upload error:",
            uploadError
          );

          throw new Error(
            uploadError?.response?.data?.message ||
              uploadError?.message ||
              "Failed to upload project documents."
          );
        }

        console.log(
          "Authority document upload response:",
          documentResponse
        );

        uploadedDocuments =
          extractUploadedDocuments(
            documentResponse
          );
      }

      // =====================================================
      // FINAL IMAGE ARRAY
      // =====================================================

      const finalImages =
        uploadedImages.length > 0
          ? uploadedImages
          : formData.images;

      if (
        !Array.isArray(finalImages) ||
        finalImages.length === 0
      ) {
        throw new Error(
          "Please select at least one project image."
        );
      }

      // =====================================================
      // MAIN IMAGE
      // =====================================================

      const mainImage =
        finalImages[0];

      // =====================================================
      // FINAL DOCUMENT ARRAY
      // =====================================================

      const finalDocuments =
        uploadedDocuments.length > 0
          ? uploadedDocuments
          : formData.documents;

      // =====================================================
      // FINAL PROJECT DATA
      // =====================================================

      const projectData = {
        name:
          formData.name.trim(),

        description:
          formData.description.trim(),

        authority:
          formData.authority.trim(),

        projectCategory:
          formData.projectCategory,

        location:
          formData.location.trim(),

        city:
          formData.city.trim(),

        state:
          formData.state.trim(),

        price:
          formData.price.trim(),

        priceFrom:
          Number(
            formData.priceFrom || 0
          ),

        totalArea:
          formData.totalArea.trim(),

        possession:
          formData.possession.trim(),

        status:
          formData.status,

        reraNumber:
          formData.reraNumber.trim(),

        featured:
          Boolean(
            formData.featured
          ),

        newProject:
          Boolean(
            formData.newProject
          ),

        published:
          Boolean(
            formData.published
          ),

        // ===================================================
        // MAIN IMAGE
        // ===================================================

        image:
          mainImage,

        // ===================================================
        // ALL IMAGES
        // ===================================================

        images:
          finalImages,

        // ===================================================
        // FEATURES
        // ===================================================

        features:
          formData.features,

        // ===================================================
        // AMENITIES
        // ===================================================

        amenities:
          formData.amenities,

        // ===================================================
        // PAYMENT PLANS
        // ===================================================

        paymentPlans:
          formData.paymentPlans,

        // ===================================================
        // DOCUMENTS
        // ===================================================

        documents:
          finalDocuments,

        // ===================================================
        // DYNAMIC TABLE
        // ===================================================

        customTable:
          formData.customTable,
      };

      console.log(
        "Final Authority Project Payload:",
        projectData
      );

      // =====================================================
      // CREATE PROJECT
      // =====================================================

      const createResponse =
        await createAuthorityProject(
          projectData
        );

      console.log(
        "Authority project created:",
        createResponse
      );

      // =====================================================
      // SUCCESS
      // =====================================================

      setSuccess(
        "Authority project created successfully."
      );

      // =====================================================
      // REDIRECT
      // =====================================================

      setTimeout(() => {
        navigate(
          "/admin/authority-projects"
        );
      }, 800);

    } catch (err) {
      console.error(
        "Create authority project error:",
        err
      );

      const backendMessage =
        err?.response?.data?.message;

      setError(
        backendMessage ||
          err?.message ||
          "Failed to create authority project."
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // CANCEL
  // =========================================================

  const handleCancel = () => {
    navigate(
      "/admin/authority-projects"
    );
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-full bg-slate-50">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white">

        <div className="px-6 py-5 lg:px-8">

          <button
            type="button"
            onClick={handleCancel}
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              text-xs
              font-bold
              text-slate-500
              transition
              hover:text-slate-900
            "
          >
            <ArrowLeft size={15} />

            Back to Authority Projects
          </button>

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8f0df] text-[#b88b32]">
              <Building2 size={21} />
            </div>

            <div>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-950">
                Add Authority Project
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create a new authority project for your website.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="px-6 py-6 lg:px-8"
      >

        <div className="mx-auto max-w-6xl space-y-5">

          {/* =================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {/* =================================================
              SUCCESS
          ================================================== */}

          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              {success}
            </div>
          )}

          {/* =================================================
              BASIC INFORMATION
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-base font-extrabold text-slate-900">
                Basic Information
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Enter the main information about the authority project.
              </p>

            </div>

            <div className="grid gap-5 px-6 py-6 md:grid-cols-2">

              {/* PROJECT NAME */}

              <Field
                label="Project Name"
                required
              >
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. YEIDA Sector 22D"
                  className={inputClass}
                />
              </Field>

              {/* AUTHORITY */}

              <Field
                label="Authority"
                required
              >
                <input
                  name="authority"
                  value={formData.authority}
                  onChange={handleChange}
                  placeholder="e.g. YEIDA"
                  className={inputClass}
                />
              </Field>

              {/* CATEGORY */}

              <Field label="Project Category">

                <select
                  name="projectCategory"
                  value={
                    formData.projectCategory
                  }
                  onChange={handleChange}
                  className={inputClass}
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

                  <option value="mixed">
                    Mixed
                  </option>

                </select>

              </Field>

              {/* STATUS */}

              <Field label="Project Status">

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={inputClass}
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

              </Field>

              {/* DESCRIPTION */}

              <div className="md:col-span-2">

                <Field label="Description">

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write project description..."
                    className={`${inputClass} resize-none py-3`}
                  />

                </Field>

              </div>

            </div>

          </section>

          {/* =================================================
              LOCATION
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-base font-extrabold text-slate-900">
                Location
              </h2>

            </div>

            <div className="grid gap-5 px-6 py-6 md:grid-cols-3">

              <Field label="Location">

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Sector / Area / Locality"
                  className={inputClass}
                />

              </Field>

              <Field label="City">

                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Noida"
                  className={inputClass}
                />

              </Field>

              <Field label="State">

                <input
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Uttar Pradesh"
                  className={inputClass}
                />

              </Field>

            </div>

          </section>

          {/* =================================================
              PROJECT DETAILS
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-base font-extrabold text-slate-900">
                Project Details
              </h2>

            </div>

            <div className="grid gap-5 px-6 py-6 md:grid-cols-2">

              <Field label="Price">

                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. ₹45 Lakh onwards"
                  className={inputClass}
                />

              </Field>

              <Field label="Price From">

                <input
                  type="number"
                  name="priceFrom"
                  value={formData.priceFrom}
                  onChange={handleChange}
                  placeholder="4500000"
                  min="0"
                  className={inputClass}
                />

              </Field>

              <Field label="Total Area">

                <input
                  name="totalArea"
                  value={formData.totalArea}
                  onChange={handleChange}
                  placeholder="e.g. 100 Acres"
                  className={inputClass}
                />

              </Field>

              <Field label="Possession">

                <input
                  name="possession"
                  value={formData.possession}
                  onChange={handleChange}
                  placeholder="e.g. March 2028"
                  className={inputClass}
                />

              </Field>

              <Field label="RERA / Approval Number">

                <input
                  name="reraNumber"
                  value={formData.reraNumber}
                  onChange={handleChange}
                  placeholder="Enter RERA or approval number"
                  className={inputClass}
                />

              </Field>

            </div>

          </section>

          {/* =================================================
              WEBSITE VISIBILITY
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-base font-extrabold text-slate-900">
                Website Visibility
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Choose where this project should appear on the website.
              </p>

            </div>

            <div className="grid gap-3 px-6 py-6 md:grid-cols-3">

              <CheckboxCard
                name="featured"
                checked={
                  formData.featured
                }
                onChange={handleChange}
                title="Featured Project"
                description="Show inside Featured Projects."
              />

              <CheckboxCard
                name="newProject"
                checked={
                  formData.newProject
                }
                onChange={handleChange}
                title="New Project"
                description="Show inside New Projects."
              />

              <CheckboxCard
                name="published"
                checked={
                  formData.published
                }
                onChange={handleChange}
                title="Published"
                description="Make project visible on website."
              />

            </div>

          </section>

          {/* =================================================
              PROJECT IMAGES
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-base font-extrabold text-slate-900">
                Project Images
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Upload project images. The first image will be used as the main image.
              </p>

            </div>

            <div className="px-6 py-6">

              <label
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
                  px-6
                  text-center
                  transition
                  hover:border-[#d6a84f]
                  hover:bg-[#fffaf0]
                "
              >

                <ImagePlus
                  size={28}
                  className="text-slate-400"
                />

                <p className="mt-3 text-sm font-bold text-slate-700">
                  Choose project images
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  You can select multiple images.
                </p>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={
                    handleImageSelect
                  }
                  className="hidden"
                />

              </label>

              {selectedImages.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">

                  {selectedImages.map(
                    (file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
                      >
                        {file.name}
                      </div>
                    )
                  )}

                </div>
              )}

            </div>

          </section>

          {/* =================================================
              FEATURES & AMENITIES
          ================================================== */}

          <section className="grid gap-5 lg:grid-cols-2">

            {/* FEATURES */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5">

                <h2 className="text-base font-extrabold text-slate-900">
                  Features
                </h2>

              </div>

              <div className="px-6 py-6">

                <div className="flex gap-2">

                  <input
                    value={featureInput}
                    onChange={(e) =>
                      setFeatureInput(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter"
                      ) {
                        e.preventDefault();
                        addFeature();
                      }
                    }}
                    placeholder="Add feature"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={addFeature}
                    className={smallButtonClass}
                  >
                    <Plus size={16} />
                  </button>

                </div>

                <div className="mt-4 space-y-2">

                  {formData.features.map(
                    (feature, index) => (
                      <TagRow
                        key={`${feature}-${index}`}
                        text={feature}
                        onRemove={() =>
                          removeFeature(
                            index
                          )
                        }
                      />
                    )
                  )}

                </div>

              </div>

            </div>

            {/* AMENITIES */}

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 px-6 py-5">

                <h2 className="text-base font-extrabold text-slate-900">
                  Amenities
                </h2>

              </div>

              <div className="px-6 py-6">

                <div className="flex gap-2">

                  <input
                    value={amenityInput}
                    onChange={(e) =>
                      setAmenityInput(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter"
                      ) {
                        e.preventDefault();
                        addAmenity();
                      }
                    }}
                    placeholder="Add amenity"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={addAmenity}
                    className={smallButtonClass}
                  >
                    <Plus size={16} />
                  </button>

                </div>

                <div className="mt-4 space-y-2">

                  {formData.amenities.map(
                    (amenity, index) => (
                      <TagRow
                        key={`${amenity}-${index}`}
                        text={amenity}
                        onRemove={() =>
                          removeAmenity(
                            index
                          )
                        }
                      />
                    )
                  )}

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              PAYMENT PLANS
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-base font-extrabold text-slate-900">
                Payment Plans
              </h2>

            </div>

            <div className="px-6 py-6">

              <div className="grid gap-3 md:grid-cols-3">

                <input
                  name="name"
                  value={
                    paymentPlan.name
                  }
                  onChange={
                    handlePaymentChange
                  }
                  placeholder="Plan name"
                  className={inputClass}
                />

                <input
                  type="number"
                  name="percentage"
                  value={
                    paymentPlan.percentage
                  }
                  onChange={
                    handlePaymentChange
                  }
                  placeholder="Percentage"
                  min="0"
                  max="100"
                  className={inputClass}
                />

                <div className="flex gap-2">

                  <input
                    name="description"
                    value={
                      paymentPlan.description
                    }
                    onChange={
                      handlePaymentChange
                    }
                    placeholder="Description"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={
                      addPaymentPlan
                    }
                    className={smallButtonClass}
                  >
                    <Plus size={16} />
                  </button>

                </div>

              </div>

              {formData.paymentPlans.length > 0 && (
                <div className="mt-5 space-y-2">

                  {formData.paymentPlans.map(
                    (plan, index) => (
                      <div
                        key={index}
                        className="
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          border
                          border-slate-100
                          bg-slate-50
                          px-4
                          py-3
                        "
                      >

                        <div>

                          <p className="text-sm font-bold text-slate-800">
                            {plan.name}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-400">
                            {plan.percentage}%

                            {plan.description &&
                              ` • ${plan.description}`}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removePaymentPlan(
                              index
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

          </section>

          {/* =================================================
              DOCUMENTS
          ================================================== */}

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-base font-extrabold text-slate-900">
                Project Documents
              </h2>

            </div>

            <div className="px-6 py-6">

              <label
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-4
                  rounded-xl
                  border
                  border-dashed
                  border-slate-200
                  bg-slate-50
                  p-5
                  transition
                  hover:border-[#d6a84f]
                "
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-400">
                  <FileText size={20} />
                </div>

                <div>

                  <p className="text-sm font-bold text-slate-700">
                    Upload documents
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    PDF, DOC, DOCX and other project documents.
                  </p>

                </div>

                <Upload
                  size={17}
                  className="ml-auto text-slate-400"
                />

                <input
                  type="file"
                  multiple
                  onChange={
                    handleDocumentSelect
                  }
                  className="hidden"
                />

              </label>

              {selectedDocuments.length > 0 && (
                <div className="mt-4 space-y-2">

                  {selectedDocuments.map(
                    (file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2"
                      >

                        <FileText
                          size={15}
                          className="text-slate-400"
                        />

                        <span className="text-xs font-semibold text-slate-600">
                          {file.name}
                        </span>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

          </section>

          {/* =================================================
              DYNAMIC TABLE
          ================================================== */}

          <DynamicTable
            value={formData.customTable}
            onChange={(customTable) =>
              setFormData((prev) => ({
                ...prev,
                customTable,
              }))
            }
            title="Project Information Table"
            description="Add custom project details using rows and columns."
          />

          {/* =================================================
              ACTIONS
          ================================================== */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={handleCancel}
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
                text-sm
                font-bold
                text-slate-600
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
                px-6
                text-sm
                font-bold
                text-white
                shadow-sm
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />

                  Create Authority Project
                </>
              )}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| REUSABLE FIELD
|--------------------------------------------------------------------------
*/

function Field({
  label,
  required = false,
  children,
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-xs font-extrabold text-slate-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </span>

      {children}

    </label>
  );
}

/*
|--------------------------------------------------------------------------
| CHECKBOX CARD
|--------------------------------------------------------------------------
*/

function CheckboxCard({
  name,
  checked,
  onChange,
  title,
  description,
}) {
  return (
    <label
      className={`
        flex
        cursor-pointer
        items-start
        gap-3
        rounded-xl
        border
        p-4
        transition
        ${
          checked
            ? "border-[#d6a84f] bg-[#fffaf0]"
            : "border-slate-200 bg-white hover:bg-slate-50"
        }
      `}
    >

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />

      <span
        className={`
          mt-0.5
          flex
          h-5
          w-5
          shrink-0
          items-center
          justify-center
          rounded-md
          border
          transition
          ${
            checked
              ? "border-[#b88b32] bg-[#b88b32] text-white"
              : "border-slate-300 bg-white"
          }
        `}
      >

        {checked && (
          <Check size={13} />
        )}

      </span>

      <span>

        <span className="block text-sm font-extrabold text-slate-800">
          {title}
        </span>

        <span className="mt-1 block text-xs leading-5 text-slate-400">
          {description}
        </span>

      </span>

    </label>
  );
}

/*
|--------------------------------------------------------------------------
| TAG ROW
|--------------------------------------------------------------------------
*/

function TagRow({
  text,
  onRemove,
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">

      <span className="text-xs font-semibold text-slate-600">
        {text}
      </span>

      <button
        type="button"
        onClick={onRemove}
        className="text-slate-400 hover:text-red-600"
      >
        <Trash2 size={14} />
      </button>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| INPUT STYLES
|--------------------------------------------------------------------------
*/

const inputClass = `
  h-11
  w-full
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
`;

/*
|--------------------------------------------------------------------------
| SMALL BUTTON
|--------------------------------------------------------------------------
*/

const smallButtonClass = `
  flex
  h-11
  w-11
  shrink-0
  items-center
  justify-center
  rounded-xl
  bg-slate-950
  text-white
  transition
  hover:bg-slate-800
`;

export default AddAuthorityProject;
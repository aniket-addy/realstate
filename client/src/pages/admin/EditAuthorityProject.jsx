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
} from "lucide-react";

import {
  getAuthorityProjectById,
  updateAuthorityProject,
} from "../../services/authorityProjectService";


/*
|--------------------------------------------------------------------------
| EDIT AUTHORITY PROJECT
|--------------------------------------------------------------------------
| Admin page for editing an existing Authority Project.
|--------------------------------------------------------------------------
*/

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
  });

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


  /*
  |--------------------------------------------------------------------------
  | FETCH PROJECT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchProject();
  }, [id]);


  const fetchProject = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAuthorityProjectById(id);

      const project = response?.data || response?.project || response;

      if (!project) {
        throw new Error("Authority project not found");
      }

      setFormData({
        name: project.name || "",
        description: project.description || "",

        authority: project.authority || "",
        projectCategory:
          project.projectCategory || "plot",

        location: project.location || "",
        city: project.city || "",
        state: project.state || "",

        price: project.price || "",
        priceFrom:
          project.priceFrom !== undefined
            ? project.priceFrom
            : "",

        totalArea: project.totalArea || "",
        possession: project.possession || "",
        status: project.status || "active",

        reraNumber: project.reraNumber || "",

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

        documents: Array.isArray(project.documents)
          ? project.documents
          : [],
      });
    } catch (err) {
      console.error(
        "Error fetching authority project:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load authority project"
      );
    } finally {
      setLoading(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | CHECKBOX CHANGE
  |--------------------------------------------------------------------------
  */

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | FEATURE
  |--------------------------------------------------------------------------
  */

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


  /*
  |--------------------------------------------------------------------------
  | AMENITY
  |--------------------------------------------------------------------------
  */

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


  /*
  |--------------------------------------------------------------------------
  | PAYMENT PLAN
  |--------------------------------------------------------------------------
  */

  const handlePaymentPlanChange = (
    event
  ) => {
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
          percentage:
            Number(paymentPlan.percentage) || 0,
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


  /*
  |--------------------------------------------------------------------------
  | DOCUMENT
  |--------------------------------------------------------------------------
  */

  const handleDocumentChange = (
    event
  ) => {
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
      documents:
        prev.documents.filter(
          (_, i) => i !== index
        ),
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | IMAGES
  |--------------------------------------------------------------------------
  */

  const handleImageChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      image: event.target.value,
    }));
  };


  const handleImagesChange = (event) => {
    const value = event.target.value;

    const images = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      images,
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | SUBMIT
  |--------------------------------------------------------------------------
  */

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

      const payload = {
        ...formData,

        name: formData.name.trim(),
        description:
          formData.description.trim(),

        authority:
          formData.authority.trim(),

        location:
          formData.location.trim(),

        city: formData.city.trim(),

        state: formData.state.trim(),

        price: formData.price.trim(),

        priceFrom:
          Number(formData.priceFrom) || 0,

        totalArea:
          formData.totalArea.trim(),

        possession:
          formData.possession.trim(),

        reraNumber:
          formData.reraNumber.trim(),

        image:
          formData.image.trim(),

        featured:
          Boolean(formData.featured),

        newProject:
          Boolean(formData.newProject),

        published:
          Boolean(formData.published),
      };

      await updateAuthorityProject(
        id,
        payload
      );

      navigate(
        "/admin/authority-projects"
      );
    } catch (err) {
      console.error(
        "Error updating authority project:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update authority project"
      );
    } finally {
      setSaving(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2
            size={22}
            className="animate-spin"
          />
          <span>
            Loading authority project...
          </span>
        </div>
      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-full bg-gray-50 p-6">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/authority-projects"
              )
            }
            className="mb-3 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft size={17} />
            Back to Authority Projects
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            Edit Authority Project
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update project information and
            website visibility.
          </p>
        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}


      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Project Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="Enter project name"
              />
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
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="Enter project description"
              />
            </div>

          </div>

        </section>


        {/* =================================================
            AUTHORITY
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Authority Information
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Authority *
              </label>

              <input
                type="text"
                name="authority"
                value={
                  formData.authority
                }
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="e.g. YEIDA"
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
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
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
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                RERA / Approval Number
              </label>

              <input
                type="text"
                name="reraNumber"
                value={
                  formData.reraNumber
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="Enter RERA / approval number"
              />
            </div>

          </div>

        </section>


        {/* =================================================
            LOCATION
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Location
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={
                  formData.location
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="Sector / locality"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="City"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="State"
              />
            </div>

          </div>

        </section>


        {/* =================================================
            PRICE & DETAILS
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Project Details
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="₹ 50 Lakhs"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Price From
              </label>

              <input
                type="number"
                name="priceFrom"
                value={
                  formData.priceFrom
                }
                onChange={handleChange}
                min="0"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="5000000"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Total Area
              </label>

              <input
                type="text"
                name="totalArea"
                value={
                  formData.totalArea
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="100 Acres"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Possession
              </label>

              <input
                type="text"
                name="possession"
                value={
                  formData.possession
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="2027"
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gray-900"
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

          </div>

        </section>


        {/* =================================================
            WEBSITE VISIBILITY
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Website Visibility
          </h2>

          <p className="mb-5 text-sm text-gray-500">
            Choose where this project should
            appear on the public website.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50">

              <input
                type="checkbox"
                name="featured"
                checked={
                  formData.featured
                }
                onChange={
                  handleCheckboxChange
                }
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="font-medium text-gray-900">
                  Featured Project
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Show inside Featured Projects.
                </p>
              </div>

            </label>


            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50">

              <input
                type="checkbox"
                name="newProject"
                checked={
                  formData.newProject
                }
                onChange={
                  handleCheckboxChange
                }
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="font-medium text-gray-900">
                  New Project
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Show inside New Projects.
                </p>
              </div>

            </label>


            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 hover:bg-gray-50">

              <input
                type="checkbox"
                name="published"
                checked={
                  formData.published
                }
                onChange={
                  handleCheckboxChange
                }
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="font-medium text-gray-900">
                  Published
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Make this project visible
                  publicly.
                </p>
              </div>

            </label>

          </div>

        </section>


        {/* =================================================
            IMAGES
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-2">
            <ImageIcon size={19} />
            <h2 className="text-lg font-semibold text-gray-900">
              Project Images
            </h2>
          </div>


          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Main Image URL
              </label>

              <input
                type="text"
                value={formData.image}
                onChange={
                  handleImageChange
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="https://..."
              />
            </div>


            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Other Image URLs
              </label>

              <textarea
                value={
                  formData.images.join(
                    "\n"
                  )
                }
                onChange={
                  handleImagesChange
                }
                rows={5}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
                placeholder="Enter one image URL per line"
              />
            </div>

          </div>

        </section>


        {/* =================================================
            FEATURES
        ================================================= */}

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
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Enter feature"
            />

            <button
              type="button"
              onClick={addFeature}
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={17} />
              Add
            </button>

          </div>


          {formData.features.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">

              {formData.features.map(
                (feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm"
                  >
                    <span>{feature}</span>

                    <button
                      type="button"
                      onClick={() =>
                        removeFeature(index)
                      }
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )
              )}

            </div>
          )}

        </section>


        {/* =================================================
            AMENITIES
        ================================================= */}

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
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Enter amenity"
            />

            <button
              type="button"
              onClick={addAmenity}
              className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <Plus size={17} />
              Add
            </button>

          </div>


          {formData.amenities.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">

              {formData.amenities.map(
                (amenity, index) => (
                  <div
                    key={`${amenity}-${index}`}
                    className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm"
                  >
                    <span>{amenity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        removeAmenity(index)
                      }
                      className="text-gray-500 hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )
              )}

            </div>
          )}

        </section>


        {/* =================================================
            PAYMENT PLANS
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Payment Plans
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <input
              type="text"
              name="name"
              value={paymentPlan.name}
              onChange={
                handlePaymentPlanChange
              }
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Plan name"
            />

            <input
              type="number"
              name="percentage"
              value={
                paymentPlan.percentage
              }
              onChange={
                handlePaymentPlanChange
              }
              min="0"
              max="100"
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Percentage"
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
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Description"
            />

          </div>


          <button
            type="button"
            onClick={addPaymentPlan}
            className="mt-4 flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus size={17} />
            Add Payment Plan
          </button>


          {formData.paymentPlans.length >
            0 && (
            <div className="mt-5 space-y-3">

              {formData.paymentPlans.map(
                (plan, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                  >

                    <div>
                      <p className="font-medium text-gray-900">
                        {plan.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {plan.percentage}%{" "}
                        {plan.description &&
                          `• ${plan.description}`}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removePaymentPlan(
                          index
                        )
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>
                )
              )}

            </div>
          )}

        </section>


        {/* =================================================
            DOCUMENTS
        ================================================= */}

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center gap-2">
            <FileText size={19} />

            <h2 className="text-lg font-semibold text-gray-900">
              Documents
            </h2>
          </div>


          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

            <input
              type="text"
              name="name"
              value={document.name}
              onChange={
                handleDocumentChange
              }
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Document name"
            />

            <input
              type="text"
              name="url"
              value={document.url}
              onChange={
                handleDocumentChange
              }
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              placeholder="Document URL"
            />

            <input
              type="text"
              name="type"
              value={document.type}
              onChange={
                handleDocumentChange
              }
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-gray-900"
              placeholder="PDF / Brochure"
            />

          </div>


          <button
            type="button"
            onClick={addDocument}
            className="mt-4 flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Plus size={17} />
            Add Document
          </button>


          {formData.documents.length >
            0 && (
            <div className="mt-5 space-y-3">

              {formData.documents.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                  >

                    <div>
                      <p className="font-medium text-gray-900">
                        {item.name}
                      </p>

                      <p className="mt-1 break-all text-xs text-gray-500">
                        {item.url}
                      </p>

                      {item.type && (
                        <span className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                          {item.type}
                        </span>
                      )}
                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        removeDocument(
                          index
                        )
                      }
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={17} />
                    </button>

                  </div>
                )
              )}

            </div>
          )}

        </section>


        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-5">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/authority-projects"
              )
            }
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>


          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
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

                Update Authority Project
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}

export default EditAuthorityProject;
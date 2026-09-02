import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  Check,
  Loader2,
  Save,
  X,
} from "lucide-react";

import {
  getPropertyById,
  updateProperty,
} from "../../services/propertyService";


/* =========================================================
   DEFAULT FORM
========================================================= */

const defaultForm = {
  title: "",
  propertyName: "",
  propertyType: "",
  category: "",
  status: "Available",

  location: "",
  city: "",
  state: "",
  address: "",

  price: "",
  priceUnit: "Lakh",

  bedrooms: "",
  bathrooms: "",
  balconies: "",
  parking: "",

  area: "",
  areaUnit: "sq.ft",

  floor: "",
  totalFloors: "",

  furnishing: "",

  possession: "",

  description: "",

  amenities: [],

  images: [],
};


/* =========================================================
   AMENITIES
========================================================= */

const AMENITIES = [
  "Swimming Pool",
  "Gym",
  "Club House",
  "Parking",
  "Security",
  "Power Backup",
  "Lift",
  "Garden",
  "Park",
  "Children Play Area",
  "CCTV",
  "Gated Community",
];


/* =========================================================
   COMPONENT
========================================================= */

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(defaultForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  /* =======================================================
     GET PROPERTY
  ======================================================= */

  useEffect(() => {
    if (!id) {
      setError("Property ID is missing.");
      setLoading(false);
      return;
    }

    fetchProperty();
  }, [id]);


  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getPropertyById(id);

      /*
       * Backend response commonly:
       *
       * {
       *   success: true,
       *   data: {...}
       * }
       *
       * OR directly:
       *
       * {...}
       */

      const property =
        response?.data ||
        response?.property ||
        response;

      if (!property) {
        throw new Error("Property not found.");
      }

      setForm({
        ...defaultForm,

        ...property,

        /*
         * Keep arrays safe
         */
        amenities: Array.isArray(property.amenities)
          ? property.amenities
          : [],

        images: Array.isArray(property.images)
          ? property.images
          : [],
      });

    } catch (err) {
      console.error("Failed to fetch property:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load property."
      );
    } finally {
      setLoading(false);
    }
  };


  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };


  /* =======================================================
     AMENITY TOGGLE
  ======================================================= */

  const toggleAmenity = (amenity) => {
    setForm((prev) => {
      const exists = prev.amenities.includes(amenity);

      return {
        ...prev,

        amenities: exists
          ? prev.amenities.filter(
              (item) => item !== amenity
            )
          : [...prev.amenities, amenity],
      };
    });
  };


  /* =======================================================
     REMOVE IMAGE
  ======================================================= */

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,

      images: prev.images.filter(
        (_, imageIndex) => imageIndex !== index
      ),
    }));
  };


  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      setError("Property ID is missing.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        ...form,
      };

      await updateProperty(id, payload);

      setSuccess("Property updated successfully.");

      /*
       * Give user a moment to see success message
       */
      setTimeout(() => {
        navigate("/admin/properties");
      }, 700);

    } catch (err) {
      console.error("Failed to update property:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to update property."
      );
    } finally {
      setSaving(false);
    }
  };


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-[600px] rounded-2xl bg-white flex items-center justify-center border border-slate-200">

        <div className="flex flex-col items-center gap-3">

          <Loader2
            size={30}
            className="animate-spin text-[#b88b32]"
          />

          <p className="text-sm font-semibold text-slate-600">
            Loading property...
          </p>

        </div>

      </div>
    );
  }


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="space-y-5">


      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl">

        <div className="flex flex-col gap-4 px-5 py-5 sm:px-7 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() => navigate("/admin/properties")}
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <ArrowLeft size={18} />
            </button>


            <div>

              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
                Admin Panel
              </p>

              <h1 className="mt-1 text-xl font-extrabold text-slate-950 sm:text-2xl">
                Edit Property
              </h1>

              <p className="mt-1 text-xs text-slate-400">
                Update property information
              </p>

            </div>

          </div>


          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={() =>
                navigate("/admin/properties")
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                px-4
                py-2.5
                text-xs
                font-bold
                text-slate-600
                hover:bg-slate-50
              "
            >
              <X size={15} />
              Cancel
            </button>


            <button
              type="submit"
              form="edit-property-form"
              disabled={saving}
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-slate-950
                px-4
                py-2.5
                text-xs
                font-bold
                text-white
                transition
                hover:bg-slate-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {saving ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={15} />
                  Update Property
                </>
              )}

            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          ALERTS
      ====================================================== */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}


      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">

          <Check size={17} />

          {success}

        </div>
      )}


      {/* =====================================================
          FORM
      ====================================================== */}

      <form
        id="edit-property-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >


        {/* ===================================================
            BASIC INFORMATION
        ==================================================== */}

        <FormSection
          icon={<Building2 size={18} />}
          title="Basic Information"
          description="Update the basic details of this property."
        >

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <Input
              label="Property Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter property title"
              required
            />


            <Input
              label="Property Name"
              name="propertyName"
              value={form.propertyName}
              onChange={handleChange}
              placeholder="Enter property name"
            />


            <Select
              label="Property Type"
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              options={[
                "Residential",
                "Commercial",
                "Plot",
                "Villa",
                "Apartment",
                "Office",
                "Shop",
                "Warehouse",
              ]}
            />


            <Select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              options={[
                "For Sale",
                "For Rent",
                "New Launch",
                "Resale",
              ]}
            />


            <Select
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                "Available",
                "Sold",
                "Booked",
                "Under Construction",
                "Coming Soon",
                "Inactive",
              ]}
            />

          </div>

        </FormSection>


        {/* ===================================================
            LOCATION
        ==================================================== */}

        <FormSection
          title="Location Details"
          description="Update the property location."
        >

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <Input
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Sector 150, Noida"
            />


            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
            />


            <Input
              label="State"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
            />

          </div>


          <div className="mt-5">

            <Textarea
              label="Full Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter complete property address"
            />

          </div>

        </FormSection>


        {/* ===================================================
            PRICE
        ==================================================== */}

        <FormSection
          title="Price & Area"
          description="Update pricing and property size."
        >

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

            <Input
              label="Price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
            />


            <Select
              label="Price Unit"
              name="priceUnit"
              value={form.priceUnit}
              onChange={handleChange}
              options={[
                "Lakh",
                "Crore",
                "Thousand",
                "Million",
              ]}
            />


            <Input
              label="Area"
              name="area"
              type="number"
              value={form.area}
              onChange={handleChange}
              placeholder="Enter area"
            />


            <Select
              label="Area Unit"
              name="areaUnit"
              value={form.areaUnit}
              onChange={handleChange}
              options={[
                "sq.ft",
                "sq.yd",
                "sq.m",
                "acre",
                "hectare",
              ]}
            />

          </div>

        </FormSection>


        {/* ===================================================
            PROPERTY DETAILS
        ==================================================== */}

        <FormSection
          title="Property Details"
          description="Update property specifications."
        >

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <Input
              label="Bedrooms / BHK"
              name="bedrooms"
              type="number"
              value={form.bedrooms}
              onChange={handleChange}
              placeholder="e.g. 3"
            />


            <Input
              label="Bathrooms"
              name="bathrooms"
              type="number"
              value={form.bathrooms}
              onChange={handleChange}
              placeholder="e.g. 2"
            />


            <Input
              label="Balconies"
              name="balconies"
              type="number"
              value={form.balconies}
              onChange={handleChange}
              placeholder="e.g. 2"
            />


            <Input
              label="Parking"
              name="parking"
              value={form.parking}
              onChange={handleChange}
              placeholder="e.g. 2 Cars"
            />


            <Input
              label="Floor"
              name="floor"
              value={form.floor}
              onChange={handleChange}
              placeholder="e.g. 5"
            />


            <Input
              label="Total Floors"
              name="totalFloors"
              value={form.totalFloors}
              onChange={handleChange}
              placeholder="e.g. 20"
            />


            <Select
              label="Furnishing"
              name="furnishing"
              value={form.furnishing}
              onChange={handleChange}
              options={[
                "Unfurnished",
                "Semi Furnished",
                "Fully Furnished",
              ]}
            />


            <Input
              label="Possession"
              name="possession"
              value={form.possession}
              onChange={handleChange}
              placeholder="e.g. Dec 2027"
            />

          </div>

        </FormSection>


        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        <FormSection
          title="Description"
          description="Update the property description."
        >

          <Textarea
            label="Property Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write property description..."
            rows={7}
          />

        </FormSection>


        {/* ===================================================
            AMENITIES
        ==================================================== */}

        <FormSection
          title="Amenities"
          description="Select all amenities available with this property."
        >

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

            {AMENITIES.map((amenity) => {

              const selected =
                form.amenities.includes(amenity);

              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() =>
                    toggleAmenity(amenity)
                  }
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    transition
                    ${
                      selected
                        ? "border-[#d6a84f] bg-[#faf5e9] text-slate-900"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"
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
                          : "border-slate-300"
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
            })}

          </div>

        </FormSection>


        {/* ===================================================
            EXISTING IMAGES
        ==================================================== */}

        {form.images.length > 0 && (
          <FormSection
            title="Property Images"
            description="Existing images attached to this property."
          >

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

              {form.images.map((image, index) => {

                const imageUrl =
                  typeof image === "string"
                    ? image
                    : image?.url ||
                      image?.secure_url ||
                      image?.path ||
                      "";

                return (
                  <div
                    key={index}
                    className="
                      group
                      relative
                      aspect-[4/3]
                      overflow-hidden
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-100
                    "
                  >

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={`Property ${index + 1}`}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-slate-400">
                        Image unavailable
                      </div>
                    )}


                    <button
                      type="button"
                      onClick={() =>
                        removeImage(index)
                      }
                      className="
                        absolute
                        right-2
                        top-2
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        bg-red-500
                        text-white
                        opacity-0
                        transition
                        group-hover:opacity-100
                      "
                    >
                      <X size={15} />
                    </button>

                  </div>
                );
              })}

            </div>

          </FormSection>
        )}


        {/* ===================================================
            BOTTOM ACTIONS
        ==================================================== */}

        <div className="flex flex-col-reverse gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">

          <button
            type="button"
            onClick={() =>
              navigate("/admin/properties")
            }
            className="
              rounded-xl
              px-5
              py-3
              text-xs
              font-bold
              text-slate-500
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
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-slate-950
              px-6
              py-3
              text-xs
              font-bold
              text-white
              transition
              hover:bg-slate-800
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {saving ? (
              <>
                <Loader2
                  size={15}
                  className="animate-spin"
                />
                Updating Property...
              </>
            ) : (
              <>
                <Save size={15} />
                Update Property
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
}


/* =============================================================
   FORM SECTION
============================================================= */

function FormSection({
  title,
  description,
  icon,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">

        <div className="flex items-center gap-3">

          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faf5e9] text-[#b88b32]">
              {icon}
            </div>
          )}

          <div>

            <h2 className="text-sm font-extrabold text-slate-950 sm:text-base">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-[11px] text-slate-400">
                {description}
              </p>
            )}

          </div>

        </div>

      </div>


      <div className="p-5 sm:p-6">
        {children}
      </div>

    </section>
  );
}


/* =============================================================
   INPUT
============================================================= */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-bold text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-300
          focus:border-[#d6a84f]
          focus:ring-2
          focus:ring-[#d6a84f]/10
        "
      />

    </div>
  );
}


/* =============================================================
   SELECT
============================================================= */

function Select({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-bold text-slate-700"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          text-slate-900
          outline-none
          transition
          focus:border-[#d6a84f]
          focus:ring-2
          focus:ring-[#d6a84f]/10
        "
      >

        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}


/* =============================================================
   TEXTAREA
============================================================= */

function Textarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 5,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-bold text-slate-700"
      >
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="
          w-full
          resize-y
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-3
          text-sm
          text-slate-900
          outline-none
          transition
          placeholder:text-slate-300
          focus:border-[#d6a84f]
          focus:ring-2
          focus:ring-[#d6a84f]/10
        "
      />

    </div>
  );
}


export default EditProperty;
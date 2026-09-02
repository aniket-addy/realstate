import { useEffect, useState } from "react";

import {
  X,
  User,
  Phone,
  Mail,
  MessageSquare,
  Building2,
  Send,
  CheckCircle2,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/leads";

function EnquiryModal({
  isOpen,
  onClose,
  property,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // RESET FORM
  // ==========================================

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });

      setSubmitted(false);
      setLoading(false);
    }
  }, [isOpen]);

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // SUBMIT ENQUIRY
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!formData.phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    // -----------------------------
    // PROPERTY DATA
    // -----------------------------

    const propertyId =
      property?._id || null;

    const propertyTitle =
      property?.title ||
      property?.name ||
      "Selected Property";

    // -----------------------------
    // DEBUG
    // -----------------------------

    console.log("================================");
    console.log("SENDING LEAD TO BACKEND");
    console.log("Name:", formData.name);
    console.log("Phone:", formData.phone);
    console.log("Email:", formData.email);
    console.log("Message:", formData.message);
    console.log("Property ID:", propertyId);
    console.log("Property Title:", propertyTitle);
    console.log("API:", API_URL);
    console.log("================================");

    try {
      setLoading(true);

      // ==========================================
      // SEND DATA TO BACKEND
      // ==========================================

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.name.trim(),

          phone: formData.phone.trim(),

          email: formData.email
            .trim()
            .toLowerCase(),

          message: formData.message.trim(),

          property: propertyId,

          propertyTitle: propertyTitle,
        }),
      });

      // ==========================================
      // READ RESPONSE
      // ==========================================

      const result = await response.json();

      console.log(
        "BACKEND RESPONSE:",
        result
      );

      // ==========================================
      // ERROR
      // ==========================================

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to submit enquiry"
        );
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      console.log(
        "✅ LEAD SAVED IN MONGODB",
        result.data
      );

      setSubmitted(true);
    } catch (error) {
      console.error(
        "❌ LEAD SUBMISSION ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to submit enquiry. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DON'T RENDER
  // ==========================================

  if (!isOpen) {
    return null;
  }

  // ==========================================
  // PROPERTY TITLE
  // ==========================================

  const propertyTitle =
    property?.title ||
    property?.name ||
    "Selected Property";

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/60
        px-4
        py-6
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      {/* =====================================
          MODAL
      ===================================== */}

      <div
        className="
          relative
          w-full
          max-w-lg
          max-h-[92vh]
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        {/* =====================================
            HEADER
        ===================================== */}

        <div
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            border-b
            border-gray-100
            bg-white
            px-5
            py-4
          "
        >
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-[#0b2a4a]
              "
            >
              Get in Touch
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              Enquire about this property
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-gray-500
              transition
              hover:bg-gray-200
              hover:text-gray-900
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* =====================================
            SUCCESS
        ===================================== */}

        {submitted ? (
          <div
            className="
              flex
              flex-col
              items-center
              px-6
              py-12
              text-center
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-green-50
                text-green-600
              "
            >
              <CheckCircle2 size={34} />
            </div>

            <h3
              className="
                mt-5
                text-xl
                font-bold
                text-gray-900
              "
            >
              Enquiry Submitted
            </h3>

            <p
              className="
                mt-2
                max-w-sm
                text-sm
                leading-6
                text-gray-500
              "
            >
              Thank you for your interest.
              Our team will contact you
              shortly.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="
                mt-6
                rounded-xl
                bg-[#0b2a4a]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#123e65]
              "
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="px-5 py-5"
          >
            {/* =================================
                PROPERTY
            ================================= */}

            <div
              className="
                mb-5
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                p-3
              "
            >
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-gray-700
                  shadow-sm
                "
              >
                <Building2 size={20} />
              </div>

              <div className="min-w-0">
                <p
                  className="
                    text-xs
                    font-medium
                    text-gray-500
                  "
                >
                  Enquiring About
                </p>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-sm
                    font-bold
                    text-gray-900
                  "
                >
                  {propertyTitle}
                </p>
              </div>
            </div>

            {/* =================================
                NAME
            ================================= */}

            <FormField
              label="Full Name"
              icon={<User size={17} />}
              required
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={inputClass}
              />
            </FormField>

            {/* =================================
                PHONE
            ================================= */}

            <FormField
              label="Phone Number"
              icon={<Phone size={17} />}
              required
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={inputClass}
              />
            </FormField>

            {/* =================================
                EMAIL
            ================================= */}

            <FormField
              label="Email Address"
              icon={<Mail size={17} />}
              required
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={inputClass}
              />
            </FormField>

            {/* =================================
                MESSAGE
            ================================= */}

            <FormField
              label="Message"
              icon={
                <MessageSquare size={17} />
              }
            >
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="I'm interested in this property. Please share more details..."
                className={`${inputClass} resize-none`}
              />
            </FormField>

            {/* =================================
                SUBMIT
            ================================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                mt-2
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#0b2a4a]
                px-5
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition
                hover:bg-[#123e65]
                active:scale-[0.99]
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
                      border-white/40
                      border-t-white
                    "
                  />

                  Sending...
                </>
              ) : (
                <>
                  <Send size={17} />
                  Send Enquiry
                </>
              )}
            </button>

            <p
              className="
                mt-3
                text-center
                text-xs
                leading-5
                text-gray-400
              "
            >
              By submitting this form, you
              agree to be contacted regarding
              this property.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ==========================================
// FORM FIELD
// ==========================================

function FormField({
  label,
  icon,
  required = false,
  children,
}) {
  return (
    <div className="mb-4">
      <label
        className="
          mb-2
          flex
          items-center
          gap-2
          text-sm
          font-semibold
          text-gray-700
        "
      >
        <span className="text-gray-500">
          {icon}
        </span>

        {label}

        {required && (
          <span className="text-red-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  );
}

// ==========================================
// INPUT STYLE
// ==========================================

const inputClass = `
  w-full
  rounded-xl
  border
  border-gray-200
  bg-gray-50
  px-4
  py-3
  text-sm
  text-gray-900
  outline-none
  transition
  placeholder:text-gray-400
  focus:border-[#0b2a4a]
  focus:bg-white
  focus:ring-2
  focus:ring-[#0b2a4a]/10
`;

export default EnquiryModal;
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Contact Form:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      phone: "",
      email: "",
      requirement: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="bg-slate-950 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-slate-900 lg:grid-cols-[0.9fr_1.1fr]">

          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <div className="relative overflow-hidden p-7 sm:p-10 lg:p-12">

            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border border-[#d6a84f]/10" />
            <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full border border-[#d6a84f]/10" />

            <div className="relative">

              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-7 bg-[#d6a84f]" />

                <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#e0b65c]">
                  Let's Connect
                </span>
              </div>

              <h2 className="max-w-md text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl">
                Let's Find Your
                <span className="block text-[#e0b65c]">
                  Next Property
                </span>
              </h2>

              <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                Tell us what you are looking for and our property experts
                will help you find suitable options.
              </p>

              {/* Contact details */}
              <div className="mt-8 space-y-4">

                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <Phone
                      size={16}
                      className="text-[#e0b65c]"
                    />
                  </span>

                  <span>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                      Call Us
                    </span>

                    <span className="mt-0.5 block text-xs font-bold text-white">
                      +91 98765 43210
                    </span>
                  </span>
                </a>

                <a
                  href="mailto:hello@investorise.com"
                  className="flex items-center gap-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <Mail
                      size={16}
                      className="text-[#e0b65c]"
                    />
                  </span>

                  <span>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                      Email Us
                    </span>

                    <span className="mt-0.5 block text-xs font-bold text-white">
                      hello@investorise.com
                    </span>
                  </span>
                </a>

                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                    <MapPin
                      size={16}
                      className="text-[#e0b65c]"
                    />
                  </span>

                  <span>
                    <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                      Serving
                    </span>

                    <span className="mt-0.5 block text-xs font-bold text-white">
                      Delhi NCR & Growth Markets
                    </span>
                  </span>
                </div>

              </div>

              {/* Trust points */}
              <div className="mt-8 border-t border-white/10 pt-6">

                {[
                  "Quick response from our team",
                  "Personalized property recommendations",
                  "No-obligation consultation",
                ].map((item) => (
                  <div
                    key={item}
                    className="mb-2.5 flex items-center gap-2"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-[#e0b65c]"
                    />

                    <span className="text-[10px] text-slate-400">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>
          </div>

          {/* =====================================================
              FORM
          ====================================================== */}

          <div className="bg-white p-6 sm:p-10 lg:p-12">

            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">
                Get In Touch
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Fill in your details and our team will contact you.
              </p>
            </div>

            {submitted && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-semibold text-green-700">
                <CheckCircle2 size={16} />
                Thank you! Our team will contact you shortly.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* Name + Phone */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      handleChange("name", e.target.value)
                    }
                    placeholder="Your name"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-800 outline-none transition focus:border-[#c49a43] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      handleChange("phone", e.target.value)
                    }
                    placeholder="+91"
                    className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-800 outline-none transition focus:border-[#c49a43] focus:bg-white"
                  />
                </div>

              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Email Address
                </label>

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-800 outline-none transition focus:border-[#c49a43] focus:bg-white"
                />
              </div>

              {/* Requirement */}
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  I'm Looking For
                </label>

                <select
                  required
                  value={formData.requirement}
                  onChange={(e) =>
                    handleChange(
                      "requirement",
                      e.target.value
                    )
                  }
                  className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-medium text-slate-800 outline-none transition focus:border-[#c49a43] focus:bg-white"
                >
                  <option value="">
                    Select requirement
                  </option>
                  <option value="residential">
                    Residential Property
                  </option>
                  <option value="commercial">
                    Commercial Property
                  </option>
                  <option value="plot">
                    Residential Plot
                  </option>
                  <option value="investment">
                    Investment Opportunity
                  </option>
                  <option value="consultation">
                    Investment Consultation
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Message
                </label>

                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    handleChange("message", e.target.value)
                  }
                  placeholder="Tell us about your requirement..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-xs font-medium text-slate-800 outline-none transition focus:border-[#c49a43] focus:bg-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-slate-900 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <Send size={15} />

                Submit Enquiry

                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>

              <p className="text-center text-[9px] leading-4 text-slate-400">
                By submitting this form, you agree to be contacted by our
                property advisory team.
              </p>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;
import { useState } from "react";

import {
  CheckCircle2,
  Mail,
  Phone,
  Send,
  User,
} from "lucide-react";

function ProjectInquiry({ project }) {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
      Backend developer ke API ready hone ke baad
      yahan POST request add karenge.

      Example:

      await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId: project?._id,
          ...form,
        }),
      });
    */

    console.log("Project Inquiry:", {
      projectId: project?._id || project?.id,
      projectName: project?.name,
      ...form,
    });

    setSubmitted(true);
  };

  return (
    <section className="bg-[#0f172a] py-16 sm:py-20">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">

        <div className="grid gap-10 lg:grid-cols-[1fr_450px] lg:items-center">

          {/* =========================================
              LEFT CONTENT
          ========================================== */}

          <div>

            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d6a84f]">
              Enquire Now
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Interested in{" "}
              <span className="text-[#d6a84f]">
                {project?.name || "this project"}?
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
              Share your details and our property advisor will get in touch
              with you to discuss pricing, availability and the next steps.
            </p>

            {/* Benefits */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Phone
                    size={17}
                    className="text-[#d6a84f]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Personalised assistance
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Get guidance from our property advisor.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <CheckCircle2
                    size={17}
                    className="text-[#d6a84f]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Latest pricing & availability
                  </p>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Get the latest project information.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* =========================================
              INQUIRY FORM
          ========================================== */}

          <div className="rounded-2xl bg-white p-6 shadow-2xl sm:p-7">

            {submitted ? (

              /* =====================================
                 SUCCESS MESSAGE
              ====================================== */

              <div className="py-12 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle2
                    size={32}
                    className="text-green-600"
                  />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#0f172a]">
                  Thank You!
                </h3>

                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
                  Your inquiry has been received. Our property advisor
                  will contact you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);

                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      message: "",
                    });
                  }}
                  className="mt-6 text-sm font-bold text-[#b88b32] hover:underline"
                >
                  Submit another inquiry
                </button>

              </div>

            ) : (

              /* =====================================
                 FORM
              ====================================== */

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <div className="mb-5">

                  <h3 className="text-xl font-bold text-[#0f172a]">
                    Request Project Details
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Fill in your details and we will get back to you.
                  </p>

                </div>

                {/* NAME */}

                <div>

                  <label
                    htmlFor="inquiry-name"
                    className="mb-1.5 block text-xs font-semibold text-slate-600"
                  >
                    Your Name
                  </label>

                  <div className="relative">

                    <User
                      size={16}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      id="inquiry-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Enter your name"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        py-3
                        pl-10
                        pr-3
                        text-sm
                        text-[#0f172a]
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-[#d6a84f]
                        focus:ring-2
                        focus:ring-[#d6a84f]/10
                      "
                    />

                  </div>

                </div>

                {/* PHONE */}

                <div>

                  <label
                    htmlFor="inquiry-phone"
                    className="mb-1.5 block text-xs font-semibold text-slate-600"
                  >
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={16}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      id="inquiry-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      placeholder="Enter phone number"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        py-3
                        pl-10
                        pr-3
                        text-sm
                        text-[#0f172a]
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-[#d6a84f]
                        focus:ring-2
                        focus:ring-[#d6a84f]/10
                      "
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="inquiry-email"
                    className="mb-1.5 block text-xs font-semibold text-slate-600"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={16}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />

                    <input
                      id="inquiry-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="Enter email address"
                      className="
                        w-full
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        py-3
                        pl-10
                        pr-3
                        text-sm
                        text-[#0f172a]
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-[#d6a84f]
                        focus:ring-2
                        focus:ring-[#d6a84f]/10
                      "
                    />

                  </div>

                </div>

                {/* MESSAGE */}

                <div>

                  <label
                    htmlFor="inquiry-message"
                    className="mb-1.5 block text-xs font-semibold text-slate-600"
                  >
                    Message
                  </label>

                  <textarea
                    id="inquiry-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us what you are looking for..."
                    className="
                      w-full
                      resize-none
                      rounded-lg
                      border
                      border-slate-200
                      bg-white
                      px-3
                      py-3
                      text-sm
                      text-[#0f172a]
                      outline-none
                      transition
                      placeholder:text-slate-400
                      focus:border-[#d6a84f]
                      focus:ring-2
                      focus:ring-[#d6a84f]/10
                    "
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#d6a84f]
                    px-5
                    py-3.5
                    text-sm
                    font-bold
                    text-[#0f172a]
                    transition
                    hover:bg-[#e0b65c]
                    active:scale-[0.99]
                  "
                >
                  Send Inquiry

                  <Send size={16} />

                </button>

                <p className="pt-1 text-center text-[10px] text-slate-400">
                  Your information is kept confidential.
                </p>

              </form>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProjectInquiry;
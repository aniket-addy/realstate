import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from "lucide-react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form data:", formData);

    alert("Thank you! Our team will contact you shortly.");

    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#0b1b36]">

      {/* =====================================================
          STICKY NAVBAR
      ===================================================== */}
      <div className="sticky top-0 z-[100] w-full">
        <Navbar />
      </div>


      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="w-full overflow-x-hidden">

        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="relative w-full overflow-hidden bg-[#0b1b36]">

          {/* Background decoration */}
          <div
            className="
              pointer-events-none
              absolute
              -right-40
              -top-40
              h-[420px]
              w-[420px]
              rounded-full
              bg-[#d6a84f]/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              left-[-100px]
              h-[380px]
              w-[380px]
              rounded-full
              bg-blue-500/5
              blur-3xl
            "
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            <div className="max-w-4xl py-20 sm:py-24 lg:py-28">

              {/* Label */}
              <div className="mb-6 flex items-center gap-3">

                <span className="h-[2px] w-9 shrink-0 bg-[#d6a84f]" />

                <span
                  className="
                    text-[11px]
                    font-extrabold
                    uppercase
                    tracking-[0.22em]
                    text-[#d6a84f]
                    sm:text-xs
                  "
                >
                  Contact Investorise
                </span>

              </div>


              {/* Heading */}
<h1
  className="
    m-0
    max-w-4xl
    text-4xl
    font-extrabold
    leading-[1.04]
    tracking-[-0.045em]
    sm:text-5xl
    lg:text-7xl
  "
>
  <span className="text-white">
    Let's Talk About
  </span>

  <span className="block text-[#d6a84f]">
    Your Investment.
  </span>
</h1>

              {/* Description */}
              <p
                className="
                  mt-6
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/75
                  sm:text-base
                  sm:leading-8
                "
              >
                Have a question about a project, property or investment
                opportunity? Our team is here to help you make a smarter
                real estate decision.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            CONTACT INFORMATION + FORM
        ===================================================== */}
        <section className="w-full bg-white py-16 sm:py-20 lg:py-24">

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            <div
              className="
                grid
                min-w-0
                grid-cols-1
                gap-12
                lg:grid-cols-[0.82fr_1.18fr]
                lg:gap-16
              "
            >

              {/* =================================================
                  LEFT - CONTACT INFORMATION
              ================================================= */}
              <div className="min-w-0">

                {/* Section Label */}
                <div className="mb-4 flex items-center gap-2">

                  <span className="h-px w-8 bg-[#d6a84f]" />

                  <span
                    className="
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.22em]
                      text-[#b88b32]
                    "
                  >
                    Get In Touch
                  </span>

                </div>


                {/* Heading */}
                <h2
                  className="
                    m-0
                    max-w-lg
                    text-3xl
                    font-extrabold
                    leading-[1.08]
                    tracking-[-0.035em]
                    text-[#0b1b36]
                    sm:text-4xl
                    lg:text-5xl
                  "
                >
                  We're Here To

                  <span className="block text-[#b88b32]">
                    Help You.
                  </span>
                </h2>


                {/* Description */}
                <p
                  className="
                    mt-5
                    max-w-lg
                    text-sm
                    leading-7
                    text-slate-500
                    sm:text-base
                    sm:leading-8
                  "
                >
                  Whether you are buying your first property or looking
                  for your next investment opportunity, our team is ready
                  to guide you.
                </p>


                {/* =================================================
                    CONTACT ITEMS
                ================================================= */}
                <div className="mt-9 space-y-6">

                  <ContactItem
                    icon={<MapPin size={19} strokeWidth={1.8} />}
                    title="Office Address"
                    text={
                      <>
                        Investorise Real Estate Advisory
                        <br />
                        Noida, Uttar Pradesh, India
                      </>
                    }
                  />

                  <ContactItem
                    icon={<Phone size={19} strokeWidth={1.8} />}
                    title="Phone"
                    text="+91 98765 43210"
                  />

                  <ContactItem
                    icon={<Mail size={19} strokeWidth={1.8} />}
                    title="Email"
                    text="info@investorise.in"
                  />

                  <ContactItem
                    icon={<Clock3 size={19} strokeWidth={1.8} />}
                    title="Working Hours"
                    text={
                      <>
                        Monday - Saturday
                        <br />
                        10:00 AM - 7:00 PM
                      </>
                    }
                  />

                </div>


                {/* =================================================
                    SOCIAL
                ================================================= */}
                <div className="mt-10 border-t border-slate-200 pt-7">

                  <p
                    className="
                      text-xs
                      font-extrabold
                      uppercase
                      tracking-[0.15em]
                      text-[#0b1b36]
                    "
                  >
                    Follow Us
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">

                    <SocialButton label="IG" />

                    <SocialButton label="FB" />

                    <SocialButton label="in" />

                    <SocialButton label="YT" />

                  </div>

                </div>

              </div>


              {/* =================================================
                  RIGHT - FORM
              ================================================= */}
              <div
                className="
                  min-w-0
                  rounded-3xl
                  border
                  border-slate-200
                  bg-[#f8fafc]
                  p-5
                  shadow-[0_15px_45px_rgba(11,27,54,0.06)]
                  sm:p-7
                  lg:p-9
                "
              >

                {/* Form Heading */}
                <div className="mb-7">

                  <h3
                    className="
                      m-0
                      text-2xl
                      font-extrabold
                      leading-tight
                      text-[#0b1b36]
                      sm:text-3xl
                    "
                  >
                    Send Us a Message
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    Fill in your details and our team will get back to you.
                  </p>

                </div>


                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* Full Name */}
                  <FormField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />


                  {/* Phone + Email */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    <FormField
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <FormField
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />

                  </div>


                  {/* Subject */}
                  <FormField
                    label="Subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={handleChange}
                  />


                  {/* Message */}
                  <div>

                    <label
                      htmlFor="message"
                      className="
                        mb-2
                        block
                        text-xs
                        font-bold
                        text-[#0b1b36]
                      "
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirement..."
                      className="
                        block
                        min-h-[150px]
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-slate-800
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-[#d6a84f]
                        focus:ring-2
                        focus:ring-[#d6a84f]/15
                      "
                    />

                  </div>


                  {/* =================================================
                      SEND MESSAGE BUTTON
                  ================================================= */}
                  <button
                    type="submit"
                    className="
                      group
                      flex
                      min-h-[54px]
                      w-full
                      items-center
                      justify-center
                      gap-3
                      rounded-xl
                      bg-[#0b1b36]
                      px-6
                      py-3
                      text-base
                      font-bold
                      text-white
                      shadow-[0_8px_20px_rgba(11,27,54,0.15)]
                      transition-all
                      duration-200
                      hover:bg-[#132847]
                      hover:shadow-[0_12px_25px_rgba(11,27,54,0.2)]
                      active:scale-[0.99]
                    "
                  >
                    <span className="text-white">
                      Send Message
                    </span>

                    <ArrowRight
                      size={18}
                      className="
                        text-white
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                      "
                    />

                  </button>

                </form>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            MAP
        ===================================================== */}
        <section className="w-full bg-[#f8fafc] py-16 sm:py-20 lg:py-24">

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            {/* Heading */}
            <div className="mb-7">

              <div className="flex items-center gap-2">

                <span className="h-px w-8 bg-[#d6a84f]" />

                <span
                  className="
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-[0.22em]
                    text-[#b88b32]
                  "
                >
                  Find Us
                </span>

              </div>

              <h2
                className="
                  mt-2
                  m-0
                  text-3xl
                  font-extrabold
                  tracking-[-0.03em]
                  text-[#0b1b36]
                  sm:text-4xl
                "
              >
                Visit Our Office
              </h2>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Find our office in Noida and connect with our real estate
                advisory team.
              </p>

            </div>


            {/* Map */}
            <div
              className="
                w-full
                overflow-hidden
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-[0_12px_35px_rgba(11,27,54,0.07)]
              "
            >

              <iframe
                title="Investorise Office Location"
                src="https://www.google.com/maps?q=Noida,Uttar+Pradesh,India&output=embed"
                className="
                  block
                  h-[320px]
                  w-full
                  border-0
                  sm:h-[400px]
                  lg:h-[470px]
                "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            CALL TO ACTION
        ===================================================== */}
        <section className="w-full bg-white py-12 sm:py-16">

          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-[#0b1b36]
                px-6
                py-10
                shadow-[0_15px_45px_rgba(11,27,54,0.12)]
                sm:px-10
                sm:py-12
                lg:px-14
                lg:py-14
              "
            >

              {/* Decorative circle */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-64
                  w-64
                  rounded-full
                  bg-[#d6a84f]/10
                  blur-2xl
                "
              />

              <div
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  gap-8
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                "
              >

                {/* CTA Content */}
                <div className="max-w-2xl">

                  <div className="mb-3 flex items-center gap-2">

                    <span className="h-px w-7 bg-[#d6a84f]" />

                    <span
                      className="
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.2em]
                        text-[#d6a84f]
                      "
                    >
                      Let's Build Your Future
                    </span>

                  </div>

                  <h2
                    className="
                      m-0
                      text-3xl
                      font-extrabold
                      leading-tight
                      tracking-[-0.03em]
                      text-white
                      sm:text-4xl
                      lg:text-5xl
                    "
                  >
                    Ready to Make a Smarter{" "}
                    <span className="text-[#d6a84f]">
                      Property Decision?
                    </span>
                  </h2>

                  <p
                    className="
                      mt-4
                      max-w-xl
                      text-sm
                      leading-7
                      text-white/70
                      sm:text-base
                    "
                  >
                    Connect with Investorise today and let our team help
                    you find the right property, project and location for
                    your goals.
                  </p>

                </div>


                {/* CTA Buttons */}
                <div
                  className="
                    flex
                    w-full
                    flex-col
                    gap-3
                    sm:w-auto
                    sm:flex-row
                    lg:shrink-0
                  "
                >

                  {/* Call */}
                  <a
                    href="tel:+919876543210"
                    className="
                      inline-flex
                      min-h-[52px]
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#d6a84f]
                      px-6
                      text-sm
                      font-extrabold
                      text-[#0b1b36]
                      no-underline
                      transition
                      hover:bg-[#e2bb68]
                    "
                  >
                    <Phone size={17} />

                    <span className="text-[#0b1b36]">
                      Call Us Now
                    </span>

                    <ArrowRight size={17} />
                  </a>


                  {/* WhatsApp */}
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex
                      min-h-[52px]
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-white/30
                      bg-white/10
                      px-6
                      text-sm
                      font-bold
                      text-white
                      no-underline
                      transition
                      hover:bg-white/15
                    "
                  >
                    <MessageCircle size={17} />

                    <span className="text-white">
                      WhatsApp Us
                    </span>

                  </a>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}
      <div className="w-full overflow-hidden">
        <Footer />
      </div>

    </div>
  );
}


/* =============================================================
   CONTACT ITEM
============================================================= */

function ContactItem({ icon, title, text }) {
  return (
    <div className="flex min-w-0 gap-4">

      {/* Icon */}
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-[#d6a84f]/30
          bg-[#faf6ed]
          text-[#b88b32]
        "
      >
        {icon}
      </div>


      {/* Text */}
      <div className="min-w-0 pt-0.5">

        <h3
          className="
            m-0
            text-sm
            font-extrabold
            text-[#0b1b36]
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-1.5
            break-words
            text-sm
            leading-6
            text-slate-500
          "
        >
          {text}
        </div>

      </div>

    </div>
  );
}


/* =============================================================
   FORM FIELD
============================================================= */

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="min-w-0">

      <label
        htmlFor={name}
        className="
          mb-2
          block
          text-xs
          font-bold
          text-[#0b1b36]
        "
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          block
          h-12
          w-full
          min-w-0
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          text-slate-800
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-[#d6a84f]
          focus:ring-2
          focus:ring-[#d6a84f]/15
        "
      />

    </div>
  );
}


/* =============================================================
   SOCIAL BUTTON
============================================================= */

function SocialButton({ label }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-slate-200
        bg-white
        text-[11px]
        font-extrabold
        text-[#0b1b36]
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-[#d6a84f]
        hover:bg-[#faf6ed]
        hover:text-[#b88b32]
      "
    >
      {label}
    </button>
  );
}


export default Contact;
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  Home,
  IndianRupee,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";


/*
|--------------------------------------------------------------------------
| PROJECT DETAILS PAGE
|--------------------------------------------------------------------------
|
| Data source:
|
| Admin Add Project
|       ↓
| MongoDB
|       ↓
| Backend API
|       ↓
| ProjectDetails
|
|--------------------------------------------------------------------------
*/

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);


  // =========================================================
  // LOAD PROJECT
  // =========================================================

  useEffect(() => {
    let mounted = true;

    const loadProject = async () => {
      try {
        setLoading(true);
        setError("");

        if (!id) {
          throw new Error("Project ID is missing.");
        }

        let response;
        let data;
        let projectData = null;


        // =====================================================
        // 1. TRY AUTHORITY PROJECT API
        // =====================================================

        response = await fetch(
          `http://localhost:5000/api/authority-projects/${id}`
        );

        if (response.ok) {
          data = await response.json();

          projectData =
            data?.data ||
            data?.project ||
            data;

          if (
            projectData &&
            typeof projectData === "object" &&
            projectData._id
          ) {
            if (mounted) {
              setProject(projectData);
            }

            return;
          }
        }


        // =====================================================
        // 2. TRY BUILDER PROJECT API
        // =====================================================

        response = await fetch(
          `http://localhost:5000/api/builder-projects/${id}`
        );

        if (response.ok) {
          data = await response.json();

          projectData =
            data?.data ||
            data?.project ||
            data;

          if (
            projectData &&
            typeof projectData === "object" &&
            projectData._id
          ) {
            if (mounted) {
              setProject(projectData);
            }

            return;
          }
        }


        // =====================================================
        // 3. FALLBACK GENERIC PROJECT API
        //
        // Screenshot me /api/projects/:id response bhi
        // available hai, isliye isko fallback rakha hai.
        // =====================================================

        response = await fetch(
          `http://localhost:5000/api/projects/${id}`
        );

        if (response.ok) {
          data = await response.json();

          projectData =
            data?.data ||
            data?.project ||
            data;

          if (
            projectData &&
            typeof projectData === "object" &&
            projectData._id
          ) {
            if (mounted) {
              setProject(projectData);
            }

            return;
          }
        }


        throw new Error("Project not found.");
      } catch (err) {
        console.error(
          "Project details loading error:",
          err
        );

        if (mounted) {
          setError(
            err?.message ||
              "Unable to load project details."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProject();

    return () => {
      mounted = false;
    };
  }, [id]);


  // =========================================================
  // NORMALIZE DATA
  // =========================================================

  const images = useMemo(() => {
    if (!project) return [];

    const allImages = [
      ...(Array.isArray(project.images)
        ? project.images
        : []),
    ];

    if (
      project.image &&
      !allImages.includes(project.image)
    ) {
      allImages.unshift(project.image);
    }

    return allImages.filter(Boolean);
  }, [project]);


  const features = Array.isArray(project?.features)
    ? project.features
    : [];


  const amenities = Array.isArray(project?.amenities)
    ? project.amenities
    : [];


  const paymentPlans = Array.isArray(
    project?.paymentPlans
  )
    ? project.paymentPlans
    : [];


  const documents = Array.isArray(
    project?.documents
  )
    ? project.documents
    : [];


  // =========================================================
  // IMAGE NAVIGATION
  // =========================================================

  const nextImage = () => {
    if (!images.length) return;

    setActiveImage(
      (prev) =>
        (prev + 1) % images.length
    );
  };


  const previousImage = () => {
    if (!images.length) return;

    setActiveImage(
      (prev) =>
        (prev - 1 + images.length) %
        images.length
    );
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="text-center">

          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-slate-200
              border-t-[#b88b32]
            "
          />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading project...
          </p>

        </div>
      </div>
    );
  }


  // =========================================================
  // ERROR
  // =========================================================

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white">

        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-5">

          <div className="max-w-md text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Building2 size={28} />
            </div>

            <h1 className="mt-5 text-2xl font-extrabold text-slate-950">
              Project Not Found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {error ||
                "This project is currently unavailable."}
            </p>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-slate-950
                px-5
                py-3
                text-sm
                font-bold
                text-white
                transition
                hover:bg-slate-800
              "
            >
              <ArrowLeft size={16} />
              Go Back
            </button>

          </div>

        </div>

        <Footer />

      </div>
    );
  }


  // =========================================================
  // PROJECT VALUES
  // =========================================================

  const currentImage =
    images[activeImage] ||
    project.image ||
    "";


  const statusLabel = formatStatus(
    project.status
  );


  const categoryLabel = formatCategory(
    project.projectCategory
  );


  const locationText = [
    project.location,
    project.city,
    project.state,
  ]
    .filter(Boolean)
    .join(", ");


  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <div className="sticky top-0 z-[100] bg-white">
        <Navbar />
      </div>


      {/* =====================================================
          BREADCRUMB / BACK
      ====================================================== */}

      <div className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-5 py-4 lg:px-8">

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-slate-500
              transition
              hover:text-slate-950
            "
          >
            <ArrowLeft size={16} />

            Back to Projects
          </button>

        </div>

      </div>


      <main>

        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="bg-white">

          <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-10">

            <div className="grid gap-7 lg:grid-cols-[1.45fr_0.75fr]">

              {/* ============================================
                  IMAGE
              ============================================= */}

              <div>

                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    bg-slate-100
                    shadow-sm
                  "
                >

                  {currentImage ? (
                    <img
                      src={currentImage}
                      alt={project.name || "Project"}
                      className="
                        h-[300px]
                        w-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-[1.02]
                        sm:h-[400px]
                        lg:h-[500px]
                      "
                    />
                  ) : (
                    <div className="flex h-[300px] items-center justify-center sm:h-[400px] lg:h-[500px]">
                      <Building2
                        size={60}
                        className="text-slate-300"
                      />
                    </div>
                  )}


                  {/* IMAGE OVERLAY */}

                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">

                    <div className="flex flex-wrap gap-2">

                      {project.featured && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-slate-800 shadow-sm backdrop-blur">
                          <Star
                            size={13}
                            className="fill-[#b88b32] text-[#b88b32]"
                          />
                          Featured
                        </span>
                      )}

                      {project.newProject && (
                        <span className="rounded-full bg-[#b88b32] px-3 py-1.5 text-xs font-extrabold text-white shadow-sm">
                          New Project
                        </span>
                      )}

                    </div>


                    {project.status && (
                      <span className="rounded-full bg-emerald-500 px-3 py-1.5 text-xs font-extrabold capitalize text-white shadow-sm">
                        {statusLabel}
                      </span>
                    )}

                  </div>


                  {/* IMAGE CONTROLS */}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={previousImage}
                        className="
                          absolute
                          left-4
                          top-1/2
                          flex
                          h-10
                          w-10
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-slate-800
                          shadow
                          backdrop-blur
                          transition
                          hover:bg-white
                        "
                      >
                        <ChevronLeft size={20} />
                      </button>

                      <button
                        type="button"
                        onClick={nextImage}
                        className="
                          absolute
                          right-4
                          top-1/2
                          flex
                          h-10
                          w-10
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-slate-800
                          shadow
                          backdrop-blur
                          transition
                          hover:bg-white
                        "
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}


                  {/* VIEW IMAGE */}

                  {currentImage && (
                    <button
                      type="button"
                      onClick={() =>
                        setLightboxOpen(true)
                      }
                      className="
                        absolute
                        bottom-5
                        right-5
                        rounded-xl
                        bg-white/95
                        px-4
                        py-2.5
                        text-xs
                        font-extrabold
                        text-slate-800
                        shadow
                        backdrop-blur
                        transition
                        hover:bg-white
                      "
                    >
                      View Gallery
                    </button>
                  )}

                </div>


                {/* THUMBNAILS */}

                {images.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">

                    {images.map(
                      (image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() =>
                            setActiveImage(index)
                          }
                          className={`
                            h-16
                            w-20
                            shrink-0
                            overflow-hidden
                            rounded-xl
                            border-2
                            transition
                            sm:h-20
                            sm:w-24
                            ${
                              activeImage === index
                                ? "border-[#b88b32]"
                                : "border-transparent opacity-70 hover:opacity-100"
                            }
                          `}
                        >
                          <img
                            src={image}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </button>
                      )
                    )}

                  </div>
                )}

              </div>


              {/* ============================================
                  PROJECT INFO
              ============================================= */}

              <div className="flex flex-col justify-center">

                <div className="mb-4 flex flex-wrap gap-2">

                  {project.authority && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff8e9] px-3 py-1.5 text-xs font-extrabold text-[#9b762d]">
                      <Landmark size={13} />
                      {project.authority}
                    </span>
                  )}

                  {categoryLabel && (
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                      {categoryLabel}
                    </span>
                  )}

                </div>


                <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  {project.name}
                </h1>


                {locationText && (
                  <div className="mt-4 flex items-start gap-2 text-sm text-slate-500">

                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-[#b88b32]"
                    />

                    <span>
                      {locationText}
                    </span>

                  </div>
                )}


                {/* PRICE */}

                <div className="mt-7 rounded-2xl border border-[#ead9b5] bg-[#fffaf0] p-5">

                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Starting Price
                  </p>

                  <div className="mt-1 flex items-center gap-1">

                    {project.priceFrom > 0 && (
                      <IndianRupee
                        size={23}
                        className="text-[#b88b32]"
                      />
                    )}

                    <span className="text-2xl font-black text-slate-950">
                      {project.price ||
                        formatPrice(
                          project.priceFrom
                        ) ||
                        "Price on Request"}
                    </span>

                  </div>

                </div>


                {/* CTA */}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <button
                    type="button"
                    onClick={() =>
                      scrollToInquiry()
                    }
                    className="
                      inline-flex
                      h-12
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-slate-950
                      px-5
                      text-sm
                      font-extrabold
                      text-white
                      transition
                      hover:bg-slate-800
                    "
                  >
                    Enquire Now
                    <ArrowRight size={17} />
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      window.history.back()
                    }
                    className="
                      inline-flex
                      h-12
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-5
                      text-sm
                      font-extrabold
                      text-slate-700
                      transition
                      hover:bg-slate-50
                    "
                  >
                    <Phone size={16} />
                    Contact Us
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            QUICK STATS
        ==================================================== */}

        <section className="border-y border-slate-200 bg-white">

          <div className="mx-auto grid max-w-7xl divide-y divide-slate-200 px-5 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:px-8">

            <Stat
              icon={<Home size={19} />}
              label="Project Type"
              value={categoryLabel || "—"}
            />

            <Stat
              icon={<Landmark size={19} />}
              label="Authority"
              value={project.authority || "—"}
            />

            <Stat
              icon={<Building2 size={19} />}
              label="Total Area"
              value={project.totalArea || "—"}
            />

            <Stat
              icon={<CalendarDays size={19} />}
              label="Possession"
              value={project.possession || "—"}
            />

          </div>

        </section>


        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">

          <div className="grid gap-7 lg:grid-cols-[1fr_340px]">


            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="space-y-7">


              {/* ===============================================
                  OVERVIEW
              ================================================ */}

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <SectionTitle
                  icon={<Building2 size={19} />}
                  title="About This Project"
                />

                {project.description ? (
                  <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                    {project.description}
                  </p>
                ) : (
                  <EmptyText text="Project description is not available." />
                )}

              </section>


              {/* ===============================================
                  PROJECT DETAILS
              ================================================ */}

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <SectionTitle
                  icon={<BadgeCheck size={19} />}
                  title="Project Details"
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <DetailItem
                    label="Project Name"
                    value={project.name}
                  />

                  <DetailItem
                    label="Authority"
                    value={project.authority}
                  />

                  <DetailItem
                    label="Category"
                    value={categoryLabel}
                  />

                  <DetailItem
                    label="Status"
                    value={statusLabel}
                  />

                  <DetailItem
                    label="Location"
                    value={project.location}
                  />

                  <DetailItem
                    label="City"
                    value={project.city}
                  />

                  <DetailItem
                    label="State"
                    value={project.state}
                  />

                  <DetailItem
                    label="Total Area"
                    value={project.totalArea}
                  />

                  <DetailItem
                    label="Possession"
                    value={project.possession}
                  />

                  <DetailItem
                    label="RERA / Approval"
                    value={project.reraNumber}
                  />

                </div>

              </section>


              {/* ===============================================
                  FEATURES
              ================================================ */}

              {features.length > 0 && (
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                  <SectionTitle
                    icon={<Sparkles size={19} />}
                    title="Project Features"
                  />

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">

                    {features.map(
                      (feature, index) => (
                        <div
                          key={`${feature}-${index}`}
                          className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3.5"
                        >
                          <CheckCircle2
                            size={18}
                            className="shrink-0 text-[#b88b32]"
                          />

                          <span className="text-sm font-semibold text-slate-700">
                            {feature}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </section>
              )}


              {/* ===============================================
                  AMENITIES
              ================================================ */}

              {amenities.length > 0 && (
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                  <SectionTitle
                    icon={<ShieldCheck size={19} />}
                    title="Amenities"
                  />

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                    {amenities.map(
                      (amenity, index) => (
                        <div
                          key={`${amenity}-${index}`}
                          className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3.5"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff8e9] text-[#b88b32]">
                            <CheckCircle2 size={16} />
                          </span>

                          <span className="text-sm font-semibold text-slate-700">
                            {amenity}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </section>
              )}


              {/* ===============================================
                  PAYMENT PLANS
              ================================================ */}

              {paymentPlans.length > 0 && (
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                  <SectionTitle
                    icon={<IndianRupee size={19} />}
                    title="Payment Plan"
                  />

                  <div className="mt-6 space-y-3">

                    {paymentPlans.map(
                      (plan, index) => (
                        <div
                          key={`${plan.name}-${index}`}
                          className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center"
                        >

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black text-[#b88b32] shadow-sm">
                            {plan.percentage || 0}%
                          </div>

                          <div className="flex-1">

                            <h3 className="text-sm font-extrabold text-slate-800">
                              {plan.name || "Payment Stage"}
                            </h3>

                            {plan.description && (
                              <p className="mt-1 text-xs leading-5 text-slate-500">
                                {plan.description}
                              </p>
                            )}

                          </div>

                        </div>
                      )
                    )}

                  </div>

                </section>
              )}


              {/* ===============================================
                  DOCUMENTS
              ================================================ */}

              {documents.length > 0 && (
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                  <SectionTitle
                    icon={<FileText size={19} />}
                    title="Project Documents"
                  />

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">

                    {documents.map(
                      (document, index) => {

                        const documentUrl =
                          typeof document ===
                          "string"
                            ? document
                            : document?.url;

                        const documentName =
                          typeof document ===
                          "string"
                            ? document
                                .split("/")
                                .pop()
                            : document?.name ||
                              "Project Document";

                        if (!documentUrl) {
                          return null;
                        }

                        return (
                          <a
                            key={`${documentUrl}-${index}`}
                            href={documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="
                              group
                              flex
                              items-center
                              gap-4
                              rounded-2xl
                              border
                              border-slate-100
                              p-4
                              transition
                              hover:border-[#ead9b5]
                              hover:bg-[#fffaf0]
                            "
                          >

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-white group-hover:text-[#b88b32]">
                              <FileText size={19} />
                            </div>

                            <div className="min-w-0 flex-1">

                              <p className="truncate text-sm font-extrabold text-slate-800">
                                {documentName}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                View / Download
                              </p>

                            </div>

                            <Download
                              size={17}
                              className="shrink-0 text-slate-400 group-hover:text-[#b88b32]"
                            />

                          </a>
                        );
                      }
                    )}

                  </div>

                </section>
              )}


              {/* ===============================================
                  GALLERY
              ================================================ */}

              {images.length > 0 && (
                <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                  <SectionTitle
                    icon={<Sparkles size={19} />}
                    title="Project Gallery"
                  />

                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

                    {images.map(
                      (image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          onClick={() => {
                            setActiveImage(index);
                            setLightboxOpen(true);
                          }}
                          className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100"
                        >

                          <img
                            src={image}
                            alt={`${project.name} ${index + 1}`}
                            className="
                              h-full
                              w-full
                              object-cover
                              transition
                              duration-500
                              group-hover:scale-105
                            "
                          />

                          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />

                        </button>
                      )
                    )}

                  </div>

                </section>
              )}

            </div>


            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="lg:sticky lg:top-24 lg:h-fit">

              <div
                id="project-inquiry"
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >

                <div className="bg-slate-950 p-6 text-white">

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Interested in this project?
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Get Project Details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Connect with our team for pricing,
                    availability and more information.
                  </p>

                </div>


                <div className="space-y-3 p-5">

                  <button
                    type="button"
                    className="
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#b88b32]
                      px-5
                      text-sm
                      font-extrabold
                      text-white
                      transition
                      hover:bg-[#9e782a]
                    "
                  >
                    <Phone size={17} />
                    Request a Call
                  </button>


                  <button
                    type="button"
                    className="
                      flex
                      h-12
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-5
                      text-sm
                      font-extrabold
                      text-slate-700
                      transition
                      hover:bg-slate-50
                    "
                  >
                    Enquire Now
                    <ArrowRight size={17} />
                  </button>

                </div>

              </div>


              {/* PROJECT STATUS */}

              <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <Clock3 size={18} />
                  </div>

                  <div>

                    <p className="text-xs font-bold text-slate-400">
                      Project Status
                    </p>

                    <p className="mt-0.5 text-sm font-extrabold capitalize text-slate-800">
                      {statusLabel || "—"}
                    </p>

                  </div>

                </div>

              </div>


              {/* APPROVAL */}

              {project.reraNumber && (
                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fff8e9] text-[#b88b32]">
                      <BadgeCheck size={18} />
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-bold text-slate-400">
                        RERA / Approval
                      </p>

                      <p className="mt-1 break-all text-sm font-extrabold text-slate-800">
                        {project.reraNumber}
                      </p>

                    </div>

                  </div>

                </div>
              )}

            </aside>

          </div>

        </div>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />


      {/* =====================================================
          LIGHTBOX
      ====================================================== */}

      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          onClick={() =>
            setLightboxOpen(false)
          }
        >

          <button
            type="button"
            onClick={() =>
              setLightboxOpen(false)
            }
            className="
              absolute
              right-5
              top-5
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
              backdrop-blur
              transition
              hover:bg-white/20
            "
          >
            <X size={21} />
          </button>


          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previousImage();
                }}
                className="
                  absolute
                  left-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  backdrop-blur
                  hover:bg-white/20
                  sm:left-8
                "
              >
                <ChevronLeft size={24} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage();
                }}
                className="
                  absolute
                  right-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  bg-white/10
                  text-white
                  backdrop-blur
                  hover:bg-white/20
                  sm:right-8
                "
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}


          <img
            src={currentImage}
            alt={project.name || "Project"}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              max-h-[85vh]
              max-w-[90vw]
              rounded-2xl
              object-contain
            "
          />

        </div>
      )}

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| STAT
|--------------------------------------------------------------------------
*/

function Stat({
  icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center gap-4 px-5 py-5 lg:px-6">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff8e9] text-[#b88b32]">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-bold text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-extrabold text-slate-800">
          {value || "—"}
        </p>

      </div>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| SECTION TITLE
|--------------------------------------------------------------------------
*/

function SectionTitle({
  icon,
  title,
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8e9] text-[#b88b32]">
        {icon}
      </div>

      <h2 className="text-xl font-black tracking-tight text-slate-950">
        {title}
      </h2>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| DETAIL ITEM
|--------------------------------------------------------------------------
*/

function DetailItem({
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5">

      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-extrabold text-slate-800">
        {value || "—"}
      </p>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| EMPTY TEXT
|--------------------------------------------------------------------------
*/

function EmptyText({
  text,
}) {
  return (
    <p className="mt-5 text-sm text-slate-400">
      {text}
    </p>
  );
}


/*
|--------------------------------------------------------------------------
| FORMAT STATUS
|--------------------------------------------------------------------------
*/

function formatStatus(status) {
  if (!status) return "";

  return String(status)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}


/*
|--------------------------------------------------------------------------
| FORMAT CATEGORY
|--------------------------------------------------------------------------
*/

function formatCategory(category) {
  if (!category) return "";

  const categoryMap = {
    plot: "Plot",
    residential: "Residential",
    commercial: "Commercial",
    mixed: "Mixed",
  };

  return (
    categoryMap[category] ||
    formatStatus(category)
  );
}


/*
|--------------------------------------------------------------------------
| FORMAT PRICE
|--------------------------------------------------------------------------
*/

function formatPrice(price) {
  if (!price || Number(price) <= 0) {
    return "";
  }

  return `₹${Number(price).toLocaleString("en-IN")}`;
}


/*
|--------------------------------------------------------------------------
| SCROLL TO INQUIRY
|--------------------------------------------------------------------------
*/

function scrollToInquiry() {
  const element =
    document.getElementById(
      "project-inquiry"
    );

  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}


export default ProjectDetails;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById } from "../services/projectService";
import ProjectGallery from "../components/projects/ProjectGallery";
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProjectById(id);

        /*
          Backend kabhi direct project return karega:
          { _id, title, ... }

          aur kabhi:
          { success: true, data: {...} }

          Dono ko handle kar rahe hain.
        */
        setProject(data?.data || data);
      } catch (err) {
        console.error(err);
        setError("Unable to load project details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-600 text-sm">
            Loading project details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Project Not Found
          </h2>

          <p className="text-slate-500 mb-6">
            We couldn't find this project.
          </p>

          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

 

  const details = project.details || {};

  return (
    <div className="min-h-screen bg-white">

      {/* =========================
          BREADCRUMB
      ========================== */}

      <div className="max-w-[1440px] mx-auto px-5 lg:px-8 pt-6">

        <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">

          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-600 transition"
          >
            Home
          </button>

          <span>›</span>

          <button
            onClick={() => navigate("/projects")}
            className="hover:text-blue-600 transition"
          >
            Projects
          </button>

          <span>›</span>

          {project.city && (
            <>
              <span>{project.city}</span>
              <span>›</span>
            </>
          )}

          <span className="text-slate-900 font-medium">
            {project.title}
          </span>

        </div>
      </div>


      {/* =========================
          BACK TO LISTINGS
      ========================== */}

      <div className="max-w-[1440px] mx-auto px-5 lg:px-8 mt-5">

        <div className="flex justify-end">

          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-600 transition"
          >
            ← Back to Listings
          </button>

        </div>

      </div>


      {/* =========================
          MAIN CONTENT
      ========================== */}

      <main className="max-w-[1440px] mx-auto px-5 lg:px-8 py-5">

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_350px] gap-6">

          {/* =========================
              LEFT SIDE
          ========================== */}

          <div>

            {/* Gallery */}

          <ProjectGallery project={project} />


            {/* =========================
                PROJECT TITLE
            ========================== */}

            <div className="pt-6">

              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                {project.title}
              </h1>

              {project.location && (
                <p className="mt-2 text-slate-600 flex items-center gap-2">
                  <span>⌖</span>
                  {project.location}
                </p>
              )}

            </div>


            {/* =========================
                PRICE
            ========================== */}

            {project.price && (
              <div className="mt-5 flex items-center gap-4">

                <h2 className="text-3xl font-bold text-slate-900">
                  {project.price}
                </h2>

                {project.status && (
                  <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                    {project.status}
                  </span>
                )}

              </div>
            )}


            {/* =========================
                PROPERTY DETAILS
            ========================== */}

            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-y border-slate-200 py-5 gap-y-5">

              {details.bhk && (
                <DetailItem
                  label="Configuration"
                  value={details.bhk}
                />
              )}

              {details.area && (
                <DetailItem
                  label="Super Built-up Area"
                  value={details.area}
                />
              )}

              {details.bathrooms && (
                <DetailItem
                  label="Bathrooms"
                  value={details.bathrooms}
                />
              )}

              {details.parking && (
                <DetailItem
                  label="Parking"
                  value={details.parking}
                />
              )}

              {details.floor && (
                <DetailItem
                  label="Floor"
                  value={details.floor}
                />
              )}

              {details.furnishing && (
                <DetailItem
                  label="Furnishing"
                  value={details.furnishing}
                />
              )}

            </div>


            {/* =========================
                DESCRIPTION
            ========================== */}

            {project.description && (
              <section className="mt-7 pb-7 border-b border-slate-200">

                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  About this Property
                </h2>

                <p className="text-slate-600 leading-7">
                  {project.description}
                </p>

              </section>
            )}


            {/* =========================
                AMENITIES
            ========================== */}

            {project.amenities?.length > 0 && (
              <section className="mt-7">

                <h2 className="text-xl font-bold text-slate-900 mb-5">
                  Amenities
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

                  {project.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-slate-700"
                    >
                      <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                        ✓
                      </span>

                      <span>{amenity}</span>
                    </div>
                  ))}

                </div>

              </section>
            )}

          </div>


          {/* =========================
              RIGHT SIDE
          ========================== */}

          <aside>

            <div className="sticky top-24">

              {/* PRICE CARD */}

              <div className="rounded-2xl border border-slate-200 p-6 shadow-sm bg-white">

                {project.price && (
                  <h2 className="text-3xl font-bold text-slate-900">
                    {project.price}
                  </h2>
                )}

                <p className="text-slate-500 mt-1">
                  All Inclusive
                </p>


                <button
                  className="w-full mt-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                >
                  Request Site Visit
                </button>

                <button
                  className="w-full mt-3 py-3.5 rounded-xl border border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 transition"
                >
                  Enquire Now
                </button>

                <button
                  className="w-full mt-3 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  ♡ Save Property
                </button>

                <button
                  className="w-full mt-3 py-3.5 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  ↗ Share Property
                </button>

              </div>


              {/* AGENT */}

              {project.agent && (
                <div className="mt-5 rounded-2xl border border-slate-200 p-6 shadow-sm bg-white">

                  <div className="flex items-center gap-4">

                    {project.agent.image ? (
                      <img
                        src={project.agent.image}
                        alt={project.agent.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl">
                        👤
                      </div>
                    )}

                    <div>

                      <h3 className="font-bold text-slate-900">
                        {project.agent.name}
                      </h3>

                      {project.agent.designation && (
                        <p className="text-sm text-slate-500">
                          {project.agent.designation}
                        </p>
                      )}

                      {project.agent.company && (
                        <p className="text-sm text-slate-500">
                          {project.agent.company}
                        </p>
                      )}

                    </div>

                  </div>


                  {project.agent.rating && (
                    <div className="mt-4 text-sm">

                      <span className="font-semibold">
                        {project.agent.rating}
                      </span>

                      <span className="text-yellow-500 ml-1">
                        ★★★★★
                      </span>

                      {project.agent.reviews && (
                        <span className="text-slate-500 ml-2">
                          ({project.agent.reviews} Reviews)
                        </span>
                      )}

                    </div>
                  )}


                  {project.agent.phone && (
                    <button
                      className="w-full mt-5 py-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                    >
                      ☎ {project.agent.phone}
                    </button>
                  )}

                  <button
                    className="w-full mt-3 py-3 rounded-xl border border-slate-300 font-semibold text-slate-800"
                  >
                    WhatsApp
                  </button>

                </div>
              )}

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};


/* =========================
   DETAIL ITEM
========================= */

const DetailItem = ({ label, value }) => {
  return (
    <div className="flex flex-col gap-1">

      <span className="font-semibold text-slate-900 text-sm">
        {value}
      </span>

      <span className="text-xs text-slate-500">
        {label}
      </span>

    </div>
  );
};


export default ProjectDetails;
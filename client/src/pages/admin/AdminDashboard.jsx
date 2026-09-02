import { useEffect, useMemo, useState } from "react";

import {
  Activity,
  ArrowRight,
  Building2,
  CheckCircle2,
  FolderKanban,
  Home,
  Loader2,
  MessageSquare,
  Plus,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import { Link } from "react-router-dom";

import api from "../../services/api";

import {
  getAuthorityProjects,
} from "../../services/authorityProjectService";

import {
  getBuilderProjects,
} from "../../services/builderProjectService";


/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
| Real-time dashboard data:
|
| Authority Projects
| Builder Projects
| Leads
|
| No fake / hardcoded statistics.
|--------------------------------------------------------------------------
*/


function AdminDashboard() {
  const [authorityProjects, setAuthorityProjects] =
    useState([]);

  const [builderProjects, setBuilderProjects] =
    useState([]);

  const [leads, setLeads] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");


  /*
  |--------------------------------------------------------------------------
  | FETCH DASHBOARD DATA
  |--------------------------------------------------------------------------
  */

  const fetchDashboardData = async (
    showRefresh = false
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");


      /*
      |--------------------------------------------------------------------------
      | AUTHORITY PROJECTS
      |--------------------------------------------------------------------------
      */

      let authorityResponse = null;

      try {
        authorityResponse =
          await getAuthorityProjects();
      } catch (authorityError) {
        console.error(
          "Failed to fetch authority projects:",
          authorityError
        );
      }


      /*
      |--------------------------------------------------------------------------
      | BUILDER PROJECTS
      |--------------------------------------------------------------------------
      */

      let builderResponse = null;

      try {
        builderResponse =
          await getBuilderProjects();
      } catch (builderError) {
        console.error(
          "Failed to fetch builder projects:",
          builderError
        );
      }


      /*
      |--------------------------------------------------------------------------
      | NORMALIZE AUTHORITY RESPONSE
      |--------------------------------------------------------------------------
      */

      const authorityData =
        Array.isArray(authorityResponse)
          ? authorityResponse
          : authorityResponse?.data?.projects ||
            authorityResponse?.data ||
            authorityResponse?.projects ||
            [];


      /*
      |--------------------------------------------------------------------------
      | NORMALIZE BUILDER RESPONSE
      |--------------------------------------------------------------------------
      */

      const builderData =
        Array.isArray(builderResponse)
          ? builderResponse
          : builderResponse?.data?.projects ||
            builderResponse?.data ||
            builderResponse?.projects ||
            [];


      setAuthorityProjects(
        Array.isArray(authorityData)
          ? authorityData
          : []
      );

      setBuilderProjects(
        Array.isArray(builderData)
          ? builderData
          : []
      );


      /*
      |--------------------------------------------------------------------------
      | LEADS
      |--------------------------------------------------------------------------
      |
      | Leads service/backend may have different response formats,
      | therefore safely normalize all common formats.
      |
      */

      try {
        const leadResponse =
          await api.get("/leads");

        const leadData =
          Array.isArray(leadResponse?.data)
            ? leadResponse.data
            : leadResponse?.data?.leads ||
              leadResponse?.data?.data ||
              leadResponse?.leads ||
              [];

        setLeads(
          Array.isArray(leadData)
            ? leadData
            : []
        );
      } catch (leadError) {
        console.error(
          "Failed to fetch leads:",
          leadError
        );

        /*
         * Lead API fail hone par dashboard
         * completely break nahi hoga.
         */
        setLeads([]);
      }

    } catch (err) {
      console.error(
        "Dashboard loading error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchDashboardData();
  }, []);


  /*
  |--------------------------------------------------------------------------
  | COMBINED PROJECTS
  |--------------------------------------------------------------------------
  */

  const allProjects = useMemo(() => {
    const authority = authorityProjects.map(
      (project) => ({
        ...project,
        projectType: "authority",
      })
    );

    const builder = builderProjects.map(
      (project) => ({
        ...project,
        projectType: "builder",
      })
    );

    return [
      ...authority,
      ...builder,
    ];
  }, [
    authorityProjects,
    builderProjects,
  ]);


  /*
  |--------------------------------------------------------------------------
  | PROJECT STATISTICS
  |--------------------------------------------------------------------------
  */

  const statistics = useMemo(() => {
    const totalProjects =
      allProjects.length;

    const activeProjects =
      allProjects.filter(
        (project) =>
          String(project?.status)
            .toLowerCase() === "active"
      ).length;

    const upcomingProjects =
      allProjects.filter(
        (project) =>
          String(project?.status)
            .toLowerCase() === "upcoming"
      ).length;

    const completedProjects =
      allProjects.filter(
        (project) =>
          String(project?.status)
            .toLowerCase() === "completed"
      ).length;

    const publishedProjects =
      allProjects.filter(
        (project) =>
          project?.published !== false
      ).length;

    return {
      totalProjects,
      activeProjects,
      upcomingProjects,
      completedProjects,
      publishedProjects,
    };
  }, [allProjects]);


  /*
  |--------------------------------------------------------------------------
  | RECENT PROJECTS
  |--------------------------------------------------------------------------
  */

  const recentProjects = useMemo(() => {
    return [...allProjects]
      .sort((a, b) => {
        const dateA =
          new Date(
            a?.createdAt || 0
          ).getTime();

        const dateB =
          new Date(
            b?.createdAt || 0
          ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [allProjects]);


  /*
  |--------------------------------------------------------------------------
  | RECENT LEADS
  |--------------------------------------------------------------------------
  */

  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => {
        const dateA =
          new Date(
            a?.createdAt ||
              a?.date ||
              0
          ).getTime();

        const dateB =
          new Date(
            b?.createdAt ||
              b?.date ||
              0
          ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [leads]);


  /*
  |--------------------------------------------------------------------------
  | FORMAT PROJECT DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (date) => {
    if (!date) {
      return "Recently";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  /*
  |--------------------------------------------------------------------------
  | PROJECT STATUS
  |--------------------------------------------------------------------------
  */

  const getStatusClasses = (
    status
  ) => {
    const normalized =
      String(status || "")
        .toLowerCase();

    if (normalized === "active") {
      return "bg-emerald-50 text-emerald-600";
    }

    if (
      normalized === "upcoming"
    ) {
      return "bg-blue-50 text-blue-600";
    }

    if (
      normalized === "completed"
    ) {
      return "bg-violet-50 text-violet-600";
    }

    return "bg-slate-100 text-slate-500";
  };


  /*
  |--------------------------------------------------------------------------
  | PROJECT LOCATION
  |--------------------------------------------------------------------------
  */

  const getLocation = (
    project
  ) => {
    if (
      typeof project?.location ===
      "string"
    ) {
      return project.location;
    }

    if (
      project?.location?.city
    ) {
      return [
        project.location.city,
        project.location.state,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return [
      project?.city,
      project?.state,
    ]
      .filter(Boolean)
      .join(", ") || "—";
  };


  /*
  |--------------------------------------------------------------------------
  | LEAD NAME
  |--------------------------------------------------------------------------
  */

  const getLeadName = (
    lead
  ) => {
    return (
      lead?.name ||
      lead?.fullName ||
      lead?.customerName ||
      lead?.contactName ||
      "Unknown Lead"
    );
  };


  /*
  |--------------------------------------------------------------------------
  | LEAD EMAIL / PHONE
  |--------------------------------------------------------------------------
  */

  const getLeadContact = (
    lead
  ) => {
    return (
      lead?.email ||
      lead?.phone ||
      lead?.mobile ||
      "No contact"
    );
  };


  /*
  |--------------------------------------------------------------------------
  | LOADING STATE
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <DashboardSkeleton />
    );
  }


  return (
    <div className="space-y-6 sm:space-y-7">


      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <section
        className="
          overflow-hidden
          rounded-2xl
          bg-slate-950
          shadow-sm
        "
      >

        <div
          className="
            relative
            px-5
            py-6
            sm:px-7
            sm:py-7
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-20
              h-60
              w-60
              rounded-full
              bg-[#d6a84f]/5
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-100px]
              right-[15%]
              h-48
              w-48
              rounded-full
              bg-white/[0.02]
            "
          />


          <div
            className="
              relative
              flex
              flex-col
              justify-between
              gap-6
              lg:flex-row
              lg:items-center
            "
          >

            {/* LEFT */}

            <div>

              <div
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                "
              >

                <span
                  className="
                    h-[3px]
                    w-8
                    rounded-full
                    bg-[#d6a84f]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.2em]
                    text-[#e0b65c]
                  "
                >
                  Investorise Admin
                </span>

              </div>


              <h1
                className="
                  text-2xl
                  font-extrabold
                  tracking-tight
                  text-white
                  sm:text-3xl
                "
              >
                Welcome back, Admin
              </h1>


              <p
                className="
                  mt-2
                  max-w-xl
                  text-xs
                  leading-6
                  text-white/60
                  sm:text-sm
                "
              >
                Manage authority projects,
                builder projects and customer
                enquiries from one place.
              </p>

            </div>


            {/* ACTIONS */}

            <div
              className="
                relative
                flex
                flex-wrap
                gap-2
              "
            >

              <Link
                to="/admin/authority-projects/add"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#d6a84f]
                  px-4
                  py-3
                  text-xs
                  font-bold
                  text-slate-950
                  shadow-sm
                  transition
                  hover:bg-[#e0b65c]
                  active:scale-[0.98]
                "
              >
                <Plus
                  size={15}
                  strokeWidth={2.5}
                />

                Authority Project
              </Link>


              <Link
                to="/admin/builder-projects/add"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/15
                  bg-white/5
                  px-4
                  py-3
                  text-xs
                  font-bold
                  text-white
                  transition
                  hover:bg-white/10
                  active:scale-[0.98]
                "
              >
                <Plus size={15} />

                Builder Project
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            rounded-xl
            border
            border-red-100
            bg-red-50
            px-4
            py-3
            text-xs
            text-red-600
          "
        >

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              fetchDashboardData(true)
            }
            className="
              rounded-lg
              bg-white
              px-3
              py-2
              text-[10px]
              font-bold
              text-red-600
              shadow-sm
            "
          >
            Retry
          </button>

        </div>
      )}


      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <section>

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          <StatCard
            title="Total Projects"
            value={
              statistics.totalProjects
            }
            description={`${statistics.authorityProjects || authorityProjects.length} Authority · ${builderProjects.length} Builder`}
            icon={FolderKanban}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />


          <StatCard
            title="Active Projects"
            value={
              statistics.activeProjects
            }
            description={`${statistics.publishedProjects} visible on website`}
            icon={Activity}
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />


          <StatCard
            title="Upcoming Projects"
            value={
              statistics.upcomingProjects
            }
            description="Projects planned for launch"
            icon={TrendingUp}
            iconBg="bg-[#faf5e9]"
            iconColor="text-[#b88b32]"
          />


          <StatCard
            title="Total Leads"
            value={leads.length}
            description="Customer enquiries"
            icon={MessageSquare}
            iconBg="bg-violet-50"
            iconColor="text-violet-600"
          />

        </div>

      </section>


      {/* =====================================================
          PROJECT BREAKDOWN
      ====================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-3
        "
      >

        <DashboardMiniCard
          icon={ShieldCheck}
          title="Authority Projects"
          value={
            authorityProjects.length
          }
          description="Authority-led projects"
          to="/admin/authority-projects"
          iconBg="bg-[#faf5e9]"
          iconColor="text-[#b88b32]"
        />


        <DashboardMiniCard
          icon={Building2}
          title="Builder Projects"
          value={
            builderProjects.length
          }
          description="Builder & developer projects"
          to="/admin/builder-projects"
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />


        <DashboardMiniCard
          icon={CheckCircle2}
          title="Completed Projects"
          value={
            statistics.completedProjects
          }
          description="Successfully completed"
          to="/admin/authority-projects"
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
        />

      </section>


      {/* =====================================================
          RECENT PROJECTS + LEADS
      ====================================================== */}

      <section
        className="
          grid
          grid-cols-1
          gap-5
          xl:grid-cols-[1.25fr_0.75fr]
        "
      >

        {/* =================================================
            RECENT PROJECTS
        ================================================== */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-100
              px-5
              py-4
            "
          >

            <div>

              <div
                className="
                  mb-1
                  flex
                  items-center
                  gap-2
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#d6a84f]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.18em]
                    text-[#b88b32]
                  "
                >
                  Overview
                </span>

              </div>


              <h2
                className="
                  text-sm
                  font-extrabold
                  text-slate-900
                "
              >
                Recent Projects
              </h2>

            </div>


            <Link
              to="/admin/builder-projects"
              className="
                inline-flex
                items-center
                gap-1
                text-[10px]
                font-bold
                text-[#b88b32]
                transition
                hover:text-[#8f6b25]
              "
            >
              View all

              <ArrowRight size={13} />

            </Link>

          </div>


          {recentProjects.length === 0 ? (

            <EmptyState
              icon={FolderKanban}
              title="No projects yet"
              description="Add your first authority or builder project."
            />

          ) : (

            <div>

              {recentProjects.map(
                (project, index) => {

                  const id =
                    project?._id ||
                    project?.id;

                  const isAuthority =
                    project.projectType ===
                    "authority";

                  const projectLink =
                    isAuthority
                      ? `/admin/authority-projects/edit/${id}`
                      : `/admin/builder-projects/edit/${id}`;

                  return (
                    <Link
                      key={
                        id ||
                        `${project.projectType}-${index}`
                      }
                      to={projectLink}
                      className="
                        group
                        flex
                        items-center
                        gap-3
                        border-b
                        border-slate-100
                        px-5
                        py-4
                        last:border-0
                        hover:bg-slate-50/70
                      "
                    >

                      {/* IMAGE */}

                      <div
                        className="
                          h-11
                          w-14
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          bg-slate-100
                        "
                      >

                        {project?.image ? (

                          <img
                            src={project.image}
                            alt={
                              project?.name ||
                              "Project"
                            }
                            className="
                              h-full
                              w-full
                              object-cover
                            "
                          />

                        ) : (

                          <div
                            className="
                              flex
                              h-full
                              w-full
                              items-center
                              justify-center
                              text-slate-300
                            "
                          >
                            {isAuthority ? (
                              <ShieldCheck
                                size={19}
                              />
                            ) : (
                              <Building2
                                size={19}
                              />
                            )}
                          </div>

                        )}

                      </div>


                      {/* CONTENT */}

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >

                          <p
                            className="
                              truncate
                              text-xs
                              font-extrabold
                              text-slate-900
                            "
                          >
                            {project?.name ||
                              "Untitled Project"}
                          </p>


                          <span
                            className="
                              shrink-0
                              rounded-full
                              bg-slate-100
                              px-2
                              py-0.5
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-wide
                              text-slate-500
                            "
                          >
                            {isAuthority
                              ? "Authority"
                              : "Builder"}
                          </span>

                        </div>


                        <p
                          className="
                            mt-1
                            truncate
                            text-[10px]
                            text-slate-400
                          "
                        >
                          {getLocation(project)}
                        </p>

                      </div>


                      {/* RIGHT */}

                      <div
                        className="
                          hidden
                          shrink-0
                          text-right
                          sm:block
                        "
                      >

                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-2
                            py-1
                            text-[8px]
                            font-extrabold
                            capitalize
                            ${getStatusClasses(
                              project?.status
                            )}
                          `}
                        >
                          {project?.status ||
                            "active"}
                        </span>


                        <p
                          className="
                            mt-1
                            text-[9px]
                            text-slate-400
                          "
                        >
                          {formatDate(
                            project?.createdAt
                          )}
                        </p>

                      </div>


                      <ArrowRight
                        size={14}
                        className="
                          shrink-0
                          text-slate-300
                          transition
                          group-hover:translate-x-1
                          group-hover:text-[#b88b32]
                        "
                      />

                    </Link>
                  );
                }
              )}

            </div>

          )}

        </section>


        {/* =================================================
            RECENT LEADS
        ================================================== */}

        <section
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-100
              px-5
              py-4
            "
          >

            <div>

              <div
                className="
                  mb-1
                  flex
                  items-center
                  gap-2
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#d6a84f]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-extrabold
                    uppercase
                    tracking-[0.18em]
                    text-[#b88b32]
                  "
                >
                  Enquiries
                </span>

              </div>


              <h2
                className="
                  text-sm
                  font-extrabold
                  text-slate-900
                "
              >
                Recent Leads
              </h2>

            </div>


            <Link
              to="/admin/leads"
              className="
                inline-flex
                items-center
                gap-1
                text-[10px]
                font-bold
                text-[#b88b32]
              "
            >
              View all

              <ArrowRight size={13} />

            </Link>

          </div>


          {recentLeads.length === 0 ? (

            <EmptyState
              icon={MessageSquare}
              title="No leads yet"
              description="New customer enquiries will appear here."
            />

          ) : (

            <div>

              {recentLeads.map(
                (lead, index) => (

                  <div
                    key={
                      lead?._id ||
                      lead?.id ||
                      index
                    }
                    className="
                      flex
                      items-center
                      gap-3
                      border-b
                      border-slate-100
                      px-5
                      py-4
                      last:border-0
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-violet-50
                        text-violet-600
                      "
                    >
                      <MessageSquare
                        size={16}
                      />
                    </div>


                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >

                      <p
                        className="
                          truncate
                          text-xs
                          font-bold
                          text-slate-800
                        "
                      >
                        {getLeadName(lead)}
                      </p>


                      <p
                        className="
                          mt-1
                          truncate
                          text-[9px]
                          text-slate-400
                        "
                      >
                        {getLeadContact(lead)}
                      </p>

                    </div>


                    <span
                      className="
                        shrink-0
                        text-[9px]
                        text-slate-400
                      "
                    >
                      {formatDate(
                        lead?.createdAt ||
                        lead?.date
                      )}
                    </span>

                  </div>

                )
              )}

            </div>

          )}

        </section>

      </section>


      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}

      <section>

        <div
          className="
            mb-4
            flex
            items-end
            justify-between
          "
        >

          <div>

            <div
              className="
                mb-1
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  h-px
                  w-6
                  bg-[#d6a84f]
                "
              />

              <span
                className="
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.18em]
                  text-[#b88b32]
                "
              >
                Shortcuts
              </span>

            </div>


            <h2
              className="
                text-sm
                font-extrabold
                text-slate-900
              "
            >
              Quick Actions
            </h2>


            <p
              className="
                mt-1
                text-[10px]
                text-slate-400
              "
            >
              Frequently used admin actions
            </p>

          </div>


          {refreshing && (
            <div
              className="
                flex
                items-center
                gap-2
                text-[9px]
                font-semibold
                text-slate-400
              "
            >
              <Loader2
                size={12}
                className="animate-spin"
              />

              Updating...
            </div>
          )}

        </div>


        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          <QuickAction
            to="/admin/authority-projects/add"
            icon={
              <ShieldCheck size={19} />
            }
            title="Add Authority Project"
            description="Create an authority-led project"
          />


          <QuickAction
            to="/admin/builder-projects/add"
            icon={
              <Building2 size={19} />
            }
            title="Add Builder Project"
            description="Create a builder project"
          />


          <QuickAction
            to="/admin/authority-projects"
            icon={
              <FolderKanban size={19} />
            }
            title="Manage Projects"
            description={`${allProjects.length} total projects`}
          />


          <QuickAction
            to="/admin/leads"
            icon={
              <MessageSquare size={19} />
            }
            title="View Leads"
            description={`${leads.length} customer enquiries`}
          />

        </div>

      </section>

    </div>
  );
}


/* =========================================================================
   STAT CARD
========================================================================= */

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >

        <div>

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-slate-400
            "
          >
            {title}
          </p>


          <p
            className="
              mt-2
              text-2xl
              font-extrabold
              tracking-tight
              text-slate-950
            "
          >
            {value}
          </p>


          <p
            className="
              mt-1
              text-[9px]
              leading-4
              text-slate-400
            "
          >
            {description}
          </p>

        </div>


        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconBg}
            ${iconColor}
          `}
        >
          <Icon size={19} />
        </div>

      </div>

    </div>
  );
}


/* =========================================================================
   MINI CARD
========================================================================= */

function DashboardMiniCard({
  icon: Icon,
  title,
  value,
  description,
  to,
  iconBg,
  iconColor,
}) {
  return (
    <Link
      to={to}
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${iconBg}
            ${iconColor}
          `}
        >
          <Icon size={20} />
        </div>


        <div
          className="
            min-w-0
            flex-1
          "
        >

          <p
            className="
              text-xs
              font-extrabold
              text-slate-900
            "
          >
            {title}
          </p>


          <p
            className="
              mt-1
              text-[9px]
              text-slate-400
            "
          >
            {description}
          </p>

        </div>


        <div className="text-right">

          <p
            className="
              text-xl
              font-extrabold
              text-slate-950
            "
          >
            {value}
          </p>


          <ArrowRight
            size={14}
            className="
              ml-auto
              mt-1
              text-slate-300
              transition
              group-hover:translate-x-1
              group-hover:text-[#b88b32]
            "
          />

        </div>

      </div>

    </Link>
  );
}


/* =========================================================================
   QUICK ACTION
========================================================================= */

function QuickAction({
  to,
  icon,
  title,
  description,
}) {
  return (
    <Link
      to={to}
      className="
        group
        flex
        min-h-[76px]
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition
        duration-200
        hover:-translate-y-0.5
        hover:border-slate-300
        hover:shadow-md
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
          rounded-xl
          bg-[#faf5e9]
          text-[#b88b32]
          transition
          group-hover:bg-[#f7efd9]
        "
      >
        {icon}
      </div>


      <div
        className="
          min-w-0
          flex-1
        "
      >

        <p
          className="
            text-xs
            font-bold
            text-slate-900
          "
        >
          {title}
        </p>


        <p
          className="
            mt-1
            text-[9px]
            leading-4
            text-slate-400
          "
        >
          {description}
        </p>

      </div>


      <ArrowRight
        size={15}
        className="
          shrink-0
          text-slate-300
          transition
          group-hover:translate-x-1
          group-hover:text-[#b88b32]
        "
      />

    </Link>
  );
}


/* =========================================================================
   EMPTY STATE
========================================================================= */

function EmptyState({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div
      className="
        flex
        min-h-[220px]
        flex-col
        items-center
        justify-center
        px-5
        text-center
      "
    >

      <div
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          bg-slate-50
          text-slate-300
        "
      >
        <Icon size={21} />
      </div>


      <p
        className="
          mt-4
          text-xs
          font-extrabold
          text-slate-700
        "
      >
        {title}
      </p>


      <p
        className="
          mt-1
          max-w-[260px]
          text-[9px]
          leading-4
          text-slate-400
        "
      >
        {description}
      </p>

    </div>
  );
}


/* =========================================================================
   DASHBOARD SKELETON
========================================================================= */

function DashboardSkeleton() {
  return (
    <div className="space-y-6">

      {/* HERO */}

      <div
        className="
          h-[150px]
          animate-pulse
          rounded-2xl
          bg-slate-200
        "
      />


      {/* STATS */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {[1, 2, 3, 4].map(
          (item) => (
            <div
              key={item}
              className="
                h-[125px]
                animate-pulse
                rounded-2xl
                bg-slate-200
              "
            />
          )
        )}

      </div>


      {/* MINI */}

      <div
        className="
          grid
          grid-cols-1
          gap-4
          lg:grid-cols-3
        "
      >

        {[1, 2, 3].map(
          (item) => (
            <div
              key={item}
              className="
                h-[85px]
                animate-pulse
                rounded-2xl
                bg-slate-200
              "
            />
          )
        )}

      </div>


      {/* RECENT */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          xl:grid-cols-[1.25fr_0.75fr]
        "
      >

        <div
          className="
            h-[360px]
            animate-pulse
            rounded-2xl
            bg-slate-200
          "
        />

        <div
          className="
            h-[360px]
            animate-pulse
            rounded-2xl
            bg-slate-200
          "
        />

      </div>

    </div>
  );
}


export default AdminDashboard;
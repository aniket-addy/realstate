import {
  Bell,
  ChevronDown,
  Menu,
  UserCircle,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function AdminHeader({ onMenuClick }) {
  const location = useLocation();
  const navigate = useNavigate();

  /* =========================================================
     PAGE TITLE
  ========================================================= */

  const getPageInfo = () => {
    const path = location.pathname;

    if (path === "/admin") {
      return {
        title: "Dashboard",
        description: "Overview of your real estate business",
      };
    }

    if (
      path === "/admin/projects" ||
      path.startsWith("/admin/projects/")
    ) {
      return {
        title: "Projects",
        description: "Manage your real estate projects",
      };
    }

    if (
      path === "/admin/properties" ||
      path.startsWith("/admin/properties/")
    ) {
      return {
        title: "Properties",
        description: "Manage your property listings",
      };
    }

    if (path === "/admin/leads") {
      return {
        title: "Leads",
        description: "Manage customer enquiries and leads",
      };
    }

    if (path.includes("/add-project")) {
      return {
        title: "Add Project",
        description: "Create a new project",
      };
    }

    if (path.includes("/edit-project")) {
      return {
        title: "Edit Project",
        description: "Update project information",
      };
    }

    if (path.includes("/add-property")) {
      return {
        title: "Add Property",
        description: "Create a new property listing",
      };
    }

    if (path.includes("/edit-property")) {
      return {
        title: "Edit Property",
        description: "Update property information",
      };
    }

    return {
      title: "Admin Panel",
      description: "Manage Investorise",
    };
  };

  const pageInfo = getPageInfo();

  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-[76px]
        border-b
        border-slate-200
        bg-white/95
        backdrop-blur-xl
      "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ===================================================
            LEFT
        ==================================================== */}

        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={onMenuClick}
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
              text-slate-600
              transition
              hover:border-slate-300
              hover:bg-slate-50
              hover:text-slate-950
              lg:hidden
            "
            aria-label="Open admin menu"
          >
            <Menu size={20} />
          </button>


          {/* Page Information */}

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h1 className="truncate text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                {pageInfo.title}
              </h1>

              <span className="hidden rounded-full bg-[#faf5e9] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#b88b32] sm:inline-flex">
                Admin
              </span>

            </div>

            <p className="mt-0.5 hidden truncate text-[11px] text-slate-400 sm:block">
              {pageInfo.description}
            </p>

          </div>

        </div>


        {/* ===================================================
            RIGHT
        ==================================================== */}

        <div className="flex items-center gap-2 sm:gap-3">

          {/* Notification */}

          <button
            type="button"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              transition
              hover:bg-slate-50
              hover:text-slate-900
            "
            aria-label="Notifications"
          >
            <Bell
              size={18}
              strokeWidth={1.8}
            />

            {/* Notification Dot */}

            <span className="absolute right-[9px] top-[8px] h-1.5 w-1.5 rounded-full bg-[#d6a84f]" />
          </button>


          {/* Divider */}

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />


          {/* Admin Profile */}

          <button
            type="button"
            onClick={() => navigate("/admin/profile")}
            className="
              flex
              cursor-pointer
              items-center
              gap-2
              rounded-xl
              px-1.5
              py-1.5
              transition
              hover:bg-slate-50
            "
            aria-label="Open admin profile"
          >

            {/* Avatar */}

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">

              <UserCircle
                size={20}
                strokeWidth={1.7}
              />

            </div>


            {/* User Details */}

            <div className="hidden text-left md:block">

              <p className="text-xs font-bold text-slate-900">
                Admin
              </p>

              <p className="mt-0.5 text-[9px] text-slate-400">
                Administrator
              </p>

            </div>


            {/* Dropdown Arrow */}

            <ChevronDown
              size={15}
              className="hidden text-slate-400 md:block"
            />

          </button>

        </div>

      </div>
    </header>
  );
}

export default AdminHeader;
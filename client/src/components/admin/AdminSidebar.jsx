import {
  Building2,
  ChevronRight,
  Home,
  Landmark,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function AdminSidebar({ open, onClose }) {
  const navigation = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Authority Projects",
      path: "/admin/authority-projects",
      icon: Landmark,
    },
    {
      label: "Builder Projects",
      path: "/admin/builder-projects",
      icon: Building2,
    },
    {
      label: "Leads",
      path: "/admin/leads",
      icon: MessageSquare,
    },
  ];

  return (
    <aside
      className={`
        fixed
        inset-y-0
        left-0
        z-40
        flex
        w-[260px]
        flex-col
        border-r
        border-slate-200
        bg-white
        shadow-xl
        transition-transform
        duration-300
        lg:translate-x-0
        lg:shadow-none

        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >
      {/* =====================================================
          BRAND
      ====================================================== */}

      <div className="flex h-[76px] items-center justify-between border-b border-slate-200 px-5">
        <div className="flex items-center gap-3">

          {/* Logo */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 shadow-sm">
            <Building2
              size={20}
              strokeWidth={1.8}
              className="text-[#d6a84f]"
            />
          </div>

          {/* Brand */}
          <div>
            <h1 className="text-[15px] font-extrabold tracking-tight text-slate-900">
              Investorise
            </h1>

            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#b88b32]">
              Admin Panel
            </p>
          </div>
        </div>

        {/* Mobile Close */}
        <button
          type="button"
          onClick={onClose}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-900
            lg:hidden
          "
          aria-label="Close sidebar"
        >
          <X size={19} />
        </button>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div className="flex-1 overflow-y-auto px-3 py-6">

        {/* Section Label */}
        <p className="mb-3 px-3 text-[9px] font-extrabold uppercase tracking-[0.18em] text-slate-400">
          Main Menu
        </p>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `
                    group
                    flex
                    min-h-[46px]
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    text-sm
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }
                  `
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Icon */}
                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        transition

                        ${
                          isActive
                            ? "bg-white/10 text-[#d6a84f]"
                            : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-[#b88b32]"
                        }
                      `}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                      />
                    </span>

                    {/* Label */}
                    <span className="flex-1">
                      {item.label}
                    </span>

                    {/* Arrow */}
                    <ChevronRight
                      size={15}
                      className={`
                        transition-transform

                        ${
                          isActive
                            ? "translate-x-0 text-white/50"
                            : "-translate-x-1 text-slate-300 group-hover:translate-x-0 group-hover:text-slate-400"
                        }
                      `}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* =====================================================
          BOTTOM
      ====================================================== */}

      <div className="border-t border-slate-200 p-3">

        {/* View Website */}
        <NavLink
          to="/"
          onClick={onClose}
          className="
            mb-2
            flex
            min-h-[44px]
            items-center
            gap-3
            rounded-xl
            px-3
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:bg-slate-50
            hover:text-slate-950
          "
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <Home
              size={17}
              strokeWidth={1.8}
            />
          </span>

          <span>
            View Website
          </span>
        </NavLink>

        {/* Logout */}
        <button
          type="button"
          className="
            flex
            min-h-[44px]
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            text-sm
            font-semibold
            text-slate-500
            transition
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
            <LogOut
              size={17}
              strokeWidth={1.8}
            />
          </span>

          <span>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
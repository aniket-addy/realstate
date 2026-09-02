import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <AdminSidebar />


      {/* =====================================================
          MAIN CONTENT AREA
      ====================================================== */}

      <div className="min-h-screen lg:ml-[260px]">

        {/* =================================================
            HEADER
        ================================================== */}

        <AdminHeader />


        {/* =================================================
            PAGE CONTENT
        ================================================== */}

        <main className="min-h-[calc(100vh-72px)] bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;
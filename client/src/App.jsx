import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/admin/auth/login";
import ForgotPassword from "./pages/admin/auth/forgot_password";
import ResetPassword from "./pages/admin/auth/reset_password";
import AdminProfile from "./pages/admin/AdminProfile";

/* =========================================================
   PUBLIC PAGES
========================================================= */

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import ProjectDetails from "./pages/ProjectDetails";

/* =========================================================
   PUBLIC PROJECT PAGES
========================================================= */

import AuthorityProjects from "./pages/AuthorityProjects";
import BuilderProjects from "./pages/BuilderProjects";

/* =========================================================
   ADMIN PAGES
========================================================= */

/* Dashboard */
import AdminDashboard from "./pages/admin/AdminDashboard";

/* Authority Projects */
import AdminAuthorityProjects from "./pages/admin/AuthorityProjects";
import AddAuthorityProject from "./pages/admin/AddAuthorityProject";
import EditAuthorityProject from "./pages/admin/EditAuthorityProject";

/* Builder Projects */
import AdminBuilderProjects from "./pages/admin/BuilderProjects";
import AddBuilderProject from "./pages/admin/AddBuilderProject";
import EditBuilderProject from "./pages/admin/EditBuilderProject";

/* Leads */
import AdminLeads from "./pages/admin/AdminLeads";

/* =========================================================
   ADMIN LAYOUT
========================================================= */

import AdminLayout from "./components/admin/AdminLayout";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="*" element={<Navigate to="/admin/login" replace />} />

        {/* =====================================================
            PUBLIC WEBSITE
        ====================================================== */}

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* =====================================================
            PUBLIC PROJECT DETAILS
        ====================================================== */}

        {/*
          IMPORTANT:

          Same ProjectDetails component handles:

          /projects/:id
          /authority-projects/:id
          /builder-projects/:id

          This fixes the View Project redirect for both
          Authority Projects and Builder Projects.
        */}

        <Route
          path="/projects/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/authority-projects/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/builder-projects/:id"
          element={<ProjectDetails />}
        />


        {/* =====================================================
            PUBLIC PROJECT LISTING
        ====================================================== */}

        {/* Authority Projects */}

        <Route
          path="/authority-projects"
          element={<AuthorityProjects />}
        />


        {/* Builder Projects */}

        <Route
          path="/builder-projects"
          element={<BuilderProjects />}
        />


        {/* =====================================================
            COMPANY
        ====================================================== */}

        <Route
          path="/about"
          element={<AboutUs />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/blogs"
          element={<Blogs />}
        />


        {/* =====================================================
            ADMIN PANEL
        ====================================================== */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >

          {/* =================================================
              DASHBOARD

              /admin
              /admin/dashboard
          ================================================== */}

          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />


          {/* =================================================
              AUTHORITY PROJECTS

              /admin/authority-projects
              /admin/authority-projects/add
              /admin/authority-projects/edit/:id
          ================================================== */}

          <Route
            path="authority-projects"
            element={<AdminAuthorityProjects />}
          />

          <Route
            path="authority-projects/add"
            element={<AddAuthorityProject />}
          />

          <Route
            path="authority-projects/edit/:id"
            element={<EditAuthorityProject />}
          />


          {/* =================================================
              BUILDER PROJECTS

              /admin/builder-projects
              /admin/builder-projects/add
              /admin/builder-projects/edit/:id
          ================================================== */}

          <Route
            path="builder-projects"
            element={<AdminBuilderProjects />}
          />

          <Route
            path="builder-projects/add"
            element={<AddBuilderProject />}
          />

          <Route
            path="builder-projects/edit/:id"
            element={<EditBuilderProject />}
          />


          {/* =================================================
              LEADS

              /admin/leads
          ================================================== */}

          <Route
            path="leads"
            element={<AdminLeads />}
          />

        </Route>


        {/* =====================================================
            FALLBACK
        ====================================================== */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

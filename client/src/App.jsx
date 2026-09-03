
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// =========================================================
// COMMON
// =========================================================
import ScrollToTop from "./components/ScrollToTop";

// =========================================================
// ADMIN AUTH
// =========================================================
import Login from "./pages/admin/auth/login";
import ForgotPassword from "./pages/admin/auth/forgot_password";
import ResetPassword from "./pages/admin/auth/reset_password";

// =========================================================
// PUBLIC PAGES
// =========================================================
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

import ProjectDetails from "./pages/ProjectDetails";
import FeaturedProjectsPage from "./pages/FeaturedProjectsPage";
import NewProjectsPage from "./pages/NewProjectsPage";

import AuthorityProjects from "./pages/AuthorityProjects";
import BuilderProjects from "./pages/BuilderProjects";

// =========================================================
// ADMIN PAGES
// =========================================================
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";

// Authority Projects
import AdminAuthorityProjects from "./pages/admin/AuthorityProjects";
import AddAuthorityProject from "./pages/admin/AddAuthorityProject";
import EditAuthorityProject from "./pages/admin/EditAuthorityProject";

// Builder Projects
import AdminBuilderProjects from "./pages/admin/BuilderProjects";
import AddBuilderProject from "./pages/admin/AddBuilderProject";
import EditBuilderProject from "./pages/admin/EditBuilderProject";

// Leads
import AdminLeads from "./pages/admin/AdminLeads";

// Blogs
import AdminBlogs from "./pages/admin/AdminBlogs";
import AddBlog from "./pages/admin/AddBlog";
import EditBlog from "./pages/admin/EditBlog";

// =========================================================
// ADMIN LAYOUT & PROTECTED ROUTE
// =========================================================
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./pages/admin/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* =====================================================
            ADMIN AUTH ROUTES
        ====================================================== */}

        <Route
          path="/admin/login"
          element={<Login />}
        />

        <Route
          path="/admin/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/admin/reset-password/:token"
          element={<ResetPassword />}
        />


        {/* =====================================================
            PUBLIC WEBSITE
        ====================================================== */}

        <Route
          path="/"
          element={<Home />}
        />

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


        {/* =====================================================
            PUBLIC PROJECT LISTING
        ====================================================== */}

        <Route
          path="/authority-projects"
          element={<AuthorityProjects />}
        />

        <Route
          path="/builder-projects"
          element={<BuilderProjects />}
        />

        <Route
          path="/projects/featured"
          element={<FeaturedProjectsPage />}
        />

        <Route
          path="/projects/new"
          element={<NewProjectsPage />}
        />


        {/* =====================================================
            PUBLIC PROJECT DETAILS
        ====================================================== */}

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
            PUBLIC BLOGS
        ====================================================== */}

        <Route
          path="/blogs"
          element={<Blogs />}
        />

        <Route
          path="/blog/:id"
          element={<BlogDetails />}
        />


        {/* =====================================================
            PROTECTED ADMIN PANEL
        ====================================================== */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            {/* =================================================
                DASHBOARD
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
                ADMIN PROFILE
            ================================================== */}

            <Route
              path="profile"
              element={<AdminProfile />}
            />


            {/* =================================================
                AUTHORITY PROJECTS
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
            ================================================== */}

            <Route
              path="leads"
              element={<AdminLeads />}
            />


            {/* =================================================
                ADMIN BLOGS
            ================================================== */}

            <Route
              path="blogs"
              element={<AdminBlogs />}
            />

            <Route
              path="add-blog"
              element={<AddBlog />}
            />

            <Route
              path="blogs/edit/:id"
              element={<EditBlog />}
            />

          </Route>

        </Route>


        {/* =====================================================
            FALLBACK
        ====================================================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

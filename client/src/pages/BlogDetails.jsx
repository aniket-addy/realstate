import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, User } from "lucide-react";

import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const API_URL = "http://localhost:5000";

const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) {
        setError("Blog ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/blogs/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch blog");
        }

        const blogData = data.blog || data;

        if (!blogData || !blogData._id) {
          throw new Error("Blog data not found.");
        }

        setBlog(blogData);
      } catch (err) {
        console.error("Blog Details Error:", err);
        setError(err.message || "Unable to load blog.");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ===================== LOADING =====================
  if (loading) {
    return (
      <div className="w-full min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex min-h-[70vh] w-full items-center justify-center bg-white">
          <div className="text-center">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#b88b32]" />
            <p className="text-sm font-semibold text-[#607492]">
              Loading article...
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ===================== ERROR =====================
  if (error || !blog) {
    return (
      <div className="w-full min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="flex min-h-[70vh] w-full items-center justify-center bg-[#f8fafc] px-5">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h1 className="text-3xl font-extrabold text-[#14294b]">
              Blog Not Found
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              {error || "The requested blog could not be found."}
            </p>
            <Link
              to="/blogs"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#080d20] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#151b32]"
            >
              <ArrowLeft size={16} />
              Back to Blogs
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ===================== BLOG DETAILS =====================
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="w-full bg-white">
        <div className="mx-auto w-full max-w-[900px] px-5 pt-10 sm:px-6 lg:px-8">
          {/* CATEGORY */}
          {blog.category && (
            <span className="inline-flex rounded-full bg-[#faf2df] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#a8781f]">
              {blog.category}
            </span>
          )}

          {/* TITLE */}
          <h1 className="mt-4 break-words text-3xl font-extrabold leading-[1.2] tracking-[-0.02em] text-[#14294b] sm:text-4xl md:text-[42px]">
            {blog.title}
          </h1>

          {/* META (author / date) */}
          {/* <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            {blog.author && (
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#b88b32]" />
                By <span className="font-semibold text-slate-700">{blog.author}</span>
              </span>
            )}
            {blog.createdAt && (
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} className="text-[#b88b32]" />
                {formatDate(blog.createdAt)}
              </span>
            )}
          </div> */}
        </div>

        {/* FEATURED IMAGE */}
        {blog.featuredImage && (
          <div className="mx-auto mt-7 w-full max-w-[900px] px-5 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
              <img
                src={blog.featuredImage}
                alt={blog.title}
                className="block h-[260px] w-full object-cover sm:h-[360px] md:h-[440px]"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="mx-auto w-full max-w-[900px] px-5 py-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:p-10">
            {blog.excerpt && (
              <p className="break-words border-l-4 border-[#d6a84f] pl-5 text-base font-semibold leading-8 text-[#34445d] md:text-lg md:leading-9">
                {blog.excerpt}
              </p>
            )}

            {blog.content && (
              <div className="mt-6 whitespace-pre-line break-words text-[15px] leading-8 text-slate-600 md:text-base md:leading-9">
                {blog.content}
              </div>
            )}
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-700 transition hover:text-[#b88b32]"
            >
              <ArrowLeft size={15} />
              Back to All Blogs
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails;
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // FETCH BLOGS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/blogs"
        );

        const data = await response.json();

        console.log("Latest Blogs API Response:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch blogs"
          );
        }

        // Only published blogs
        const publishedBlogs = (data.blogs || [])
          .filter(
            (blog) => blog.status === "published"
          )
          .slice(0, 3);

        setBlogs(publishedBlogs);
      } catch (err) {
        console.error(
          "Fetch Latest Blogs Error:",
          err
        );

        setError(
          err.message ||
            "Failed to load blogs"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // BLOG DETAILS URL
  // =====================================================

  const getBlogUrl = (blog) => {
    return `/blog/${blog._id}`;
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">

      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-4xl">
              Latest From
              <span className="text-[#b88b32]">
                {" "}
                Investorise
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Market insights, investment guides and the latest updates from
              the world of real estate.
            </p>

          </div>

          {/* VIEW ALL */}

          {/* <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 self-start text-xs font-bold text-slate-700 transition hover:text-[#b88b32] sm:self-auto"
          >
            View All Blogs

            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link> */}

        </div>

        {/* =================================================
            LOADING
        ================================================== */}

        {loading && (
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >

                <div className="aspect-[1.65/1] animate-pulse bg-slate-200" />

                <div className="p-5">

                  <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />

                  <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-200" />

                  <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-200" />

                  <div className="mt-5 h-3 w-24 animate-pulse rounded bg-slate-200" />

                </div>

              </div>
            ))}

          </div>
        )}

        {/* =================================================
            ERROR
        ================================================== */}

        {!loading && error && (
          <div className="mt-10 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================== */}

        {!loading &&
          !error &&
          blogs.length === 0 && (
            <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 px-5 py-10 text-center">

              <p className="text-sm font-medium text-slate-500">
                No published blogs available.
              </p>

            </div>
          )}

        {/* =================================================
            BLOG CARDS
        ================================================== */}

        {!loading &&
          !error &&
          blogs.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">

              {blogs.map((blog) => (

                <article
                  key={blog._id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10"
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}

                  <Link
                    to={getBlogUrl(blog)}
                    className="relative block aspect-[1.65/1] overflow-hidden"
                  >

                    <img
                      src={
                        blog.featuredImage ||
                        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85"
                      }
                      alt={blog.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

                    {blog.category && (
                      <span className="absolute left-3 top-3 rounded-md bg-white px-2.5 py-1.5 text-[9px] font-extrabold uppercase tracking-wide text-slate-800">
                        {blog.category}
                      </span>
                    )}

                  </Link>

                  {/* =================================================
                      CONTENT
                  ================================================== */}

                  <div className="p-5">

                    {/* DATE + READ TIME */}
{/* 
                    <div className="flex items-center gap-3 text-[9px] font-medium text-slate-400">

                      <span className="flex items-center gap-1">

                        <CalendarDays size={12} />

                        {formatDate(blog.createdAt)}

                      </span>

                      <span className="flex items-center gap-1">

                        <Clock3 size={12} />

                        5 min read

                      </span>

                    </div> */}

                    {/* TITLE */}

                    <Link
                      to={getBlogUrl(blog)}
                    >

                      <h3 className="mt-3 line-clamp-2 text-[15px] font-bold leading-6 text-slate-900 transition-colors group-hover:text-[#b88b32]">
                        {blog.title}
                      </h3>

                    </Link>

                    {/* =================================================
                        READ ARTICLE
                    ================================================== */}

                    <Link
                      to={getBlogUrl(blog)}
                      className="group/link mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold text-slate-700 transition-colors hover:text-[#b88b32]"
                    >

                      Read Article

                      <ArrowRight
                        size={13}
                        className="transition-transform group-hover/link:translate-x-1"
                      />

                    </Link>

                  </div>

                </article>

              ))}

            </div>
          )}

      </div>

    </section>
  );
}

export default LatestBlogs;
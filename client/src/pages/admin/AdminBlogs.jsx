import React, {
  useEffect,
  useState,
} from "react";

import {
  Plus,
  Search,
  Eye,
  Pencil,
  FileText,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All Categories");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const navigate = useNavigate();

  // =====================================================
  // FETCH BLOGS FROM BACKEND
  // =====================================================

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/blogs"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch blogs"
        );
      }

      setBlogs(data.blogs || []);
    } catch (error) {
      console.error(
        "Fetch Blogs Error:",
        error
      );

      setError(
        error.message ||
          "Unable to load blogs"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD BLOGS
  // =====================================================

  useEffect(() => {
    fetchBlogs();
  }, []);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

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
  // FILTER BLOGS
  // =====================================================

  const filteredBlogs = blogs.filter(
    (blog) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        blog.title
          ?.toLowerCase()
          .includes(searchText) ||
        blog.category
          ?.toLowerCase()
          .includes(searchText) ||
        blog.author
          ?.toLowerCase()
          .includes(searchText);

      const matchesCategory =
        category === "All Categories" ||
        blog.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  // =====================================================
  // GET UNIQUE CATEGORIES
  // =====================================================

  const categories = [
    "All Categories",
    ...new Set(
      blogs
        .map((blog) => blog.category)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="min-h-screen bg-[#f3f6fa]">

      {/* =================================================
          PAGE CONTENT
      ================================================== */}

      <div className="w-full">

        <main className="p-5 md:p-7 lg:p-8">

          <div className="bg-white">

            {/* =================================================
                PAGE HEADER
            ================================================== */}

            <section className="border-b border-slate-200 px-6 py-7 md:px-8">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                  <div className="mb-3 flex items-center gap-3">

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#faf2df]">

                      <FileText
                        size={20}
                        strokeWidth={1.8}
                        className="text-[#c18d27]"
                      />

                    </span>

                    <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#b88b32]">
                      CONTENT MANAGEMENT
                    </span>

                  </div>

                  <h1 className="text-3xl font-extrabold tracking-tight text-[#14294b] md:text-4xl">
                    Blogs
                  </h1>

                  <p className="mt-1 text-sm text-slate-400 md:text-base">
                    Manage all blogs for your website.
                  </p>

                </div>

                {/* ADD BLOG */}

                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/add-blog")
                  }
                  className="
                    flex
                    min-h-[50px]
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-slate-950
                    px-6
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-slate-800
                  "
                >

                  <Plus
                    size={19}
                    strokeWidth={2}
                  />

                  Add Blog

                </button>

              </div>

            </section>

            {/* =================================================
                SEARCH
            ================================================== */}

            <section className="bg-[#f8fafc] px-6 py-6 md:px-8">

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                <div className="flex flex-col gap-3 md:flex-row">

                  {/* Search */}

                  <div className="relative flex-1">

                    <Search
                      size={20}
                      strokeWidth={1.8}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-slate-400
                      "
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search blogs..."
                      className="
                        h-[52px]
                        w-full
                        rounded-xl
                        border
                        border-slate-200
                        bg-white
                        pl-12
                        pr-4
                        text-sm
                        text-slate-700
                        outline-none
                        transition
                        placeholder:text-slate-400
                        focus:border-[#c18d27]
                      "
                    />

                  </div>

                  {/* Category */}

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value
                      )
                    }
                    className="
                      h-[52px]
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      text-sm
                      text-slate-700
                      outline-none
                      md:w-[210px]
                    "
                  >

                    {categories.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      )
                    )}

                  </select>

                </div>

              </div>

            </section>

            {/* =================================================
                ALL BLOGS
            ================================================== */}

            <section className="bg-[#f8fafc] px-6 pb-8 md:px-8">

              {/* Section Heading */}

              <div className="mb-4">

                <h2 className="text-lg font-extrabold text-[#14294b]">
                  All Blogs
                </h2>

                <p className="mt-1 text-sm text-slate-400">

                  {filteredBlogs.length}{" "}
                  {filteredBlogs.length === 1
                    ? "blog"
                    : "blogs"}{" "}
                  found

                </p>

              </div>

              {/* =================================================
                  ERROR
              ================================================== */}

              {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* =================================================
                  TABLE
              ================================================== */}

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* =================================================
                    LOADING
                ================================================== */}

                {loading ? (

                  <div className="flex min-h-[250px] items-center justify-center">

                    <div className="text-center">

                      <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-[#c18d27]" />

                      <p className="text-sm text-slate-400">
                        Loading blogs...
                      </p>

                    </div>

                  </div>

                ) : filteredBlogs.length === 0 ? (

                  /* =================================================
                      EMPTY
                  ================================================== */

                  <div className="flex min-h-[250px] items-center justify-center px-6">

                    <div className="text-center">

                      <FileText
                        size={40}
                        className="mx-auto mb-3 text-slate-300"
                      />

                      <h3 className="text-base font-bold text-[#14294b]">
                        No blogs found
                      </h3>

                      <p className="mt-1 text-sm text-slate-400">

                        {search ||
                        category !==
                          "All Categories"
                          ? "Try changing your search or category filter."
                          : "No blogs have been added yet."}

                      </p>

                    </div>

                  </div>

                ) : (

                  <>

                    {/* =================================================
                        DESKTOP TABLE
                    ================================================== */}

                    <div className="hidden overflow-x-auto md:block">

                      <table className="w-full min-w-[850px]">

                        <thead>

                          <tr className="border-b border-slate-200 bg-[#f8fafc]">

                            <th className="px-6 py-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                              Blog
                            </th>

                            <th className="px-5 py-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                              Category
                            </th>

                            <th className="px-5 py-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                              Date
                            </th>

                            <th className="px-5 py-5 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                              Status
                            </th>

                            <th className="px-6 py-5 text-right text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                              Actions
                            </th>

                          </tr>

                        </thead>

                        <tbody>

                          {filteredBlogs.map(
                            (blog) => (

                              <tr
                                key={
                                  blog._id
                                }
                                className="
                                  border-b
                                  border-slate-100
                                  last:border-0
                                  hover:bg-slate-50
                                "
                              >

                                {/* BLOG */}

                                <td className="px-6 py-5">

                                  <div className="flex items-center gap-4">

                                    {blog.featuredImage ? (

                                      <img
                                        src={
                                          blog.featuredImage
                                        }
                                        alt={
                                          blog.title
                                        }
                                        className="
                                          h-14
                                          w-20
                                          rounded-lg
                                          object-cover
                                          ring-1
                                          ring-slate-200
                                        "
                                      />

                                    ) : (

                                      <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-slate-100 ring-1 ring-slate-200">

                                        <FileText
                                          size={22}
                                          className="text-slate-300"
                                        />

                                      </div>

                                    )}

                                    <div className="max-w-[380px]">

                                      <h3 className="line-clamp-2 text-sm font-extrabold text-[#14294b]">
                                        {
                                          blog.title
                                        }
                                      </h3>

                                      <p className="mt-1 text-xs text-slate-400">
                                        Website Blog
                                      </p>

                                    </div>

                                  </div>

                                </td>

                                {/* CATEGORY */}

                                <td className="px-5 py-5">

                                  <span className="rounded-full bg-[#faf2df] px-3 py-1.5 text-xs font-semibold text-[#a8781f]">
                                    {
                                      blog.category
                                    }
                                  </span>

                                </td>

                                {/* DATE */}

                                <td className="px-5 py-5 text-sm text-slate-600">

                                  {formatDate(
                                    blog.createdAt
                                  )}

                                </td>

                                {/* STATUS */}

                                <td className="px-5 py-5">

                                  <span
                                    className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                                      blog.status ===
                                      "published"
                                        ? "bg-blue-50 text-blue-600"
                                        : "bg-slate-100 text-slate-500"
                                    }`}
                                  >
                                    {blog.status ===
                                    "published"
                                      ? "Published"
                                      : "Draft"}
                                  </span>

                                </td>

                                {/* ACTIONS */}

                                <td className="px-6 py-5">

                                  <div className="flex justify-end gap-4">

                                    {/* VIEW */}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(
                                          `/blog/${blog._id}`
                                        )
                                      }
                                      className="
                                        text-slate-400
                                        transition
                                        hover:text-[#b88b32]
                                      "
                                      title="View Blog"
                                    >

                                      <Eye
                                        size={19}
                                        strokeWidth={
                                          1.8
                                        }
                                      />

                                    </button>

                                    {/* EDIT */}

                                    <button
                                      type="button"
                                      onClick={() =>
                                        navigate(
                                          `/admin/blogs/edit/${blog._id}`
                                        )
                                      }
                                      className="
                                        text-slate-400
                                        transition
                                        hover:text-[#b88b32]
                                      "
                                      title="Edit Blog"
                                    >

                                      <Pencil
                                        size={19}
                                        strokeWidth={
                                          1.8
                                        }
                                      />

                                    </button>

                                  </div>

                                </td>

                              </tr>

                            )
                          )}

                        </tbody>

                      </table>

                    </div>

                    {/* =================================================
                        MOBILE BLOG CARDS
                    ================================================== */}

                    <div className="divide-y divide-slate-100 md:hidden">

                      {filteredBlogs.map(
                        (blog) => (

                          <div
                            key={
                              blog._id
                            }
                            className="p-5"
                          >

                            <div className="flex gap-4">

                              {blog.featuredImage ? (

                                <img
                                  src={
                                    blog.featuredImage
                                  }
                                  alt={
                                    blog.title
                                  }
                                  className="
                                    h-20
                                    w-24
                                    shrink-0
                                    rounded-xl
                                    object-cover
                                  "
                                />

                              ) : (

                                <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-slate-100">

                                  <FileText
                                    size={25}
                                    className="text-slate-300"
                                  />

                                </div>

                              )}

                              <div className="min-w-0 flex-1">

                                <h3 className="text-sm font-extrabold leading-5 text-[#14294b]">
                                  {
                                    blog.title
                                  }
                                </h3>

                                <p className="mt-2 text-xs text-slate-400">
                                  {formatDate(
                                    blog.createdAt
                                  )}
                                </p>

                                <div className="mt-2 flex flex-wrap items-center gap-2">

                                  <span className="rounded-full bg-[#faf2df] px-2.5 py-1 text-[10px] font-bold text-[#a8781f]">
                                    {
                                      blog.category
                                    }
                                  </span>

                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                      blog.status ===
                                      "published"
                                        ? "bg-blue-50 text-blue-600"
                                        : "bg-slate-100 text-slate-500"
                                    }`}
                                  >
                                    {blog.status ===
                                    "published"
                                      ? "Published"
                                      : "Draft"}
                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* Mobile Actions */}

                            <div className="mt-4 flex justify-end gap-3">

                              {/* View */}

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/blog/${blog._id}`
                                  )
                                }
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-slate-100
                                  text-slate-500
                                  hover:bg-slate-200
                                "
                                title="View Blog"
                              >

                                <Eye
                                  size={17}
                                />

                              </button>

                              {/* Edit */}

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/admin/blogs/edit/${blog._id}`
                                  )
                                }
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-slate-100
                                  text-slate-500
                                  hover:bg-slate-200
                                "
                                title="Edit Blog"
                              >

                                <Pencil
                                  size={17}
                                />

                              </button>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </>

                )}

              </div>

            </section>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Blogs;
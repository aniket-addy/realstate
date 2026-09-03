import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    status: "Draft",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // IMAGE SELECT
  // ==========================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB.");
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================
  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // ==========================================
  // CREATE SLUG
  // ==========================================
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // ==========================================
  // SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter blog title.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please select blog category.");
      return;
    }

    if (!formData.content.trim()) {
      alert("Please enter blog content.");
      return;
    }

    if (!imageFile) {
      alert("Please select a featured image.");
      return;
    }

    try {
      setLoading(true);

      // ======================================
      // FORM DATA
      // ======================================
      const blogData = new FormData();

      blogData.append(
        "title",
        formData.title.trim()
      );

      blogData.append(
        "slug",
        createSlug(formData.title)
      );

      blogData.append(
        "category",
        formData.category
      );

      blogData.append(
        "author",
        "Admin"
      );

      blogData.append(
        "excerpt",
        formData.description.trim()
      );

      blogData.append(
        "content",
        formData.content.trim()
      );

      blogData.append(
        "status",
        formData.status === "Published"
          ? "published"
          : "draft"
      );

      blogData.append(
        "featured",
        "false"
      );

      blogData.append(
        "featuredImage",
        imageFile
      );

      // ======================================
      // API REQUEST
      // ======================================
      const response = await fetch(
        "http://localhost:5000/api/blogs",
        {
          method: "POST",
          body: blogData,
        }
      );

      const data = await response.json();

      // ======================================
      // API ERROR
      // ======================================
      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create blog"
        );
      }

      console.log(
        "Blog Created:",
        data.blog
      );

      alert(
        data.message ||
          "Blog created successfully."
      );

      navigate("/admin/blogs");
    } catch (error) {
      console.error(
        "Add Blog Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong while creating blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      {/* ==========================================
          CONTENT
      ========================================== */}

      <main className="p-5 md:p-7 lg:p-8">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div className="mb-7">

          <div className="flex items-center gap-4">

            {/* ICON */}

            <div className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-2xl bg-[#fff4dc] text-[#b58222]">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h9l5 5v7"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 4v5h5"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 13h7M8 17h5"
                />
              </svg>

            </div>

            <div>

              <h1 className="text-3xl font-extrabold text-[#14294b]">
                Add Blog
              </h1>

              <p className="mt-1 text-base text-[#8192ad]">
                Create a new blog for your website.
              </p>

            </div>

          </div>

        </div>

        {/* ==========================================
            FORM
        ========================================== */}

        <form onSubmit={handleSubmit}>

          {/* ==========================================
              BASIC INFORMATION
          ========================================== */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-[#dfe6ef] bg-white shadow-sm">

            <div className="border-b border-[#e5eaf1] px-7 py-6">

              <h2 className="text-xl font-extrabold text-[#14294b]">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-[#8a9bb5]">
                Enter the main information about the blog.
              </p>

            </div>

            <div className="p-7">

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* BLOG TITLE */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-[#263a58]">
                    Blog Title{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Top 10 Real Estate Investment Tips"
                    required
                    className="h-[54px] w-full rounded-xl border border-[#dce4ee] px-4 text-[#263a58] outline-none placeholder:text-[#9aabc1] focus:border-[#b58222] focus:ring-2 focus:ring-[#b58222]/10"
                  />

                </div>

                {/* CATEGORY */}

                <div>

                  <label className="mb-2 block text-sm font-bold text-[#263a58]">
                    Blog Category{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="h-[54px] w-full rounded-xl border border-[#dce4ee] bg-white px-4 text-[#263a58] outline-none focus:border-[#b58222] focus:ring-2 focus:ring-[#b58222]/10"
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="Investment">
                      Investment
                    </option>

                    <option value="Market Insights">
                      Market Insights
                    </option>

                    <option value="Guide">
                      Guide
                    </option>

                    <option value="Property News">
                      Property News
                    </option>

                    <option value="Real Estate">
                      Real Estate
                    </option>

                  </select>

                </div>

                {/* SHORT DESCRIPTION */}

                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-bold text-[#263a58]">
                    Short Description
                  </label>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write a short description about the blog..."
                    className="w-full resize-none rounded-xl border border-[#dce4ee] px-4 py-4 text-[#263a58] outline-none placeholder:text-[#9aabc1] focus:border-[#b58222] focus:ring-2 focus:ring-[#b58222]/10"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* ==========================================
              FEATURED IMAGE
          ========================================== */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-[#dfe6ef] bg-white shadow-sm">

            <div className="border-b border-[#e5eaf1] px-7 py-6">

              <h2 className="text-xl font-extrabold text-[#14294b]">
                Featured Image
              </h2>

              <p className="mt-1 text-sm text-[#8a9bb5]">
                Upload the main image for this blog.
              </p>

            </div>

            <div className="p-7">

              {!imagePreview ? (

                <label
                  htmlFor="blog-image"
                  className="flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d8e1ec] bg-[#fafbfd] transition hover:border-[#b58222]"
                >

                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4dc] text-[#b58222]">

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4-4 4 4 3-3 5 5"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 20h16"
                      />

                      <circle
                        cx="9"
                        cy="8"
                        r="2"
                      />

                    </svg>

                  </div>

                  <p className="text-sm font-bold text-[#526783]">
                    Click to upload image
                  </p>

                  <p className="mt-2 text-xs text-[#99a9bd]">
                    PNG, JPG or WEBP · Maximum 5MB
                  </p>

                </label>

              ) : (

                <div className="relative overflow-hidden rounded-xl border border-[#dce4ee]">

                  <img
                    src={imagePreview}
                    alt="Blog Preview"
                    className="h-[300px] w-full object-cover md:h-[420px]"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-4 top-4 rounded-lg bg-white px-4 py-2 text-sm font-bold text-red-500 shadow-md transition hover:bg-red-50"
                  >
                    Remove
                  </button>

                </div>

              )}

              <input
                id="blog-image"
                type="file"
                name="featuredImage"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

            </div>

          </section>

          {/* ==========================================
              BLOG CONTENT
          ========================================== */}

          <section className="mb-6 overflow-hidden rounded-2xl border border-[#dfe6ef] bg-white shadow-sm">

            <div className="border-b border-[#e5eaf1] px-7 py-6">

              <h2 className="text-xl font-extrabold text-[#14294b]">
                Blog Content
              </h2>

              <p className="mt-1 text-sm text-[#8a9bb5]">
                Write the complete content of your blog.
              </p>

            </div>

            <div className="p-7">

              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                required
                placeholder="Write your blog content here..."
                className="w-full resize-y rounded-xl border border-[#dce4ee] px-5 py-4 text-[15px] leading-7 text-[#263a58] outline-none placeholder:text-[#9aabc1] focus:border-[#b58222] focus:ring-2 focus:ring-[#b58222]/10"
              />

            </div>

          </section>

          {/* ==========================================
              STATUS & BUTTONS
          ========================================== */}

          <section className="mb-8 rounded-2xl border border-[#dfe6ef] bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

              {/* STATUS */}

              <div className="w-full md:max-w-[350px]">

                <label className="mb-2 block text-sm font-bold text-[#263a58]">
                  Blog Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="h-[54px] w-full rounded-xl border border-[#dce4ee] bg-white px-4 text-[#263a58] outline-none focus:border-[#b58222] focus:ring-2 focus:ring-[#b58222]/10"
                >

                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Published">
                    Published
                  </option>

                </select>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/admin/blogs")
                  }
                  className="rounded-xl border border-[#d8e1ec] bg-white px-7 py-3.5 text-sm font-bold text-[#607492] transition hover:bg-[#f7f9fc]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#080d20] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#151b32] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Saving..."
                    : "Save Blog"}
                </button>

              </div>

            </div>

          </section>

        </form>

      </main>

    </div>
  );
};

export default AddBlog;
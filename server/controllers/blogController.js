const Blog = require("../models/Blog");

// ==========================================
// CREATE BLOG
// ==========================================

const createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      author,
      excerpt,
      content,
      seoTitle,
      seoDescription,
      status,
      featured,
    } = req.body;

    if (!title || !slug || !category || !author || !content) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const existingBlog = await Blog.findOne({ slug });

    if (existingBlog) {
      return res.status(400).json({
        message: "Blog with this slug already exists",
      });
    }

    const blog = await Blog.create({
      title,
      slug,
      category,
      author,
      excerpt,
      content,
      seoTitle,
      seoDescription,
      status: status || "draft",

      featured:
        featured === "true" || featured === true,

      // Cloudinary image URL
      featuredImage: req.file
        ? req.file.path
        : "",
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error(
      "Create Blog Error:",
      error
    );

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL BLOGS
// ==========================================

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      blogs,
    });

  } catch (error) {
    console.error(
      "Get Blogs Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};


// ==========================================
// GET SINGLE BLOG
// ==========================================

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error(
      "Get Blog Error:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch blog",
      error: error.message,
    });
  }
};


// ==========================================
// UPDATE BLOG
// ==========================================

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const {
      title,
      slug,
      category,
      author,
      excerpt,
      content,
      seoTitle,
      seoDescription,
      status,
      featured,
    } = req.body;

    // ======================================
    // CHECK SLUG
    // ======================================

    if (
      slug &&
      slug !== blog.slug
    ) {
      const existingBlog =
        await Blog.findOne({
          slug,
          _id: {
            $ne: req.params.id,
          },
        });

      if (existingBlog) {
        return res.status(400).json({
          message:
            "Blog with this slug already exists",
        });
      }

      blog.slug = slug;
    }

    // ======================================
    // UPDATE FIELDS
    // ======================================

    if (title !== undefined) {
      blog.title = title;
    }

    if (category !== undefined) {
      blog.category = category;
    }

    if (author !== undefined) {
      blog.author = author;
    }

    if (excerpt !== undefined) {
      blog.excerpt = excerpt;
    }

    if (content !== undefined) {
      blog.content = content;
    }

    if (seoTitle !== undefined) {
      blog.seoTitle = seoTitle;
    }

    if (seoDescription !== undefined) {
      blog.seoDescription =
        seoDescription;
    }

    if (status !== undefined) {
      blog.status = status;
    }

    if (featured !== undefined) {
      blog.featured =
        featured === "true" ||
        featured === true;
    }

    // ======================================
    // NEW CLOUDINARY IMAGE
    // ======================================

    if (req.file) {
      blog.featuredImage =
        req.file.path;
    }

    // ======================================
    // SAVE
    // ======================================

    await blog.save();

    res.json({
      success: true,
      message:
        "Blog updated successfully",
      blog,
    });

  } catch (error) {
    console.error(
      "Update Blog Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to update blog",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE BLOG
// ==========================================

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(
      req.params.id
    );

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    await Blog.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message:
        "Blog deleted successfully",
    });

  } catch (error) {
    console.error(
      "Delete Blog Error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to delete blog",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORTS
// ==========================================

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
// src/utils/projectutils.js

/**
 * ============================================================
 * PROJECT UTILS
 * ============================================================
 *
 * Common utility functions for:
 *
 * - Authority Projects
 * - Builder Projects
 * - Featured Projects
 * - New Projects
 * - Project Cards
 * - Project Images
 * - Project Prices
 * - Project Types
 *
 * Backend can return slightly different field names.
 * These utilities normalize them into one common format.
 */


/**
 * ============================================================
 * NORMALIZE PROJECT
 * ============================================================
 */

export function normalizeProject(project = {}) {
  /*
   * ----------------------------------------------------------
   * ID
   * ----------------------------------------------------------
   */

  const id =
    project?._id ||
    project?.id ||
    project?.projectId ||
    "";


  /*
   * ----------------------------------------------------------
   * NAME
   * ----------------------------------------------------------
   */

  const name =
    project?.name ||
    project?.projectName ||
    project?.title ||
    "Untitled Project";


  /*
   * ----------------------------------------------------------
   * LOCATION
   * ----------------------------------------------------------
   */

  const location =
    project?.location ||
    project?.address ||
    project?.projectLocation ||
    project?.city ||
    "";


  /*
   * ----------------------------------------------------------
   * CATEGORY
   * ----------------------------------------------------------
   */

  const category =
    project?.category ||
    project?.projectCategory ||
    project?.projectType ||
    "";


  /*
   * ----------------------------------------------------------
   * TYPE
   * ----------------------------------------------------------
   */

  const type =
    project?.type ||
    project?.propertyType ||
    project?.unitType ||
    project?.projectType ||
    project?.projectCategory ||
    "";


  /*
   * ----------------------------------------------------------
   * PRICE
   * ----------------------------------------------------------
   */

  const price =
    project?.price ||
    project?.startingPrice ||
    project?.minPrice ||
    project?.priceFrom ||
    "";


  /*
   * ----------------------------------------------------------
   * IMAGE
   * ----------------------------------------------------------
   *
   * IMPORTANT:
   *
   * Authority backend can store:
   *
   * image: "cloudinary-url"
   *
   * OR
   *
   * images: [
   *   "cloudinary-url"
   * ]
   *
   * So images[0] is also checked.
   */

  const image =
    project?.image ||
    project?.coverImage ||
    project?.featuredImage ||
    project?.bannerImage ||
    project?.propertyImage ||
    project?.images?.[0] ||
    project?.gallery?.[0] ||
    "";


  /*
   * ----------------------------------------------------------
   * SLUG
   * ----------------------------------------------------------
   */

  const slug =
    project?.slug ||
    createSlug(name);


  /*
   * ----------------------------------------------------------
   * HOMEPAGE SECTIONS
   * ----------------------------------------------------------
   *
   * Supports older frontend structure:
   *
   * homepageSections
   * homeSections
   * sections
   */

  const homepageSections =
    project?.homepageSections ||
    project?.homeSections ||
    project?.sections ||
    [];


  /*
   * ----------------------------------------------------------
   * RETURN NORMALIZED PROJECT
   * ----------------------------------------------------------
   */

  return {
    ...project,

    id,

    name,

    location,

    category,

    type,

    price,

    image,

    slug,

    /*
     * IMPORTANT:
     *
     * Backend fields.
     *
     * These are what your Admin form is saving.
     */

    featured:
      project?.featured === true,

    newProject:
      project?.newProject === true,

    /*
     * Normalize old section system also.
     */

    homepageSections:
      normalizeSections(homepageSections),
  };
}


/**
 * ============================================================
 * NORMALIZE SECTIONS
 * ============================================================
 *
 * Converts:
 *
 * ["Featured", "New"]
 *
 * into:
 *
 * ["featured", "new"]
 *
 * Also supports:
 *
 * "featured,new"
 */

export function normalizeSections(sections) {
  /*
   * No sections
   */

  if (!sections) {
    return [];
  }


  /*
   * Array
   */

  if (Array.isArray(sections)) {
    return sections
      .map((section) =>
        String(section)
          .toLowerCase()
          .trim()
      )
      .filter(Boolean);
  }


  /*
   * Comma separated string
   */

  return String(sections)
    .split(",")
    .map((section) =>
      section
        .toLowerCase()
        .trim()
    )
    .filter(Boolean);
}


/**
 * ============================================================
 * CHECK HOMEPAGE SECTION
 * ============================================================
 *
 * This is the IMPORTANT function.
 *
 * FeaturedProjects calls:
 *
 * filterProjectsBySection(
 *   projects,
 *   "featured"
 * )
 *
 * NewProjects calls:
 *
 * filterProjectsBySection(
 *   projects,
 *   "new"
 * )
 *
 *
 * Backend:
 *
 * featured: true
 * newProject: true
 *
 * will now work.
 */

export function isInHomepageSection(
  project,
  section
) {
  if (!project) {
    return false;
  }


  /*
   * Normalize section name
   */

  const normalizedSection =
    String(section)
      .toLowerCase()
      .trim();


  /*
   * ----------------------------------------------------------
   * FEATURED
   * ----------------------------------------------------------
   *
   * Backend:
   *
   * featured: true
   */

  if (
    normalizedSection === "featured" &&
    project?.featured === true
  ) {
    return true;
  }


  /*
   * ----------------------------------------------------------
   * NEW
   * ----------------------------------------------------------
   *
   * Backend:
   *
   * newProject: true
   */

  if (
    normalizedSection === "new" &&
    project?.newProject === true
  ) {
    return true;
  }


  /*
   * ----------------------------------------------------------
   * OLD HOMEPAGE SECTION SYSTEM
   * ----------------------------------------------------------
   *
   * Keep this for compatibility.
   */

  const sections =
    normalizeSections(
      project?.homepageSections ||
        project?.homeSections ||
        project?.sections
    );


  return sections.includes(
    normalizedSection
  );
}


/**
 * ============================================================
 * FILTER PROJECTS BY HOMEPAGE SECTION
 * ============================================================
 */

export function filterProjectsBySection(
  projects = [],
  section
) {
  /*
   * Make sure projects is an array.
   */

  if (!Array.isArray(projects)) {
    return [];
  }


  return projects
    .map((project) =>
      normalizeProject(project)
    )
    .filter((project) =>
      isInHomepageSection(
        project,
        section
      )
    );
}


/**
 * ============================================================
 * CREATE SLUG
 * ============================================================
 */

export function createSlug(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      "");
}


/**
 * ============================================================
 * GET PROJECT IMAGE
 * ============================================================
 *
 * Supports:
 *
 * image
 * coverImage
 * featuredImage
 * bannerImage
 * propertyImage
 * images[0]
 * gallery[0]
 */

export function getProjectImage(project) {
  if (!project) {
    return "";
  }


  return (
    project?.image ||
    project?.coverImage ||
    project?.featuredImage ||
    project?.bannerImage ||
    project?.propertyImage ||
    project?.images?.[0] ||
    project?.gallery?.[0] ||
    ""
  );
}


/**
 * ============================================================
 * GET PROJECT PRICE
 * ============================================================
 */

export function getProjectPrice(project) {
  if (!project) {
    return "";
  }


  return (
    project?.price ||
    project?.startingPrice ||
    project?.minPrice ||
    project?.priceFrom ||
    ""
  );
}


/**
 * ============================================================
 * GET PROJECT TYPE
 * ============================================================
 */

export function getProjectType(project) {
  if (!project) {
    return "";
  }


  return (
    project?.type ||
    project?.propertyType ||
    project?.unitType ||
    project?.projectType ||
    project?.projectCategory ||
    ""
  );
}
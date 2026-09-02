import {
  FileText,
  ImagePlus,
  Map,
  Upload,
  X,
  Eye,
} from "lucide-react";

import { useRef, useState } from "react";

function ProjectMediaUpload({
  value = {},
  onChange,
}) {
  const coverInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const brochureInputRef = useRef(null);
  const mapInputRef = useRef(null);

  const [previewImage, setPreviewImage] =
    useState(null);

  const media = {
    coverImage: value?.coverImage || null,
    galleryImages: Array.isArray(
      value?.galleryImages
    )
      ? value.galleryImages
      : [],
    brochure: value?.brochure || null,
    mapImage: value?.mapImage || null,
  };

  // =========================================================
  // CREATE IMAGE PREVIEW
  // =========================================================

  const createImageObject = (file) => {
    return {
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    };
  };

  // =========================================================
  // COVER IMAGE
  // =========================================================

  const handleCoverImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    const image = createImageObject(file);

    if (onChange) {
      onChange({
        ...media,
        coverImage: image,
      });
    }

    event.target.value = "";
  };

  // =========================================================
  // GALLERY IMAGES
  // =========================================================

  const handleGalleryImages = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (!files.length) return;

    const images = files
      .filter((file) =>
        file.type.startsWith("image/")
      )
      .map(createImageObject);

    if (!images.length) {
      event.target.value = "";
      return;
    }

    if (onChange) {
      onChange({
        ...media,
        galleryImages: [
          ...media.galleryImages,
          ...images,
        ],
      });
    }

    event.target.value = "";
  };

  // =========================================================
  // BROCHURE
  // =========================================================

  const handleBrochure = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const isPdf =
      file.type === "application/pdf";

    if (!isPdf) {
      event.target.value = "";
      return;
    }

    if (onChange) {
      onChange({
        ...media,
        brochure: {
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        },
      });
    }

    event.target.value = "";
  };

  // =========================================================
  // MAP IMAGE
  // =========================================================

  const handleMapImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    const image = createImageObject(file);

    if (onChange) {
      onChange({
        ...media,
        mapImage: image,
      });
    }

    event.target.value = "";
  };

  // =========================================================
  // REMOVE COVER
  // =========================================================

  const removeCoverImage = () => {
    if (media.coverImage?.preview) {
      URL.revokeObjectURL(
        media.coverImage.preview
      );
    }

    if (onChange) {
      onChange({
        ...media,
        coverImage: null,
      });
    }
  };

  // =========================================================
  // REMOVE GALLERY IMAGE
  // =========================================================

  const removeGalleryImage = (index) => {
    const image =
      media.galleryImages[index];

    if (image?.preview) {
      URL.revokeObjectURL(
        image.preview
      );
    }

    const updatedImages =
      media.galleryImages.filter(
        (_, imageIndex) =>
          imageIndex !== index
      );

    if (onChange) {
      onChange({
        ...media,
        galleryImages: updatedImages,
      });
    }
  };

  // =========================================================
  // REMOVE BROCHURE
  // =========================================================

  const removeBrochure = () => {
    if (onChange) {
      onChange({
        ...media,
        brochure: null,
      });
    }
  };

  // =========================================================
  // REMOVE MAP
  // =========================================================

  const removeMapImage = () => {
    if (media.mapImage?.preview) {
      URL.revokeObjectURL(
        media.mapImage.preview
      );
    }

    if (onChange) {
      onChange({
        ...media,
        mapImage: null,
      });
    }
  };

  // =========================================================
  // FORMAT FILE SIZE
  // =========================================================

  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";

    const mb = bytes / 1024 / 1024;

    if (mb >= 1) {
      return `${mb.toFixed(1)} MB`;
    }

    return `${Math.max(
      1,
      Math.round(bytes / 1024)
    )} KB`;
  };

  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
          border-b
          border-slate-200
          px-5
          py-4
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-[#f7f0e2]
            text-[#b88b32]
          "
        >
          <ImagePlus size={17} />
        </div>

        <div>
          <h2 className="text-sm font-extrabold text-slate-950">
            Project Media
          </h2>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Upload project images, gallery and brochure
          </p>
        </div>
      </div>

      <div className="space-y-7 p-5">
        {/* ===================================================
            COVER IMAGE
        ==================================================== */}

        <div>
          <div className="mb-3">
            <h3 className="text-xs font-extrabold text-slate-800">
              Cover Image
              <span className="ml-1 text-red-500">
                *
              </span>
            </h3>

            <p className="mt-1 text-[10px] text-slate-400">
              This image will be displayed as the main project image.
            </p>
          </div>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverImage}
          />

          {media.coverImage ? (
            <div
              className="
                relative
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-slate-100
              "
            >
              <img
                src={
                  media.coverImage.preview ||
                  media.coverImage.url
                }
                alt="Project cover"
                className="
                  h-[280px]
                  w-full
                  object-cover
                  sm:h-[340px]
                "
              />

              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  flex
                  items-center
                  justify-between
                  gap-3
                  bg-gradient-to-t
                  from-black/70
                  to-transparent
                  px-4
                  pb-4
                  pt-10
                "
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-white">
                    {media.coverImage.name ||
                      "Project Cover"}
                  </p>

                  {media.coverImage.size && (
                    <p className="mt-0.5 text-[10px] text-white/70">
                      {formatFileSize(
                        media.coverImage.size
                      )}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={removeCoverImage}
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-white/95
                    text-slate-700
                    shadow
                    transition
                    hover:bg-white
                    hover:text-red-500
                  "
                  title="Remove cover image"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                coverInputRef.current?.click()
              }
              className="
                flex
                min-h-[220px]
                w-full
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-slate-200
                bg-slate-50
                px-5
                text-center
                transition
                hover:border-[#d6a84f]
                hover:bg-[#fdfaf4]
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-[#b88b32]
                  shadow-sm
                "
              >
                <Upload size={19} />
              </div>

              <p className="mt-4 text-xs font-bold text-slate-700">
                Upload Cover Image
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                JPG, PNG or WEBP
              </p>
            </button>
          )}
        </div>

        {/* ===================================================
            GALLERY
        ==================================================== */}

        <div className="border-t border-slate-100 pt-7">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">
                Gallery Images
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Upload multiple images of the project.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
              {media.galleryImages.length} Images
            </span>
          </div>

          <input
            ref={galleryInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleGalleryImages}
          />

          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
              lg:grid-cols-4
            "
          >
            {media.galleryImages.map(
              (image, index) => (
                <div
                  key={`${image.name}-${index}`}
                  className="
                    group
                    relative
                    aspect-[4/3]
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-100
                  "
                >
                  <img
                    src={
                      image.preview ||
                      image.url
                    }
                    alt={`Gallery ${index + 1}`}
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/0
                      transition
                      group-hover:bg-black/30
                    "
                  />

                  <div
                    className="
                      absolute
                      right-2
                      top-2
                      flex
                      gap-1.5
                      opacity-0
                      transition
                      group-hover:opacity-100
                    "
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setPreviewImage(
                          image.preview ||
                            image.url
                        )
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                        text-slate-700
                        shadow
                        hover:text-[#b88b32]
                      "
                      title="Preview"
                    >
                      <Eye size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        removeGalleryImage(
                          index
                        )
                      }
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                        text-slate-700
                        shadow
                        hover:text-red-500
                      "
                      title="Remove"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  <span
                    className="
                      absolute
                      bottom-2
                      left-2
                      rounded-md
                      bg-black/60
                      px-2
                      py-1
                      text-[9px]
                      font-bold
                      text-white
                    "
                  >
                    {index + 1}
                  </span>
                </div>
              )
            )}

            {/* ADD GALLERY BUTTON */}

            <button
              type="button"
              onClick={() =>
                galleryInputRef.current?.click()
              }
              className="
                flex
                aspect-[4/3]
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                border-slate-200
                bg-slate-50
                transition
                hover:border-[#d6a84f]
                hover:bg-[#fdfaf4]
              "
            >
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-white
                  text-[#b88b32]
                  shadow-sm
                "
              >
                <ImagePlus size={17} />
              </div>

              <span className="mt-2 text-[10px] font-bold text-slate-600">
                Add Images
              </span>
            </button>
          </div>
        </div>

        {/* ===================================================
            BROCHURE + MAP
        ==================================================== */}

        <div
          className="
            grid
            gap-5
            border-t
            border-slate-100
            pt-7
            md:grid-cols-2
          "
        >
          {/* BROCHURE */}

          <div>
            <div className="mb-3">
              <h3 className="text-xs font-extrabold text-slate-800">
                Project Brochure
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Upload the official project brochure in PDF format.
              </p>
            </div>

            <input
              ref={brochureInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleBrochure}
            />

            {media.brochure ? (
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-3
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-red-50
                    text-red-500
                  "
                >
                  <FileText size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-slate-700">
                    {media.brochure.name}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {formatFileSize(
                      media.brochure.size
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeBrochure}
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    transition
                    hover:bg-red-50
                    hover:text-red-500
                  "
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() =>
                  brochureInputRef.current?.click()
                }
                className="
                  flex
                  min-h-[120px]
                  w-full
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border-2
                  border-dashed
                  border-slate-200
                  bg-slate-50
                  transition
                  hover:border-[#d6a84f]
                  hover:bg-[#fdfaf4]
                "
              >
                <FileText
                  size={20}
                  className="text-[#b88b32]"
                />

                <span className="mt-2 text-[11px] font-bold text-slate-600">
                  Upload PDF Brochure
                </span>
              </button>
            )}
          </div>

          {/* MAP */}

          <div>
            <div className="mb-3">
              <h3 className="text-xs font-extrabold text-slate-800">
                Location / Master Plan
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Upload the location map or project master plan.
              </p>
            </div>

            <input
              ref={mapInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleMapImage}
            />

            {media.mapImage ? (
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-100
                "
              >
                <img
                  src={
                    media.mapImage.preview ||
                    media.mapImage.url
                  }
                  alt="Project map"
                  className="
                    h-[180px]
                    w-full
                    object-cover
                  "
                />

                <button
                  type="button"
                  onClick={removeMapImage}
                  className="
                    absolute
                    right-2
                    top-2
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-white
                    text-slate-700
                    shadow
                    transition
                    hover:text-red-500
                  "
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() =>
                  mapInputRef.current?.click()
                }
                className="
                  flex
                  min-h-[120px]
                  w-full
                  flex-col
                  items-center
                  justify-center
                  rounded-xl
                  border-2
                  border-dashed
                  border-slate-200
                  bg-slate-50
                  transition
                  hover:border-[#d6a84f]
                  hover:bg-[#fdfaf4]
                "
              >
                <Map
                  size={20}
                  className="text-[#b88b32]"
                />

                <span className="mt-2 text-[11px] font-bold text-slate-600">
                  Upload Location Map
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          IMAGE PREVIEW MODAL
      ====================================================== */}

      {previewImage && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/80
            p-4
          "
          onClick={() =>
            setPreviewImage(null)
          }
        >
          <button
            type="button"
            onClick={() =>
              setPreviewImage(null)
            }
            className="
              absolute
              right-5
              top-5
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white
              text-slate-800
              shadow-lg
            "
          >
            <X size={18} />
          </button>

          <img
            src={previewImage}
            alt="Preview"
            className="
              max-h-[90vh]
              max-w-full
              rounded-xl
              object-contain
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          />
        </div>
      )}
    </section>
  );
}

export default ProjectMediaUpload;
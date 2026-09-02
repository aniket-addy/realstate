function PropertyForm({
  formData,
  mainImage,
  galleryImages,
  saving,
  handleChange,
  handleCheckbox,
  handleMainImage,
  removeMainImage,
  handleGalleryImages,
  removeGalleryImage,
  resetForm,
  handleSubmit,
}) {
  const amenities = [
    "Gym",
    "Swimming Pool",
    "Club House",
    "Children Play Area",
    "24x7 Security",
    "Power Backup",
    "Lift",
    "Car Parking",
    "Intercom",
    "Garden",
    "CCTV",
    "Visitor Parking",
  ];

  const propertyTypes = ["Buy", "Rent", "Commercial"];

  const bhkTypes = [
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
    "5+ BHK",
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =====================================================
          PROPERTY DETAILS
      ===================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <h2 className="mb-1 text-2xl font-semibold text-[#08243d]">
          Property Details
        </h2>

        <p className="mb-6 text-sm text-slate-500">
          Add complete project information, images and property
          details.
        </p>

        {/* TITLE */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-[#08243d]">
            Property / Project Title{" "}
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter property title"
            className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-[15px] text-[#08243d] outline-none transition focus:border-[#0d4773] focus:ring-2 focus:ring-[#0d4773]/10"
          />
        </div>

        {/* LOCATION */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-[#08243d]">
            Location <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Golf Course Road, Gurgaon"
            className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-[15px] text-[#08243d] outline-none transition focus:border-[#0d4773] focus:ring-2 focus:ring-[#0d4773]/10"
          />
        </div>

        {/* PROPERTY TYPE */}

        <div className="mb-6">
          <label className="mb-3 block text-sm font-semibold text-[#08243d]">
            Property Type
          </label>

          <div className="flex flex-wrap gap-3">
            {propertyTypes.map((type) => {
              const checked =
                formData.propertyTypes?.includes(type);

              return (
                <label
                  key={type}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-3 text-sm transition ${
                    checked
                      ? "border-[#0d4773] bg-[#0d4773]/5 text-[#0d4773]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleCheckbox(
                        "propertyTypes",
                        type
                      )
                    }
                    className="h-4 w-4 accent-[#0d4773]"
                  />

                  {type}
                </label>
              );
            })}
          </div>
        </div>

        {/* BHK */}

        <div className="mb-6">
          <label className="mb-3 block text-sm font-semibold text-[#08243d]">
            BHK Type
          </label>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {bhkTypes.map((bhk) => {
              const checked =
                formData.bhk?.includes(bhk);

              return (
                <label
                  key={bhk}
                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-3 text-sm transition ${
                    checked
                      ? "border-[#0d4773] bg-[#0d4773]/5 text-[#0d4773]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleCheckbox(
                        "bhk",
                        bhk
                      )
                    }
                    className="h-4 w-4 accent-[#0d4773]"
                  />

                  {bhk}
                </label>
              );
            })}
          </div>
        </div>

        {/* PRICE + PRICE TYPE */}

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-[15px] outline-none focus:border-[#0d4773] focus:ring-2 focus:ring-[#0d4773]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Price Type
            </label>

            <select
              name="priceType"
              value={formData.priceType}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-[15px] outline-none focus:border-[#0d4773]"
            >
              <option value="Cr">Cr</option>
              <option value="Lakh">Lakh</option>
            </select>
          </div>
        </div>

        {/* SIZE */}

        <div className="mb-6">
          <label className="mb-2 block text-sm font-semibold text-[#08243d]">
            Super Built-up Area
          </label>

          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Enter area in sq.ft."
            min="0"
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-[15px] outline-none focus:border-[#0d4773] focus:ring-2 focus:ring-[#0d4773]/10"
          />
        </div>

        {/* =====================================================
            IMAGES
        ===================================================== */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* MAIN IMAGE */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Property Image{" "}
              <span className="text-red-500">*</span>
            </label>

            <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-[#0d4773] hover:bg-slate-50">
              {mainImage ? (
                <div className="w-full">
                  <img
                    src={mainImage.url}
                    alt="Property"
                    className="mx-auto h-36 w-full rounded-xl object-cover"
                  />

                  <p className="mt-3 truncate text-sm font-medium text-slate-700">
                    {mainImage.name}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      removeMainImage();
                    }}
                    className="mt-2 text-sm font-medium text-red-500 hover:text-red-600"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <>
                  <span className="mb-2 text-4xl text-[#0d4773]">
                    ↑
                  </span>

                  <span className="font-semibold text-[#08243d]">
                    Upload Image
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    PNG, JPG or WEBP
                  </span>

                  <span className="text-xs text-slate-500">
                    Max. 5MB
                  </span>
                </>
              )}

              {!mainImage && (
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleMainImage}
                  className="hidden"
                />
              )}
            </label>
          </div>

          {/* GALLERY */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Gallery Images
            </label>

            <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-5 text-center transition hover:border-[#0d4773]">
              <span className="mb-2 text-4xl text-[#0d4773]">
                +
              </span>

              <span className="font-semibold text-[#08243d]">
                Add Images
              </span>

              <span className="mt-1 text-xs text-slate-500">
                You can upload multiple images
              </span>

              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={handleGalleryImages}
                className="hidden"
              />
            </label>

            <p className="mt-2 text-right text-sm text-blue-600">
              {galleryImages?.length || 0} images selected
            </p>

            {galleryImages?.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {galleryImages.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <img
                      src={image.url}
                      alt={`Gallery ${index + 1}`}
                      className="h-20 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeGalleryImage(index)
                      }
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          PROPERTY INFORMATION
      ===================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <h2 className="mb-6 text-2xl font-semibold text-[#08243d]">
          Property Information
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* BATHROOMS */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Bathrooms
            </label>

            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms || ""}
              onChange={handleChange}
              min="0"
              placeholder="Number of bathrooms"
              className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-[#0d4773]"
            />
          </div>

          {/* PARKING */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Parking
            </label>

            <input
              type="number"
              name="parking"
              value={formData.parking || ""}
              onChange={handleChange}
              min="0"
              placeholder="Number of parking spaces"
              className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-[#0d4773]"
            />
          </div>

          {/* FLOOR */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Floor
            </label>

            <input
              type="text"
              name="floor"
              value={formData.floor || ""}
              onChange={handleChange}
              placeholder="e.g. 5th Floor"
              className="w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none focus:border-[#0d4773]"
            />
          </div>

          {/* FURNISHING */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Furnishing
            </label>

            <select
              name="furnishing"
              value={formData.furnishing || ""}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-[#0d4773]"
            >
              <option value="">
                Select furnishing
              </option>
              <option value="Unfurnished">
                Unfurnished
              </option>
              <option value="Semi-Furnished">
                Semi-Furnished
              </option>
              <option value="Fully Furnished">
                Fully Furnished
              </option>
            </select>
          </div>

          {/* STATUS */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#08243d]">
              Property Status
            </label>

            <select
              name="status"
              value={
                formData.status ||
                "Ready to Move"
              }
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 outline-none focus:border-[#0d4773]"
            >
              <option value="Ready to Move">
                Ready to Move
              </option>

              <option value="Under Construction">
                Under Construction
              </option>

              <option value="New Launch">
                New Launch
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* =====================================================
          AMENITIES
      ===================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <h2 className="mb-1 text-2xl font-semibold text-[#08243d]">
          Amenities
        </h2>

        <p className="mb-5 text-sm text-slate-500">
          Select all amenities available in this project.
        </p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => {
            const checked =
              formData.amenities?.includes(
                amenity
              );

            return (
              <label
                key={amenity}
                className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition ${
                  checked
                    ? "bg-[#0d4773]/5 text-[#0d4773]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    handleCheckbox(
                      "amenities",
                      amenity
                    )
                  }
                  className="h-5 w-5 rounded accent-[#0d4773]"
                />

                <span className="text-[15px]">
                  {amenity}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          FEATURED / NEW PROJECT
          THIS IS AFTER AMENITIES
      ===================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <h2 className="mb-1 text-2xl font-semibold text-[#08243d]">
          Home Page Section
        </h2>

        <p className="mb-5 text-sm text-slate-500">
          Choose where this property should appear on the
          home page.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* FEATURED */}

          <label
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition ${
              formData.category === "featured"
                ? "border-[#0d4773] bg-[#0d4773]/5"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="category"
              value="featured"
              checked={
                formData.category === "featured"
              }
              onChange={handleChange}
              className="h-5 w-5 accent-[#0d4773]"
            />

            <div>
              <p className="font-semibold text-[#08243d]">
                Featured
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Show this property in the Featured
                section.
              </p>
            </div>
          </label>

          {/* NEW PROJECT */}

          <label
            className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-5 transition ${
              formData.category === "new-project"
                ? "border-[#0d4773] bg-[#0d4773]/5"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="category"
              value="new-project"
              checked={
                formData.category ===
                "new-project"
              }
              onChange={handleChange}
              className="h-5 w-5 accent-[#0d4773]"
            />

            <div>
              <p className="font-semibold text-[#08243d]">
                New Project
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Show this property in the New
                Projects section.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* =====================================================
          ABOUT PROPERTY
      ===================================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
        <h2 className="mb-1 text-2xl font-semibold text-[#08243d]">
          About this Property
        </h2>

        <p className="mb-5 text-sm text-slate-500">
          Add project description, connectivity,
          lifestyle, amenities and other information.
        </p>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="7"
          placeholder="Describe the project, connectivity, lifestyle, amenities and other important information..."
          className="w-full resize-none rounded-2xl border border-slate-300 px-5 py-4 text-[15px] outline-none focus:border-[#0d4773] focus:ring-2 focus:ring-[#0d4773]/10"
        />
      </div>

      {/* =====================================================
          BUTTONS
      ===================================================== */}

      <div className="flex items-center justify-end gap-4 pb-8">
        <button
          type="button"
          onClick={resetForm}
          disabled={saving}
          className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#0d4773] px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-[#082f4d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : "Save Property"}
        </button>
      </div>
    </form>
  );
}

export default PropertyForm;
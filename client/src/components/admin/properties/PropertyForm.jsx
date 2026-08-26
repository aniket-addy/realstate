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
  return (
    <form
      className="property-form-card"
      onSubmit={handleSubmit}
    >
      <div className="section-heading">
        <h2>Property Details</h2>
      </div>

      {/* TITLE */}

      <div className="form-group full-width">
        <label>
          Property Title <span>*</span>
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter property title"
        />
      </div>

      {/* IMAGE */}

      <div className="image-upload-grid">
        <div className="form-group">
          <label>
            Property Image <span>*</span>
          </label>

          {!mainImage ? (
            <label className="upload-box">
              <div className="upload-icon">
                ↑
              </div>

              <strong>
                Upload Image
              </strong>

              <small>
                PNG, JPG or WEBP
                (Max. 5MB)
              </small>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleMainImage}
              />
            </label>
          ) : (
            <div className="uploaded-image-box">
              <img
                src={mainImage.url}
                alt="Property"
              />

              <div className="uploaded-image-actions">
                <span>
                  {mainImage.name}
                </span>

                <button
                  type="button"
                  onClick={removeMainImage}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        {/* GALLERY */}

        <div className="form-group">
          <label>Gallery Images</label>

          <label className="gallery-upload-box">
            <div className="gallery-add-icon">
              +
            </div>

            <strong>
              Add Images
            </strong>

            <small>
              You can upload multiple
              images
            </small>

            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={handleGalleryImages}
            />
          </label>

          <div className="gallery-count">
            {galleryImages.length} image
            {galleryImages.length !== 1
              ? "s"
              : ""}{" "}
            selected
          </div>
        </div>
      </div>

      {/* GALLERY PREVIEW */}

      {galleryImages.length > 0 && (
        <div className="gallery-preview">
          {galleryImages.map(
            (image, index) => (
              <div
                className="gallery-thumb"
                key={index}
              >
                <img
                  src={image.url}
                  alt={`Gallery ${
                    index + 1
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    removeGalleryImage(
                      index
                    )
                  }
                  className="remove-gallery"
                >
                  ×
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* FORM GRID */}

      <div className="form-grid">
        {/* PROPERTY TYPE */}

        <div className="form-group">
          <label>Property Type</label>

          <div className="checkbox-grid three">
            {[
              "Buy",
              "Rent",
              "Commercial",
            ].map((type) => (
              <label
                className="check-option"
                key={type}
              >
                <input
                  type="checkbox"
                  checked={formData.propertyTypes.includes(
                    type
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "propertyTypes",
                      type
                    )
                  }
                />

                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* BHK */}

        <div className="form-group">
          <label>BHK Type</label>

          <div className="checkbox-grid three">
            {[
              "1 BHK",
              "2 BHK",
              "3 BHK",
              "4 BHK",
              "5 BHK",
              "5+ BHK",
            ].map((type) => (
              <label
                className="check-option"
                key={type}
              >
                <input
                  type="checkbox"
                  checked={formData.bhk.includes(
                    type
                  )}
                  onChange={() =>
                    handleCheckbox(
                      "bhk",
                      type
                    )
                  }
                />

                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* CATEGORY */}

        <div className="form-group">
          <label>Category</label>

          <div className="radio-options">
            <label className="radio-option">
              <input
                type="radio"
                name="category"
                value="featured"
                checked={
                  formData.category ===
                  "featured"
                }
                onChange={handleChange}
              />

              <span>
                Featured Property
              </span>
            </label>

            <label className="radio-option">
              <input
                type="radio"
                name="category"
                value="new"
                checked={
                  formData.category === "new"
                }
                onChange={handleChange}
              />

              <span>New Project</span>
            </label>
          </div>
        </div>

        {/* LOCATION */}

        <div className="form-group">
          <label>
            Location <span>*</span>
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location or area"
          />

          <small className="field-help">
            Example: Golf Course Road,
            Gurgaon
          </small>
        </div>

        {/* PRICE */}

        <div className="form-group">
          <label>
            Price <span>*</span>
          </label>

          <div className="input-with-select">
            <span>₹</span>

            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />

            <select
              name="priceType"
              value={formData.priceType}
              onChange={handleChange}
            >
              <option value="Lakh">
                Lakh
              </option>

              <option value="Cr">
                Cr
              </option>
            </select>
          </div>
        </div>

        {/* SIZE */}

        <div className="form-group">
          <label>Size (sq.ft.)</label>

          <div className="input-with-unit">
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Enter size in sq.ft."
            />

            <span>sq.ft.</span>
          </div>
        </div>

        {/* DESCRIPTION */}

        <div className="form-group full-width">
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter property description..."
            rows="5"
          />
        </div>
      </div>

      {/* ACTIONS */}

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={resetForm}
          disabled={saving}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="save-button"
          disabled={saving}
        >
          <span>
            {saving ? "..." : "▣"}
          </span>

          {saving
            ? "Saving..."
            : "Save Property"}
        </button>
      </div>
    </form>
  );
}

export default PropertyForm;
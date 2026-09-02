function PropertyPreview({
  formData,
  previewImage,
}) {
  return (
    <div className="preview-card">
      <h2 className="preview-heading">
        Preview
      </h2>

      <div className="property-preview">
        <div className="preview-image">
          <img
            src={previewImage}
            alt="Property Preview"
          />

          <div className="featured-badge">
            {formData.category === "new"
              ? "New Project"
              : "Featured"}
          </div>

          <button
            type="button"
            className="heart-button"
          >
            ♡
          </button>
        </div>

        <div className="preview-content">
          <h2>
            {formData.title ||
              "Skyline Residences"}
          </h2>

          <p className="preview-location">
            {formData.location ||
              "Golf Course Road, Gurgaon"}
          </p>

          <div className="preview-meta">
            <span>
              {formData.bhk.length > 0
                ? formData.bhk.join(", ")
                : "3 BHK"}
            </span>

            <i>•</i>

            <span>
              {formData.size
                ? `${formData.size} sq.ft`
                : "1,650 sq.ft"}
            </span>
          </div>

          <div className="preview-bottom">
            <strong className="preview-price">
              ₹
              {formData.price
                ? `${formData.price} ${formData.priceType}`
                : "1.85 Cr"}
            </strong>

            <button
              type="button"
              className="view-button"
            >
              View Details
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyPreview;
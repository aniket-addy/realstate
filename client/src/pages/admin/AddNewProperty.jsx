import { useState } from "react";

import Sidebar from "../../components/admin/sidebar/Sidebar";
import Header from "../../components/admin/header/Header";
import PropertyForm from "../../components/admin/properties/PropertyForm";
import PropertyPreview from "../../components/admin/properties/PropertyPreview";
import Tips from "../../components/admin/Tips";

import "./AddNewProperty.css";

const API_URL =
  "http://localhost:5000/api/properties";

function AddNewProperty() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    propertyTypes: [],
    bhk: [],
    category: "featured",
    price: "",
    priceType: "Cr",
    size: "",
    description: "",
  });

  const [mainImage, setMainImage] =
    useState(null);

  const [galleryImages, setGalleryImages] =
    useState([]);

  const [saving, setSaving] =
    useState(false);

  /* =================================
     INPUT CHANGE
  ================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =================================
     CHECKBOX
  ================================= */

  const handleCheckbox = (
    name,
    value
  ) => {
    setFormData((prev) => {
      const current = prev[name];

      if (current.includes(value)) {
        return {
          ...prev,
          [name]: current.filter(
            (item) => item !== value
          ),
        };
      }

      return {
        ...prev,
        [name]: [
          ...current,
          value,
        ],
      };
    });
  };

  /* =================================
     BASE64
  ================================= */

  const fileToBase64 = (file) => {
    return new Promise(
      (resolve, reject) => {
        const reader =
          new FileReader();

        reader.onload = () =>
          resolve(reader.result);

        reader.onerror = () =>
          reject(
            new Error(
              "Image conversion failed"
            )
          );

        reader.readAsDataURL(file);
      }
    );
  };

  /* =================================
     MAIN IMAGE
  ================================= */

  const handleMainImage = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      alert(
        "Main image must be less than 5MB."
      );

      e.target.value = "";

      return;
    }

    const imageUrl =
      URL.createObjectURL(file);

    setMainImage({
      file,
      url: imageUrl,
      name: file.name,
    });

    e.target.value = "";
  };

  /* =================================
     REMOVE MAIN IMAGE
  ================================= */

  const removeMainImage = () => {
    if (mainImage?.url) {
      URL.revokeObjectURL(
        mainImage.url
      );
    }

    setMainImage(null);
  };

  /* =================================
     GALLERY
  ================================= */

  const handleGalleryImages = (
    e
  ) => {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    const validFiles =
      files.filter((file) => {
        if (
          file.size >
          5 * 1024 * 1024
        ) {
          alert(
            `${file.name} is larger than 5MB and was skipped.`
          );

          return false;
        }

        return true;
      });

    const newImages =
      validFiles.map((file) => ({
        file,
        url: URL.createObjectURL(
          file
        ),
        name: file.name,
      }));

    setGalleryImages((prev) => [
      ...prev,
      ...newImages,
    ]);

    e.target.value = "";
  };

  /* =================================
     REMOVE GALLERY
  ================================= */

  const removeGalleryImage = (
    index
  ) => {
    const image =
      galleryImages[index];

    if (image?.url) {
      URL.revokeObjectURL(
        image.url
      );
    }

    setGalleryImages((prev) =>
      prev.filter(
        (_, imageIndex) =>
          imageIndex !== index
      )
    );
  };

  /* =================================
     RESET
  ================================= */

  const resetForm = () => {
    if (mainImage?.url) {
      URL.revokeObjectURL(
        mainImage.url
      );
    }

    galleryImages.forEach(
      (image) => {
        if (image?.url) {
          URL.revokeObjectURL(
            image.url
          );
        }
      }
    );

    setFormData({
      title: "",
      location: "",
      propertyTypes: [],
      bhk: [],
      category: "featured",
      price: "",
      priceType: "Cr",
      size: "",
      description: "",
    });

    setMainImage(null);
    setGalleryImages([]);
  };

  /* =================================
     SAVE
  ================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert(
        "Please enter property title."
      );
      return;
    }

    if (!mainImage) {
      alert(
        "Please upload property image."
      );
      return;
    }

    if (!formData.location.trim()) {
      alert(
        "Please enter property location."
      );
      return;
    }

    if (!formData.price) {
      alert(
        "Please enter property price."
      );
      return;
    }

    try {
      setSaving(true);

      const mainImageBase64 =
        await fileToBase64(
          mainImage.file
        );

      const galleryBase64 =
        await Promise.all(
          galleryImages.map(
            (image) =>
              fileToBase64(
                image.file
              )
          )
        );

      const propertyData = {
        title:
          formData.title.trim(),

        propertyImage:
          mainImageBase64,

        galleryImages:
          galleryBase64,

        propertyType:
          formData.propertyTypes,

        bhkType:
          formData.bhk,

        category:
          formData.category ===
          "new"
            ? "new-project"
            : "featured",

        location:
          formData.location.trim(),

        price:
          Number(formData.price),

        priceType:
          formData.priceType,

        size:
          formData.size
            ? Number(
                formData.size
              )
            : 0,

        description:
          formData.description.trim(),
      };

      console.log(
        "Sending property:",
        propertyData
      );

      const response =
        await fetch(API_URL, {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            propertyData
          ),
        });

      const result =
        await response.json();

      console.log(
        "Server response:",
        result
      );

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Failed to save property"
        );
      }

      alert(
        "Property saved successfully!"
      );

      resetForm();
    } catch (error) {
      console.error(
        "Save property error:",
        error
      );

      alert(
        error.message ||
          "Unable to connect to server."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =================================
     PREVIEW
  ================================= */

  const previewImage =
    mainImage?.url ||
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85";

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-area">
        <Header />

        <section className="page-content">
          <div className="property-layout">
            <PropertyForm
              formData={formData}
              mainImage={mainImage}
              galleryImages={
                galleryImages
              }
              saving={saving}
              handleChange={
                handleChange
              }
              handleCheckbox={
                handleCheckbox
              }
              handleMainImage={
                handleMainImage
              }
              removeMainImage={
                removeMainImage
              }
              handleGalleryImages={
                handleGalleryImages
              }
              removeGalleryImage={
                removeGalleryImage
              }
              resetForm={
                resetForm
              }
              handleSubmit={
                handleSubmit
              }
            />

            <aside className="preview-column">
              <PropertyPreview
                formData={formData}
                previewImage={
                  previewImage
                }
              />

              <Tips />
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AddNewProperty;
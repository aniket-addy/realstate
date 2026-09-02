import {
  FileText,
  Plus,
  Trash2,
  Upload,
  ExternalLink,
} from "lucide-react";

function ProjectDocumentation({
  value = [],
  onChange,
}) {
  const documents = Array.isArray(value)
    ? value
    : [];

  // =========================================================
  // ADD DOCUMENT
  // =========================================================

  const addDocument = () => {
    const newDocument = {
      id: Date.now(),
      title: "",
      type: "",
      description: "",
      url: "",
      file: null,
    };

    if (onChange) {
      onChange([
        ...documents,
        newDocument,
      ]);
    }
  };

  // =========================================================
  // UPDATE DOCUMENT
  // =========================================================

  const updateDocument = (
    index,
    field,
    fieldValue
  ) => {
    const updatedDocuments =
      documents.map(
        (document, documentIndex) =>
          documentIndex === index
            ? {
                ...document,
                [field]: fieldValue,
              }
            : document
      );

    if (onChange) {
      onChange(updatedDocuments);
    }
  };

  // =========================================================
  // DELETE DOCUMENT
  // =========================================================

  const deleteDocument = (index) => {
    const updatedDocuments =
      documents.filter(
        (_, documentIndex) =>
          documentIndex !== index
      );

    if (onChange) {
      onChange(updatedDocuments);
    }
  };

  // =========================================================
  // FILE UPLOAD
  // =========================================================

  const handleFileChange = (
    index,
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    updateDocument(
      index,
      "file",
      file
    );
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
          flex-col
          gap-3
          border-b
          border-slate-200
          px-5
          py-4
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
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
            <FileText size={17} />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-950">
              Project Documentation
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Add brochures, approvals and project documents
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addDocument}
          className="
            inline-flex
            h-9
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-slate-950
            px-4
            text-[11px]
            font-bold
            text-white
            transition
            hover:bg-slate-800
          "
        >
          <Plus size={14} />

          Add Document
        </button>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="p-5">
        {/* EMPTY STATE */}

        {documents.length === 0 && (
          <div
            className="
              rounded-xl
              border-2
              border-dashed
              border-slate-200
              bg-slate-50
              px-5
              py-10
              text-center
            "
          >
            <FileText
              size={26}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-xs font-bold text-slate-600">
              No documents added
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Add project documents, approvals or brochures.
            </p>

            <button
              type="button"
              onClick={addDocument}
              className="
                mt-4
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-[#d6a84f]
                px-4
                py-2.5
                text-[11px]
                font-bold
                text-white
                transition
                hover:bg-[#c39840]
              "
            >
              <Plus size={13} />

              Add First Document
            </button>
          </div>
        )}

        {/* ===================================================
            DOCUMENT LIST
        ==================================================== */}

        {documents.length > 0 && (
          <div className="space-y-4">
            {documents.map(
              (document, index) => (
                <div
                  key={
                    document.id ||
                    index
                  }
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50/60
                    p-4
                  "
                >
                  {/* DOCUMENT HEADER */}

                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-lg
                          bg-[#f7f0e2]
                          text-[10px]
                          font-extrabold
                          text-[#a47b2d]
                        "
                      >
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </span>

                      <span className="text-xs font-extrabold text-slate-700">
                        Document {index + 1}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        deleteDocument(
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
                        text-slate-400
                        transition
                        hover:bg-red-50
                        hover:text-red-500
                      "
                      title="Delete document"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* =================================================
                      BASIC DETAILS
                  ================================================== */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-2
                    "
                  >
                    {/* TITLE */}

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Document Title
                      </label>

                      <input
                        type="text"
                        value={
                          document.title ||
                          ""
                        }
                        onChange={(event) =>
                          updateDocument(
                            index,
                            "title",
                            event.target
                              .value
                          )
                        }
                        placeholder="e.g. Project Brochure"
                        className="
                          mt-1.5
                          h-10
                          w-full
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          px-3
                          text-xs
                          font-semibold
                          text-slate-800
                          outline-none
                          transition
                          placeholder:text-slate-300
                          focus:border-[#d6a84f]
                        "
                      />
                    </div>

                    {/* TYPE */}

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Document Type
                      </label>

                      <select
                        value={
                          document.type ||
                          ""
                        }
                        onChange={(event) =>
                          updateDocument(
                            index,
                            "type",
                            event.target
                              .value
                          )
                        }
                        className="
                          mt-1.5
                          h-10
                          w-full
                          cursor-pointer
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          px-3
                          text-xs
                          font-semibold
                          text-slate-700
                          outline-none
                          focus:border-[#d6a84f]
                        "
                      >
                        <option value="">
                          Select type
                        </option>

                        <option value="brochure">
                          Brochure
                        </option>

                        <option value="approval">
                          Approval
                        </option>

                        <option value="rera">
                          RERA Document
                        </option>

                        <option value="layout">
                          Layout Plan
                        </option>

                        <option value="floor-plan">
                          Floor Plan
                        </option>

                        <option value="price-list">
                          Price List
                        </option>

                        <option value="payment-plan">
                          Payment Plan
                        </option>

                        <option value="legal">
                          Legal Document
                        </option>

                        <option value="other">
                          Other
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* =================================================
                      DESCRIPTION
                  ================================================== */}

                  <div className="mt-4">
                    <label className="text-[10px] font-bold text-slate-600">
                      Description
                    </label>

                    <textarea
                      rows={3}
                      value={
                        document.description ||
                        ""
                      }
                      onChange={(event) =>
                        updateDocument(
                          index,
                          "description",
                          event.target
                            .value
                        )
                      }
                      placeholder="Short description about this document"
                      className="
                        mt-1.5
                        w-full
                        resize-none
                        rounded-lg
                        border
                        border-slate-200
                        bg-white
                        px-3
                        py-2.5
                        text-xs
                        font-medium
                        text-slate-700
                        outline-none
                        placeholder:text-slate-300
                        focus:border-[#d6a84f]
                      "
                    />
                  </div>

                  {/* =================================================
                      DOCUMENT URL
                  ================================================== */}

                  <div className="mt-4">
                    <label className="text-[10px] font-bold text-slate-600">
                      Document URL
                    </label>

                    <div className="relative">
                      <ExternalLink
                        size={13}
                        className="
                          absolute
                          left-3
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        type="url"
                        value={
                          document.url ||
                          ""
                        }
                        onChange={(event) =>
                          updateDocument(
                            index,
                            "url",
                            event.target
                              .value
                          )
                        }
                        placeholder="https://example.com/document.pdf"
                        className="
                          mt-1.5
                          h-10
                          w-full
                          rounded-lg
                          border
                          border-slate-200
                          bg-white
                          pl-9
                          pr-3
                          text-xs
                          font-medium
                          text-slate-700
                          outline-none
                          placeholder:text-slate-300
                          focus:border-[#d6a84f]
                        "
                      />
                    </div>
                  </div>

                  {/* =================================================
                      FILE UPLOAD
                  ================================================== */}

                  <div className="mt-4">
                    <label className="text-[10px] font-bold text-slate-600">
                      Upload Document
                    </label>

                    <label
                      className="
                        mt-1.5
                        flex
                        min-h-[72px]
                        cursor-pointer
                        items-center
                        gap-3
                        rounded-lg
                        border
                        border-dashed
                        border-slate-300
                        bg-white
                        px-4
                        transition
                        hover:border-[#d6a84f]
                        hover:bg-[#fdfaf4]
                      "
                    >
                      <div
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-slate-100
                          text-slate-500
                        "
                      >
                        <Upload size={16} />
                      </div>

                      <div className="min-w-0">
                        {document.file ? (
                          <>
                            <p className="truncate text-[11px] font-bold text-slate-700">
                              {document.file.name}
                            </p>

                            <p className="mt-0.5 text-[9px] text-slate-400">
                              File selected
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-[11px] font-bold text-slate-600">
                              Choose a document
                            </p>

                            <p className="mt-0.5 text-[9px] text-slate-400">
                              PDF, DOC, DOCX or other supported files
                            </p>
                          </>
                        )}
                      </div>

                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                        onChange={(event) =>
                          handleFileChange(
                            index,
                            event
                          )
                        }
                      />
                    </label>
                  </div>
                </div>
              )
            )}

            {/* =================================================
                ADD ANOTHER DOCUMENT
            ================================================== */}

            <button
              type="button"
              onClick={addDocument}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-dashed
                border-slate-300
                py-3
                text-[11px]
                font-bold
                text-slate-500
                transition
                hover:border-[#d6a84f]
                hover:bg-[#fdfaf4]
                hover:text-[#a47b2d]
              "
            >
              <Plus size={14} />

              Add Another Document
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectDocumentation;
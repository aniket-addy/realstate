import {
  Plus,
  Trash2,
  TableProperties,
} from "lucide-react";

function ProjectTable({
  value = [],
  onChange,
}) {
  const rows = Array.isArray(value)
    ? value
    : [];

  // =========================================================
  // ADD ROW
  // =========================================================

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      unitType: "",
      size: "",
      price: "",
      availability: "",
      description: "",
    };

    if (onChange) {
      onChange([
        ...rows,
        newRow,
      ]);
    }
  };

  // =========================================================
  // UPDATE ROW
  // =========================================================

  const updateRow = (
    index,
    field,
    fieldValue
  ) => {
    const updatedRows = rows.map(
      (row, rowIndex) =>
        rowIndex === index
          ? {
              ...row,
              [field]: fieldValue,
            }
          : row
    );

    if (onChange) {
      onChange(updatedRows);
    }
  };

  // =========================================================
  // DELETE ROW
  // =========================================================

  const deleteRow = (index) => {
    const updatedRows = rows.filter(
      (_, rowIndex) =>
        rowIndex !== index
    );

    if (onChange) {
      onChange(updatedRows);
    }
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
            <TableProperties size={17} />
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-slate-950">
              Project Inventory
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-500">
              Add unit, size, price and availability details
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addRow}
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

          Add Row
        </button>
      </div>

      {/* =====================================================
          TABLE
      ====================================================== */}

      <div className="p-5">
        {rows.length === 0 ? (
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
            <TableProperties
              size={25}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-xs font-bold text-slate-600">
              No inventory details added
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
              Add rows to display project inventory.
            </p>

            <button
              type="button"
              onClick={addRow}
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

              Add First Row
            </button>
          </div>
        ) : (
          <>
            {/* =================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-x-auto rounded-xl border border-slate-200 md:block">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="w-[70px] border-b border-slate-200 px-3 py-3 text-center text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      #
                    </th>

                    <th className="border-b border-slate-200 px-3 py-3 text-left text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Unit Type
                    </th>

                    <th className="border-b border-slate-200 px-3 py-3 text-left text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Size
                    </th>

                    <th className="border-b border-slate-200 px-3 py-3 text-left text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Price
                    </th>

                    <th className="border-b border-slate-200 px-3 py-3 text-left text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Availability
                    </th>

                    <th className="border-b border-slate-200 px-3 py-3 text-left text-[10px] font-extrabold uppercase tracking-wide text-slate-400">
                      Description
                    </th>

                    <th className="w-[60px] border-b border-slate-200 px-3 py-3" />
                  </tr>
                </thead>

                <tbody>
                  {rows.map(
                    (row, index) => (
                      <tr
                        key={
                          row.id ||
                          index
                        }
                        className="group transition hover:bg-slate-50/70"
                      >
                        {/* NUMBER */}

                        <td className="border-b border-slate-100 px-3 py-3 text-center">
                          <span
                            className="
                              inline-flex
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
                            {index + 1}
                          </span>
                        </td>

                        {/* UNIT TYPE */}

                        <td className="border-b border-slate-100 px-3 py-3">
                          <input
                            type="text"
                            value={
                              row.unitType ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updateRow(
                                index,
                                "unitType",
                                event.target
                                  .value
                              )
                            }
                            placeholder="2 BHK"
                            className="
                              h-9
                              w-full
                              min-w-[130px]
                              rounded-lg
                              border
                              border-slate-200
                              bg-white
                              px-2.5
                              text-xs
                              font-semibold
                              text-slate-800
                              outline-none
                              transition
                              placeholder:text-slate-300
                              focus:border-[#d6a84f]
                            "
                          />
                        </td>

                        {/* SIZE */}

                        <td className="border-b border-slate-100 px-3 py-3">
                          <input
                            type="text"
                            value={
                              row.size ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updateRow(
                                index,
                                "size",
                                event.target
                                  .value
                              )
                            }
                            placeholder="1200 Sq.Ft."
                            className="
                              h-9
                              w-full
                              min-w-[130px]
                              rounded-lg
                              border
                              border-slate-200
                              bg-white
                              px-2.5
                              text-xs
                              font-semibold
                              text-slate-800
                              outline-none
                              transition
                              placeholder:text-slate-300
                              focus:border-[#d6a84f]
                            "
                          />
                        </td>

                        {/* PRICE */}

                        <td className="border-b border-slate-100 px-3 py-3">
                          <input
                            type="text"
                            value={
                              row.price ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updateRow(
                                index,
                                "price",
                                event.target
                                  .value
                              )
                            }
                            placeholder="₹85 Lakh"
                            className="
                              h-9
                              w-full
                              min-w-[120px]
                              rounded-lg
                              border
                              border-slate-200
                              bg-white
                              px-2.5
                              text-xs
                              font-semibold
                              text-slate-800
                              outline-none
                              transition
                              placeholder:text-slate-300
                              focus:border-[#d6a84f]
                            "
                          />
                        </td>

                        {/* AVAILABILITY */}

                        <td className="border-b border-slate-100 px-3 py-3">
                          <select
                            value={
                              row.availability ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updateRow(
                                index,
                                "availability",
                                event.target
                                  .value
                              )
                            }
                            className="
                              h-9
                              w-full
                              min-w-[120px]
                              cursor-pointer
                              rounded-lg
                              border
                              border-slate-200
                              bg-white
                              px-2.5
                              text-xs
                              font-semibold
                              text-slate-700
                              outline-none
                              focus:border-[#d6a84f]
                            "
                          >
                            <option value="">
                              Select
                            </option>

                            <option value="available">
                              Available
                            </option>

                            <option value="limited">
                              Limited
                            </option>

                            <option value="sold-out">
                              Sold Out
                            </option>

                            <option value="on-request">
                              On Request
                            </option>
                          </select>
                        </td>

                        {/* DESCRIPTION */}

                        <td className="border-b border-slate-100 px-3 py-3">
                          <input
                            type="text"
                            value={
                              row.description ||
                              ""
                            }
                            onChange={(
                              event
                            ) =>
                              updateRow(
                                index,
                                "description",
                                event.target
                                  .value
                              )
                            }
                            placeholder="Additional details"
                            className="
                              h-9
                              w-full
                              min-w-[160px]
                              rounded-lg
                              border
                              border-slate-200
                              bg-white
                              px-2.5
                              text-xs
                              font-medium
                              text-slate-700
                              outline-none
                              transition
                              placeholder:text-slate-300
                              focus:border-[#d6a84f]
                            "
                          />
                        </td>

                        {/* DELETE */}

                        <td className="border-b border-slate-100 px-3 py-3 text-center">
                          <button
                            type="button"
                            onClick={() =>
                              deleteRow(
                                index
                              )
                            }
                            className="
                              inline-flex
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
                            title="Delete row"
                          >
                            <Trash2
                              size={14}
                            />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* =================================================
                MOBILE CARDS
            ================================================== */}

            <div className="space-y-4 md:hidden">
              {rows.map(
                (row, index) => (
                  <div
                    key={
                      row.id ||
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
                    {/* CARD HEADER */}

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
                          {index + 1}
                        </span>

                        <span className="text-xs font-extrabold text-slate-700">
                          Inventory Row
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          deleteRow(
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
                          hover:bg-red-50
                          hover:text-red-500
                        "
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* UNIT TYPE */}

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Unit Type
                      </label>

                      <input
                        type="text"
                        value={
                          row.unitType ||
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          updateRow(
                            index,
                            "unitType",
                            event.target
                              .value
                          )
                        }
                        placeholder="2 BHK"
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
                          outline-none
                          focus:border-[#d6a84f]
                        "
                      />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {/* SIZE */}

                      <div>
                        <label className="text-[10px] font-bold text-slate-600">
                          Size
                        </label>

                        <input
                          type="text"
                          value={
                            row.size ||
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateRow(
                              index,
                              "size",
                              event.target
                                .value
                            )
                          }
                          placeholder="1200 Sq.Ft."
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
                            outline-none
                            focus:border-[#d6a84f]
                          "
                        />
                      </div>

                      {/* PRICE */}

                      <div>
                        <label className="text-[10px] font-bold text-slate-600">
                          Price
                        </label>

                        <input
                          type="text"
                          value={
                            row.price ||
                            ""
                          }
                          onChange={(
                            event
                          ) =>
                            updateRow(
                              index,
                              "price",
                              event.target
                                .value
                            )
                          }
                          placeholder="₹85 Lakh"
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
                            outline-none
                            focus:border-[#d6a84f]
                          "
                        />
                      </div>
                    </div>

                    {/* AVAILABILITY */}

                    <div className="mt-4">
                      <label className="text-[10px] font-bold text-slate-600">
                        Availability
                      </label>

                      <select
                        value={
                          row.availability ||
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          updateRow(
                            index,
                            "availability",
                            event.target
                              .value
                          )
                        }
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
                          outline-none
                          focus:border-[#d6a84f]
                        "
                      >
                        <option value="">
                          Select availability
                        </option>

                        <option value="available">
                          Available
                        </option>

                        <option value="limited">
                          Limited
                        </option>

                        <option value="sold-out">
                          Sold Out
                        </option>

                        <option value="on-request">
                          On Request
                        </option>
                      </select>
                    </div>

                    {/* DESCRIPTION */}

                    <div className="mt-4">
                      <label className="text-[10px] font-bold text-slate-600">
                        Description
                      </label>

                      <textarea
                        rows={3}
                        value={
                          row.description ||
                          ""
                        }
                        onChange={(
                          event
                        ) =>
                          updateRow(
                            index,
                            "description",
                            event.target
                              .value
                          )
                        }
                        placeholder="Additional details"
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
                          outline-none
                          focus:border-[#d6a84f]
                        "
                      />
                    </div>
                  </div>
                )
              )}
            </div>

            {/* =================================================
                ADD ANOTHER ROW
            ================================================== */}

            <button
              type="button"
              onClick={addRow}
              className="
                mt-4
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

              Add Another Row
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export default ProjectTable;
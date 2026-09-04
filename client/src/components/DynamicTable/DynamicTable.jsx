import React from "react";
import { Plus, Trash2, Table2 } from "lucide-react";

// ============================================================
// CREATE UNIQUE ID
// ============================================================

const createId = (prefix) => {
  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
};

// ============================================================
// DEFAULT TABLE
// ============================================================

export const createEmptyProjectTable = () => {
  const column1 = createId("column");
  const column2 = createId("column");
  const column3 = createId("column");

  return {
    columns: [
      {
        id: column1,
        label: "Column 1",
      },
      {
        id: column2,
        label: "Column 2",
      },
      {
        id: column3,
        label: "Column 3",
      },
    ],

    rows: [
      {
        id: createId("row"),
        cells: {
          [column1]: "",
          [column2]: "",
          [column3]: "",
        },
      },
      {
        id: createId("row"),
        cells: {
          [column1]: "",
          [column2]: "",
          [column3]: "",
        },
      },
      {
        id: createId("row"),
        cells: {
          [column1]: "",
          [column2]: "",
          [column3]: "",
        },
      },
    ],
  };
};

// ============================================================
// NORMALIZE TABLE
// ============================================================

const normalizeTable = (value) => {
  if (
    !value ||
    !Array.isArray(value.columns) ||
    !Array.isArray(value.rows)
  ) {
    return createEmptyProjectTable();
  }

  return {
    columns: value.columns.map(
      (column, index) => ({
        id:
          column.id ||
          createId("column"),

        label:
          column.label ??
          `Column ${index + 1}`,
      })
    ),

    rows: value.rows.map(
      (row) => ({
        id:
          row.id ||
          createId("row"),

        cells:
          row.cells || {},
      })
    ),
  };
};

// ============================================================
// DYNAMIC TABLE
// ============================================================

function DynamicTable({
  value,
  onChange,

  title = "Project Information Table",

  description =
    "Add custom project details using rows and columns.",
}) {
  const table = normalizeTable(value);

  // ==========================================================
  // UPDATE TABLE
  // ==========================================================

  const updateTable = (newTable) => {
    if (typeof onChange === "function") {
      onChange(newTable);
    }
  };

  // ==========================================================
  // ADD COLUMN
  // ==========================================================

  const handleAddColumn = () => {
    const columnId = createId("column");

    const newColumn = {
      id: columnId,
      label: `Column ${table.columns.length + 1}`,
    };

    const newRows = table.rows.map(
      (row) => ({
        ...row,

        cells: {
          ...row.cells,
          [columnId]: "",
        },
      })
    );

    updateTable({
      ...table,

      columns: [
        ...table.columns,
        newColumn,
      ],

      rows: newRows,
    });
  };

  // ==========================================================
  // ADD ROW
  // ==========================================================

  const handleAddRow = () => {
    const cells = {};

    table.columns.forEach(
      (column) => {
        cells[column.id] = "";
      }
    );

    updateTable({
      ...table,

      rows: [
        ...table.rows,

        {
          id: createId("row"),
          cells,
        },
      ],
    });
  };

  // ==========================================================
  // DELETE COLUMN
  // ==========================================================

  const handleDeleteColumn = (
    columnId
  ) => {
    if (table.columns.length <= 1) {
      return;
    }

    const columns =
      table.columns.filter(
        (column) =>
          column.id !== columnId
      );

    const rows = table.rows.map(
      (row) => {
        const cells = {
          ...row.cells,
        };

        delete cells[columnId];

        return {
          ...row,
          cells,
        };
      }
    );

    updateTable({
      ...table,
      columns,
      rows,
    });
  };

  // ==========================================================
  // DELETE ROW
  // ==========================================================

  const handleDeleteRow = (
    rowId
  ) => {
    if (table.rows.length <= 1) {
      return;
    }

    updateTable({
      ...table,

      rows: table.rows.filter(
        (row) =>
          row.id !== rowId
      ),
    });
  };

  // ==========================================================
  // CHANGE COLUMN NAME
  // ==========================================================

  const handleColumnChange = (
    columnId,
    newValue
  ) => {
    updateTable({
      ...table,

      columns:
        table.columns.map(
          (column) =>
            column.id === columnId
              ? {
                  ...column,
                  label: newValue,
                }
              : column
        ),
    });
  };

  // ==========================================================
  // CHANGE CELL
  // ==========================================================

  const handleCellChange = (
    rowId,
    columnId,
    newValue
  ) => {
    updateTable({
      ...table,

      rows: table.rows.map(
        (row) => {
          if (row.id !== rowId) {
            return row;
          }

          return {
            ...row,

            cells: {
              ...row.cells,

              [columnId]:
                newValue,
            },
          };
        }
      ),
    });
  };

  // ==========================================================
  // BUTTON STYLES
  // ==========================================================

  const addColumnButton = `
    inline-flex
    h-10
    items-center
    justify-center
    gap-2
    rounded-xl
    border
    border-slate-200
    bg-white
    px-4
    text-sm
    font-medium
    text-slate-700
    transition
    hover:border-[#d6a84f]
    hover:bg-[#fffaf0]
  `;

  const addRowButton = `
    inline-flex
    h-10
    items-center
    justify-center
    gap-2
    rounded-xl
    bg-slate-950
    px-4
    text-sm
    font-medium
    text-white
    transition
    hover:bg-slate-800
  `;

  // ==========================================================
  // RETURN
  // ==========================================================

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

        {/* TITLE */}

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
            <Table2 size={20} />
          </div>

          <div>
            <h2 className="text-base font-extrabold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              {description}
            </p>
          </div>

        </div>

        {/* TOP BUTTONS */}

        <div className="flex flex-wrap items-center gap-2">

          <button
            type="button"
            onClick={handleAddColumn}
            className={addColumnButton}
          >
            <Plus size={16} />
            Add Column
          </button>

          <button
            type="button"
            onClick={handleAddRow}
            className={addRowButton}
          >
            <Plus size={16} />
            Add Row
          </button>

        </div>
      </div>

      {/* =====================================================
          TABLE
      ====================================================== */}

      <div className="w-full p-4">

        <div
          className="
            w-full
            max-w-full
            overflow-x-auto
            overflow-y-auto
            rounded-xl
            border
            border-slate-200
          "
          style={{
            maxHeight: "520px",
          }}
        >

          <table
            className="
              w-max
              min-w-full
              border-collapse
            "
          >

            {/* =================================================
                TABLE HEADER
            ================================================== */}

            <thead>

              <tr>

                {table.columns.map(
                  (column) => (
                    <th
                      key={column.id}
                      className="
                        sticky
                        top-0
                        z-20
                        min-w-[320px]
                        border-b
                        border-r
                        border-slate-200
                        bg-slate-50
                        p-3
                        text-left
                      "
                    >

                      <div className="flex items-center gap-2">

                        {/* COLUMN NAME */}

                        <input
                          type="text"
                          value={
                            column.label
                          }
                          onChange={(e) =>
                            handleColumnChange(
                              column.id,
                              e.target.value
                            )
                          }
                          placeholder="Column name"
                          className="
                            h-12
                            min-w-0
                            flex-1
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            text-sm
                            font-semibold
                            text-slate-800
                            outline-none
                            placeholder:text-slate-400
                            focus:border-[#d6a84f]
                            focus:ring-2
                            focus:ring-[#d6a84f]/10
                          "
                        />

                        {/* DELETE COLUMN */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteColumn(
                              column.id
                            )
                          }
                          disabled={
                            table.columns.length <= 1
                          }
                          title="Delete column"
                          className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-400
                            transition
                            hover:bg-red-50
                            hover:text-red-600
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                          "
                        >
                          <Trash2
                            size={16}
                          />
                        </button>

                      </div>

                    </th>
                  )
                )}

                {/* =================================================
                    FIXED RIGHT HEADER
                ================================================== */}

                <th
                  className="
                    sticky
                    right-0
                    top-0
                    z-40
                    w-[64px]
                    min-w-[64px]
                    border-b
                    border-l
                    border-slate-200
                    bg-slate-50
                  "
                />

              </tr>

            </thead>

            {/* =================================================
                TABLE BODY
            ================================================== */}

            <tbody>

              {table.rows.map(
                (row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/60"
                  >

                    {/* CELLS */}

                    {table.columns.map(
                      (column) => (
                        <td
                          key={`${row.id}-${column.id}`}
                          className="
                            min-w-[320px]
                            border-b
                            border-r
                            border-slate-200
                            p-0
                          "
                        >

                          <input
                            type="text"
                            value={
                              row.cells?.[
                                column.id
                              ] ?? ""
                            }
                            onChange={(e) =>
                              handleCellChange(
                                row.id,
                                column.id,
                                e.target.value
                              )
                            }
                            placeholder="Enter value"
                            className="
                              h-16
                              w-full
                              border-0
                              bg-transparent
                              px-5
                              text-sm
                              font-medium
                              text-slate-700
                              outline-none
                              placeholder:text-slate-400
                              focus:bg-[#fffdf8]
                              focus:ring-0
                            "
                          />

                        </td>
                      )
                    )}

                    {/* =================================================
                        FIXED RIGHT DELETE ROW
                    ================================================== */}

                    <td
                      className="
                        sticky
                        right-0
                        z-30
                        w-[64px]
                        min-w-[64px]
                        border-b
                        border-l
                        border-slate-200
                        bg-white
                        p-0
                        text-center
                      "
                    >

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteRow(
                            row.id
                          )
                        }
                        disabled={
                          table.rows.length <= 1
                        }
                        title="Delete row"
                        className="
                          mx-auto
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-lg
                          text-slate-400
                          transition
                          hover:bg-red-50
                          hover:text-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                      >
                        <Trash2
                          size={16}
                        />
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {/* =====================================================
            BOTTOM BUTTONS
        ====================================================== */}

        <div className="mt-4 flex flex-wrap items-center gap-2">

          {/* ADD COLUMN */}

          <button
            type="button"
            onClick={handleAddColumn}
            className={addColumnButton}
          >
            <Plus size={16} />
            Add Column
          </button>

          {/* ADD ROW */}

          <button
            type="button"
            onClick={handleAddRow}
            className={addColumnButton}
          >
            <Plus size={16} />
            Add Row
          </button>

        </div>

      </div>

    </section>
  );
}

export default DynamicTable;
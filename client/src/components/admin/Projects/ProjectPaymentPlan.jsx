import {
  IndianRupee,
  Plus,
  Trash2,
  Percent,
  CalendarDays,
} from "lucide-react";

function ProjectPaymentPlan({
  value = {},
  onChange,
}) {
  const paymentPlan = {
    bookingAmount: value?.bookingAmount || "",
    downPayment: value?.downPayment || "",
    stages: Array.isArray(value?.stages)
      ? value.stages
      : [],
  };

  // =========================================================
  // UPDATE MAIN FIELD
  // =========================================================

  const updateField = (field, fieldValue) => {
    if (!onChange) return;

    onChange({
      ...paymentPlan,
      [field]: fieldValue,
    });
  };

  // =========================================================
  // ADD PAYMENT STAGE
  // =========================================================

  const addPaymentStage = () => {
    const newStage = {
      id: Date.now(),
      title: "",
      percentage: "",
      amount: "",
      dueDate: "",
      description: "",
    };

    if (onChange) {
      onChange({
        ...paymentPlan,
        stages: [
          ...paymentPlan.stages,
          newStage,
        ],
      });
    }
  };

  // =========================================================
  // UPDATE PAYMENT STAGE
  // =========================================================

  const updatePaymentStage = (
    index,
    field,
    fieldValue
  ) => {
    const updatedStages =
      paymentPlan.stages.map(
        (stage, stageIndex) =>
          stageIndex === index
            ? {
                ...stage,
                [field]: fieldValue,
              }
            : stage
      );

    if (onChange) {
      onChange({
        ...paymentPlan,
        stages: updatedStages,
      });
    }
  };

  // =========================================================
  // REMOVE PAYMENT STAGE
  // =========================================================

  const removePaymentStage = (index) => {
    const updatedStages =
      paymentPlan.stages.filter(
        (_, stageIndex) =>
          stageIndex !== index
      );

    if (onChange) {
      onChange({
        ...paymentPlan,
        stages: updatedStages,
      });
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
        <div>
          <h2 className="text-sm font-extrabold text-slate-950">
            Payment Plan
          </h2>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Configure booking and payment milestones
          </p>
        </div>

        <button
          type="button"
          onClick={addPaymentStage}
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

          Add Payment Stage
        </button>
      </div>

      <div className="p-5">
        {/* ===================================================
            BASIC PAYMENT DETAILS
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            md:grid-cols-2
          "
        >
          {/* BOOKING AMOUNT */}

          <div>
            <label className="text-[11px] font-bold text-slate-700">
              Booking Amount
            </label>

            <div className="relative mt-2">
              <IndianRupee
                size={15}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="number"
                min="0"
                value={paymentPlan.bookingAmount}
                onChange={(event) =>
                  updateField(
                    "bookingAmount",
                    event.target.value
                  )
                }
                placeholder="Enter booking amount"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-9
                  pr-3
                  text-sm
                  font-semibold
                  text-slate-800
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#d6a84f]
                  focus:ring-2
                  focus:ring-[#d6a84f]/10
                "
              />
            </div>
          </div>

          {/* DOWN PAYMENT */}

          <div>
            <label className="text-[11px] font-bold text-slate-700">
              Down Payment
            </label>

            <div className="relative mt-2">
              <IndianRupee
                size={15}
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="number"
                min="0"
                value={paymentPlan.downPayment}
                onChange={(event) =>
                  updateField(
                    "downPayment",
                    event.target.value
                  )
                }
                placeholder="Enter down payment"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-9
                  pr-3
                  text-sm
                  font-semibold
                  text-slate-800
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#d6a84f]
                  focus:ring-2
                  focus:ring-[#d6a84f]/10
                "
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            PAYMENT STAGES
        ==================================================== */}

        <div className="mt-7 border-t border-slate-100 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-extrabold text-slate-800">
                Payment Milestones
              </h3>

              <p className="mt-1 text-[10px] text-slate-400">
                Add payment stages according to the project plan.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
              {paymentPlan.stages.length} Stages
            </span>
          </div>

          {/* EMPTY STATE */}

          {paymentPlan.stages.length === 0 && (
            <div
              className="
                mt-4
                rounded-xl
                border
                border-dashed
                border-slate-200
                bg-slate-50
                px-5
                py-8
                text-center
              "
            >
              <CalendarDays
                size={22}
                className="mx-auto text-slate-300"
              />

              <p className="mt-2 text-xs font-bold text-slate-600">
                No payment stages added
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Click "Add Payment Stage" to create one.
              </p>
            </div>
          )}

          {/* PAYMENT STAGES */}

          <div className="mt-4 space-y-4">
            {paymentPlan.stages.map(
              (stage, index) => (
                <div
                  key={
                    stage.id || index
                  }
                  className="
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50/70
                    p-4
                  "
                >
                  {/* STAGE HEADER */}

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
                        Payment Stage
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removePaymentStage(
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
                      title="Remove payment stage"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {/* STAGE FIELDS */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-2
                      xl:grid-cols-4
                    "
                  >
                    {/* TITLE */}

                    <div className="xl:col-span-2">
                      <label className="text-[10px] font-bold text-slate-600">
                        Stage Name
                      </label>

                      <input
                        type="text"
                        value={stage.title}
                        onChange={(event) =>
                          updatePaymentStage(
                            index,
                            "title",
                            event.target.value
                          )
                        }
                        placeholder="e.g. At Booking"
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
                          focus:border-[#d6a84f]
                        "
                      />
                    </div>

                    {/* PERCENTAGE */}

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Percentage
                      </label>

                      <div className="relative mt-1.5">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={
                            stage.percentage
                          }
                          onChange={(event) =>
                            updatePaymentStage(
                              index,
                              "percentage",
                              event.target.value
                            )
                          }
                          placeholder="10"
                          className="
                            h-10
                            w-full
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            px-3
                            pr-8
                            text-xs
                            font-semibold
                            text-slate-800
                            outline-none
                            focus:border-[#d6a84f]
                          "
                        />

                        <Percent
                          size={13}
                          className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                          "
                        />
                      </div>
                    </div>

                    {/* AMOUNT */}

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Amount
                      </label>

                      <div className="relative mt-1.5">
                        <IndianRupee
                          size={13}
                          className="
                            absolute
                            left-2.5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                          "
                        />

                        <input
                          type="number"
                          min="0"
                          value={
                            stage.amount
                          }
                          onChange={(event) =>
                            updatePaymentStage(
                              index,
                              "amount",
                              event.target.value
                            )
                          }
                          placeholder="Amount"
                          className="
                            h-10
                            w-full
                            rounded-lg
                            border
                            border-slate-200
                            bg-white
                            pl-7
                            pr-3
                            text-xs
                            font-semibold
                            text-slate-800
                            outline-none
                            focus:border-[#d6a84f]
                          "
                        />
                      </div>
                    </div>
                  </div>

                  {/* DATE + DESCRIPTION */}

                  <div
                    className="
                      mt-4
                      grid
                      grid-cols-1
                      gap-4
                      md:grid-cols-2
                    "
                  >
                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Due Date
                      </label>

                      <input
                        type="date"
                        value={
                          stage.dueDate
                        }
                        onChange={(event) =>
                          updatePaymentStage(
                            index,
                            "dueDate",
                            event.target.value
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
                          text-slate-700
                          outline-none
                          focus:border-[#d6a84f]
                        "
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-600">
                        Description
                      </label>

                      <input
                        type="text"
                        value={
                          stage.description
                        }
                        onChange={(event) =>
                          updatePaymentStage(
                            index,
                            "description",
                            event.target.value
                          )
                        }
                        placeholder="Optional payment details"
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
                          font-medium
                          text-slate-700
                          outline-none
                          placeholder:text-slate-400
                          focus:border-[#d6a84f]
                        "
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectPaymentPlan;
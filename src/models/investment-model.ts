import mongoose from "mongoose";

const investmentSchema = new mongoose.Schema(
  {
    investee: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    agreement: {
      type: String, // image URL
      default: null,
    },
    contact: {
      type: String,
    },
    investedAmount: {
      type: Number,
      required: true,
    },
    instalments: {
      type: Number,
      required: true,
    },
    instalmentHistory: [
      {
        amount: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
    loanStartDate: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      required: true,
    },
    chargedAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Closed"],
      default: "Active",
    },

    // pre saves
    profit: {
      type: Number,
      default: 0,
    },
    paidProfit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

investmentSchema.pre("save", function (next) {
  const { investedAmount, chargedAmount, instalments, instalmentHistory } =
    this;
  if (
    !investedAmount ||
    !chargedAmount ||
    !instalments ||
    !Array.isArray(instalmentHistory)
  ) {
    return 0;
  }

  this.profit = chargedAmount - investedAmount;

  if (
    !investedAmount ||
    !chargedAmount ||
    !instalments ||
    !Array.isArray(instalmentHistory)
  ) {
    this.paidProfit = 0;
  }

  // Calculate per-instalment principal and profit
  const principalPerInstalment = investedAmount / instalments;
  const profitPerInstalment = (chargedAmount - investedAmount) / instalments;

  // For each paid instalment, sum up the profit portion
  const paidProfit = instalmentHistory.reduce((sum, installment) => {
    // If the installment amount is less than or equal to principalPerInstalment + profitPerInstalment,
    // then profit portion is profitPerInstalment, else proportionally calculate
    const paid = Math.min(
      installment.amount,
      principalPerInstalment + profitPerInstalment
    );
    // Calculate how much of this installment is profit
    const profit = Math.min(
      profitPerInstalment,
      Math.max(0, paid - principalPerInstalment)
    );
    return sum + profit;
  }, 0);

  this.paidProfit = paidProfit;

  next();
});

investmentSchema.index({ status: 1 });

export const investmentModel =
  mongoose.models.Investment || mongoose.model("Investment", investmentSchema);

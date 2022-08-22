const mongoose = require("mongoose");

const accountModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    usedMargin: {
      type: Number,
      required: true,
    },
    profitOrLossMin: {
      type: Number,
      required: true,
    },
    profitOrLossMax: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("accounts", accountModel);

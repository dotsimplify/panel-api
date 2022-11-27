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
    brokerName: {
      type: String,
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
    oiBal: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("accounts", accountModel);

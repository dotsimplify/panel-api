const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    type: {
      type: String,
      required: true,
      default: "U",
    },
    profilePic: {
      type: Object,
      default: {
        url: "https://res.cloudinary.com/doorbase/image/upload/v1657535267/samples/userrr_x0ilfl.png",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("admins", adminSchema);

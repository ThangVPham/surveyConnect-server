const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "User",
    },
    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    surveys: {
      type: Schema.Types.ObjectId,
      ref: "survey",
      default: [],
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("user", user);
module.exports = User;

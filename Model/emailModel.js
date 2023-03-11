const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const email = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    collection: "emails",
  }
);

const Email = mongoose.model("email", email);
module.exports = Email;

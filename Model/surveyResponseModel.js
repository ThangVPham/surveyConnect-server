const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const response = new Schema(
  {
    surveyId: {
      type: Schema.Types.ObjectId,
      ref: "survey",
      required: true,
    },
    response: {
      type: Object,
      require: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "responses",
  }
);

const Response = mongoose.model("response", response);
module.exports = Response;

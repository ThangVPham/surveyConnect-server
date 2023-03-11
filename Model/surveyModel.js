//possitble surveyTypes
//[MC, Short Answer, Checkbox, Other]
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const survey = new Schema(
  {
    surveyName: {
      type: String,
      required: true,
    },
    surveyOwner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    organization: {
      type: String,
      require: true,
    },
    surveyType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    public: {
      type: Boolean,
      default: true,
    },
    accessCode: {
      type: String,
      default: "",
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
    dateEnd: {
      type: Date,
      required: true,
    },
    instructionMessage: {
      type: String,
    },
    questions: [
      {
        questionType: String,
        question: String,
        options: {
          type: [String],
          default: null,
        },
        correctOption: {
          type: String,
          default: null,
        },
        imgURL: [String],
        imgDesc: [String],
      },
    ],
    numResponse: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "surveys",
  }
);

const Survey = mongoose.model("survey", survey);
module.exports = Survey;

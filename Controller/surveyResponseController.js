const Response = require("../Model/surveyResponseModel");
const Email = require("../Model/emailModel");
const Survey = require("../Model/surveyModel");
const submitSurveyResponse = async (req, res) => {
  const responseObj = {
    userRef: req.user,
    surveyId: req.survey,
    response: req.body,
  };
  // console.log(responseObj);
  // // const response = await Response.findOne().populate(["userRef", "surveyId"]);
  // // console.log(response);
  // res.json({ message: "received" });

  try {
    await Response.create(responseObj);
    await Survey.findByIdAndUpdate(req.survey, { $inc: { numResponse: 1 } });
    console.log("Response Successfully Submitted");
    res.json({ message: "Response Successfully Submitted", status: "Success" });
  } catch (e) {
    console.log(e);
    res.json({ errorMessage: e.message });
  }
};

const verifyEmail = async (req, res) => {
  const email = await Email.findOne({ email: req.body.email });

  if (email) {
    res.json({ message: "Email already exists" });
  } else {
    await Email.create({ email: req.body.email });
    res.json({ message: "Email OK" });
  }
};

module.exports = {
  submitSurveyResponse,
  verifyEmail,
};

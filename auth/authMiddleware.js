const jwt = require("jsonwebtoken");
const User = require("../Model/userModel");
const Survey = require("../Model/surveyModel");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decodedToken.id).select("_id");

      req.survey = await Survey.findById(req.headers.surveyid).select("_id");
      next();
    } catch (e) {
      console.log(e);
      res
        .status(401)
        .json({ message: "Session Expired. Please log in to continue" });
    }
  } else {
    res.status(401).json({ message: "Not Authorized" });
  }
};

const verifyAccess = async (req, res, next) => {
  const accessCode = req.body.accessCode;
  const surveyId = req.body.surveyId;
  console.log(accessCode);

  try {
    const survey = await Survey.findById(surveyId);

    if (survey.accessCode === accessCode) {
      req.accessAllow = true;

      next();
    } else {
      console.log("Invalid Access Code");
      res.json({ errorMessage: "Invalid Access Code" });
    }
  } catch (e) {
    console.log(e);
    res.json({ errorMessage: e.message });
  }
};

module.exports = { authenticate, verifyAccess };

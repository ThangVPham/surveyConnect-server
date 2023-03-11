const express = require("express");
const router = express.Router();
const responseController = require("../Controller/surveyResponseController");
const { authenticate } = require("../auth/authMiddleware");

router.post("/", authenticate, responseController.submitSurveyResponse);
router.post("/verifyemail", responseController.verifyEmail);
module.exports = router;

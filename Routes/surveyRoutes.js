const express = require("express");
const router = express.Router();
const surveyController = require("../Controller/surveyController");
const { authenticate, verifyAccess } = require("../auth/authMiddleware");

//This route is for survey takers to confirm they have access code
router.post("/verifyaccess", verifyAccess, surveyController.getSurveyById);
//This route is for survey creator to access dashboard with all their surveys
router.get("/", authenticate, surveyController.getAllSurveyData);
//This route is for survey takers to access survey once they've entered a valid access code
router.get("/:id", surveyController.getSurveyById);

//These routes are for CRUD operations available to survey owner
router.get(
  "/surveydetail/:id",
  authenticate,
  surveyController.surveyDetailById
);
router.get(
  "/surveyOwnerView/:id",
  authenticate,
  surveyController.getSurveyById
);
router.put("/:id", authenticate, surveyController.editSurvey);
router.delete("/:id", authenticate, surveyController.deleteSurvey);
router.post("/newsurvey", authenticate, surveyController.submitSurvey);

module.exports = router;

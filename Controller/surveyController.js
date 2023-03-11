const Survey = require("../Model/surveyModel");
const Response = require("../Model/surveyResponseModel");

const getAllSurveyData = async (req, res) => {
  try {
    let surveys = await Survey.find({ surveyOwner: req.user.id }).sort({
      dateCreated: -1,
    });

    res.send(surveys);
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
};

const getSurveyById = async (req, res) => {
  let id = "";

  if (req.body.surveyId) {
    id = req.body.surveyId;
  } else {
    id = req.params.id;
  }

  const accessAllow = req.accessAllow;
  try {
    let survey = await Survey.findById(id);
    //Serve data if survey is public,survey taker entered correct access code, or survey owner is accessing
    if (survey.public || accessAllow) {
      console.log(`Survey Found By ID: ${id}`);
      res.json(survey);
    } else if (!survey.public) {
      console.log(`Survey ${id} is private`);

      res.json({
        errorMessage: "verifyAccess",
        surveyName: survey.surveyName,
      });
    } else {
      console.log("No Surveys Found");
      res.json({ message: "No Surveys Found" });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
};

const surveyDetailById = async (req, res) => {
  const id = req.params.id;

  try {
    const survey = await Survey.findById(id);
    const response = await Response.find({ surveyId: survey }).populate(
      "userRef"
    );

    const data = { survey, response };

    res.json(data);
  } catch (e) {
    console.log(e);
  }
};

const submitSurvey = async (req, res) => {
  let survey = req.body;
  try {
    await Survey.create(survey);
    console.log("Survey Successfuly Created.");
    res.json({ message: "Survey Successfuly Created", status: "Success" });
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
};

const deleteSurvey = async (req, res) => {
  const id = req.params.id;
  console.log("Deleting");

  try {
    const survey = await Survey.findOneAndDelete({ _id: id });
    if (survey) {
      console.log(`Survey Deleted. ID: ${id}`);
      res.json({ message: `Survey Deleted. ID: ${id}`, status: "Success" });
    } else {
      console.log("Survey Not Found");
      res.json({ message: "Survey Not Found" });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
};

const editSurvey = async (req, res) => {
  const id = req.params.id;
  const newSurvey = req.body;

  try {
    const survey = await Survey.findByIdAndUpdate({ _id: id }, newSurvey);
    let surveys = await Survey.find().sort({ dateCreated: -1 });
    if (survey) {
      console.log("Survey Sucessfully Updated");

      res.json(surveys);
    } else {
      console.log("Survey Not Found");
      res.json({ message: "Survey Not Found" });
    }
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
};

module.exports = {
  getAllSurveyData,
  submitSurvey,
  getSurveyById,
  deleteSurvey,
  editSurvey,
  surveyDetailById,
};

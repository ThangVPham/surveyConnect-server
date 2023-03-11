const Survey = require("./Model/surveyModel");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
//Remove this before push to production
const MarketResearch = require("./surveys/MarketResearchProduct.json");
const OpinionSurvey = require("./surveys/OpinionSurvey.json");
const ScienceQuiz = require("./surveys/ScienceQuiz.json");
const SocialMediaSurvey = require("./surveys/SocialMediaSurvey.json");

const fillSurvey = async () => {
  const surveys = [
    MarketResearch,
    OpinionSurvey,
    ScienceQuiz,
    SocialMediaSurvey,
  ];
  const surveyCollection = await Survey.find();
  if (surveyCollection.length < 1) {
    for (let survey of surveys) {
      const res = await fetch("http://localhost:5000/survey/newsurvey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTAwMzBhZWYwM2VkMGJjOGQ0ZGNhMCIsImlhdCI6MTY3NjYwNDM0MywiZXhwIjoxNzA4MTQwMzQzfQ.s2SBsmAYL7XCbXmA77ahRFzDrNAeNgUBqVxau9625lQ`,
        },
        body: JSON.stringify(survey),
      });
      const data = await res.json();
      console.log(data);
    }
  }
};

module.exports = { fillSurvey };

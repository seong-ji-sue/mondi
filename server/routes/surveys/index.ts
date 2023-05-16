import express from "express";
import next from "next";
import { getSurveys } from "../../services/surveys/survey.service";

const surveysRouter = express.Router();

surveysRouter
  .get("/", async (req, res, next) => {
    try {
      const surveys = await getSurveys({});
      res.json(surveys);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .get("/:surveyId", async (req, res, next) => {
    try {

    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/:surveyId", async (req, res) => {});

export default surveysRouter;
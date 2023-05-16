import express, { Request, Response } from "express";
import { isEmpty } from "lodash";
import User from "../../../server/entities/user.entity";
import { parseUser } from "../../../server/middlewares/user";
import { getSurvey, getSurveys } from "../../services/surveys/survey.service";

const surveysRouter = express.Router();

surveysRouter
  .get("/", parseUser, async (req: Request, res: Response, next) => {
    try {
      const {page, limit} = req.query as {page: string, limit: string};
      const user: User = req.auth?.user;
      const surveys = await getSurveys({userId: user.id, page: parseInt(page) | 1, limit: parseInt(limit) | 10});
      res.json(surveys);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .get("/:surveyId", async (req, res, next) => {
    try {
      const surveyId = parseInt(req.params.surveyId);
      const user: User = req.auth?.user;
      const survey = await getSurvey({surveyId, userId: user?.id});

      console.log(survey);
      if (isEmpty(survey)) {
        return res.status(404).send();
      }

      res.json(survey);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/:surveyId", async (req, res) => {});

export default surveysRouter;
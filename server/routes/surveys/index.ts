import express, { Request, Response } from "express";
import { isEmpty, omit } from "lodash";
import next from "next";
import User from "../../../server/entities/user.entity";
import { authCheck } from "../../../server/middlewares/check";
import { parseUser } from "../../../server/middlewares/user";
import { checkUserEnteredSurvey, enterSurvey, getSurvey, getSurveys } from "../../services/surveys/survey.service";

const surveysRouter = express.Router();

surveysRouter
  .get("/", parseUser, async (req: Request, res: Response, next) => {
    try {
      const {page, limit} = req.query as {page: string, limit: string};
      const user: User = req.auth?.user;
      const surveys = await getSurveys({userId: user?.id, page: parseInt(page) || 1, limit: parseInt(limit) || 10});
      res.json(surveys);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .get("/:surveyId", parseUser, async (req, res, next) => {
    try {
      const surveyId = parseInt(req.params?.surveyId);
      const user: User = req.auth?.user;
      const survey = await getSurvey({surveyId, userId: user?.id});

      if (isEmpty(survey)) {
        return res.status(404).send();
      }

      // TODO omit 통합
      res.json(omit(survey, "users"));
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post("/:surveyId/enter", authCheck, parseUser, async (req, res, next) => {
    try {
      const surveyId = parseInt(req.params?.surveyId);
      const user: User = req.auth?.user;
      const survey = await getSurvey({surveyId, userId: user.id});

      if (isEmpty(survey)) {
        return res.status(404).send();
      }

      const isUserAlreadyEntered = await checkUserEnteredSurvey({surveyId: survey.id, userId: user.id});

      if (isUserAlreadyEntered) {
        return res.status(400).send({
          message: "Already Entered"
        });
      }

      const userEnteredSurvey = await enterSurvey({survey, user});
      // TODO omit 통합
      res.json(omit(userEnteredSurvey, "users"));
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

export default surveysRouter;
import express, { Request, Response } from "express";
import User from "../../entities/user.entity";
import { authCheck } from "../../middlewares/check";
import { parseUser } from "../../middlewares/user";
import { getUserSurveys } from "../../services/surveys/survey.service";
import { getUserInfo } from "../../services/users/user.service";

const myInfoRouter = express.Router();

myInfoRouter
  .get("/", authCheck, parseUser, async (req: Request, res: Response, next) => {
    try {
      const user: User = req.auth.user;
      const userInfo = await getUserInfo({userId: user.id});
      res.json(userInfo);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .get("/surveys", authCheck, parseUser, async (req: Request, res: Response, next) => {
    try {
      const {page, limit} = req.query as {page: string, limit: string};
      const user: User = req.auth.user;
      const surveys = await getUserSurveys({userId: user.id, page: parseInt(page) || 1, limit: parseInt(limit) || 10});
      res.json(surveys);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  
export default myInfoRouter;
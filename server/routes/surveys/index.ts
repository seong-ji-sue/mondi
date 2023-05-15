import express from "express";

const surveysRouter = express.Router();

surveysRouter
  .get("/", async (req, res) => {})
  .get("/:surveyId", async (req, res) => {})
  .post("/:surveyId", async (req, res) => {});

export default surveysRouter;
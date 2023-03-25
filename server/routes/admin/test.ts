import express from "express";

const testRouter = express.Router();

testRouter.get("/", (req, res) => {
  return res.status(200).json({ result: true });
});

export default testRouter;

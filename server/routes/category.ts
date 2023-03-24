import express from "express";
import Category from "@entities/category";
import { dataSource } from "..";

const categoryRouter = express.Router();

categoryRouter.get("/", (req, res) => {
  dataSource.getRepository(Category)
    .createQueryBuilder("category")
    .select([
      "category.id", "category.name", "category.imgUrl"
    ])
    .getMany()
    .then(categories => {
      return res.status(200).json({ result: true, categories });
    })
    .catch(error => {
      console.log(error);
      return res.status(400).json({ result: false });
    });
});

export default categoryRouter;
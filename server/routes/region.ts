import express from "express";
import RegionDepth3 from "../entities/regionDepth3";
import { dataSource } from "..";

const regionRouter = express.Router();

regionRouter.get("/", (req, res) => {
  dataSource.getRepository(RegionDepth3)
    .createQueryBuilder("regionDepth3")
    .select([
      "regionDepth3.id", "regionDepth3.name",
      "regionDepth2.name",
      "regionDepth1.name",
    ])
    .leftJoin("regionDepth3.regionDepth2", "regionDepth2")
    .leftJoin("regionDepth2.regionDepth1", "regionDepth1")
    .getMany()
    .then(regions => {
      return res.status(200).json({ result: true, regions });
    })
    .catch(error => {
      console.log(error);
      return res.status(400).json({ result: false });
    });
});

export default regionRouter;
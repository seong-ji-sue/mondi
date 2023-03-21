import express from "express";
import Banner from "@mondi/common/entities/banner";
import { dataSource } from "..";

const bannerRouter = express.Router();

bannerRouter.get("/", (req, res) => {
  dataSource.getRepository(Banner)
    .createQueryBuilder("banner")
    .select([
      "banner.url",
    ])
    .getMany()
    .then(banners => {
      return res.status(200).json({ result: true, banners });
    })
    .catch(error => {
      console.log(error);
      return res.status(400).json({ result: false });
    });
});

export default bannerRouter;
import express from "express";
import RegionDepth3 from "@mondi/common/entities/regionDepth3";
import Product from "@mondi/common/entities/product";
import { dataSource } from "..";

const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const regionDepth3Id = parseInt(req.query.regionId as string);
  const categoryId = parseInt(req.query.categoryId as string);
  const recruitChecked = req.query.recruitChecked;

  let productsQuery = dataSource.getRepository(Product)
    .createQueryBuilder("product")
    .select([
      "product.id", "product.title", "product.cost", "product.discountCost", "product.numOfPeople", "product.state",
      "company.name",
      "image.url",
      "category.name"
    ])
    .leftJoin("product.company", "company")
    .leftJoin("product.images", "image")
    .leftJoin("product.regionDepth1", "regionDepth1")
    .leftJoin("product.regionDepth2", "regionDepth2")
    .leftJoin("product.regionDepth3", "regionDepth3")
    .leftJoin("product.categories", "category")

  if (!isNaN(regionDepth3Id)) {
    const regionDepth3 = await dataSource.getRepository(RegionDepth3)
      .findOne({
        where: {
          id: regionDepth3Id
        },
        relations: ["regionDepth2", "regionDepth2.regionDepth1"]
      });

    if (!regionDepth3) {
      return res.status(400).json({ result: false });
    }

    productsQuery = productsQuery
      .orWhere("regionDepth1.id IS NULL AND regionDepth2.id IS NULL AND regionDepth3.id IS NULL")
      .orWhere("regionDepth1.id = :regionDepth1Id AND regionDepth2.id IS NULL AND regionDepth3.id IS NULL", {
        regionDepth1Id: regionDepth3.regionDepth2.regionDepth1.id
      })
      .orWhere("regionDepth2.id = :regionDepth2Id AND regionDepth3.id IS NULL", {
        regionDepth2Id: regionDepth3.regionDepth2.id
      })
      .orWhere("regionDepth3.id = :regionDepth3Id", {
        regionDepth3Id: regionDepth3.id
      });
  }

  if (!isNaN(categoryId)) {
    productsQuery = productsQuery
      .andWhere("category.id = :categoryId", {
        categoryId
      })
  }

  if (recruitChecked === "true") {
    productsQuery = productsQuery
      .andWhere("product.startDate < NOW()")
      .andWhere("product.endDate > NOW()");
  }

  return productsQuery
    .orderBy({ "product_state": "ASC" })
    .getMany()
    .then(products => {
      return res.status(200).json({ result: true, products });
    })
    .catch(error => {
      console.log(error);
      return res.status(400).json({ result: false });
    });
});

productRouter.get("/detail", (req, res) => {
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) {
    return res.status(400).json({ result: false });
  }

  dataSource.getRepository(Product)
    .createQueryBuilder("product")
    .where({ id })
    .select([
      "product.title", "product.cost", "product.discountCost", "product.numOfPeople", "product.state",
      "product.detailContent", "product.companyName", "product.companyMapUrl",
      "company.name",
      "image.url",
      "category.name",
      "regionDepth1.name",
      "regionDepth2.name",
      "regionDepth3.name",
    ])
    .leftJoin("product.company", "company")
    .leftJoin("product.images", "image")
    .leftJoin("product.categories", "category")
    .leftJoin("product.regionDepth1", "regionDepth1")
    .leftJoin("product.regionDepth2", "regionDepth2")
    .leftJoin("product.regionDepth3", "regionDepth3")
    .getOne()
    .then(product => {
      res.status(200).json({ result: true, product });
    })
    .catch(error => {
      console.log(error);
      res.status(400).json({ result: false })
    });
})

export default productRouter;
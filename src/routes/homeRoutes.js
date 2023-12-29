import express from "express"
import { getImageList, searchImageList } from "../controllers/homeController.js";

const homeRoute = express.Router();

homeRoute.get("/image-list", getImageList)
homeRoute.get("/search-image-list/:ten_hinh", searchImageList)


export default homeRoute    
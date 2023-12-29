import express from "express"
import { getCommentImage, getImageInfo, getSaveImage, postCommentImage } from "../controllers/detailController.js";

const detailRoute = express.Router();

detailRoute.get("/image-info/:hinhId", getImageInfo)
detailRoute.get("/get-comment/:hinhId", getCommentImage)
detailRoute.get("/save-image/:hinhId", getSaveImage)
detailRoute.post("/post-comment/:hinhId", postCommentImage)


export default detailRoute
import express from "express"
import { deleteImage, getSavedImageByUserId, getUserInfo } from "../controllers/imageController.js";

const imageRoute = express.Router();

imageRoute.get("/get-user-info", getUserInfo)
imageRoute.get("/get-image-save-by-userId/:userId", getSavedImageByUserId)
imageRoute.delete("/deleteImage/:hinhId", deleteImage)

export default imageRoute
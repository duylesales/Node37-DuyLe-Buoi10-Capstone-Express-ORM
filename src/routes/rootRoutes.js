import express from "express"
import userRoute from "./userRoutes.js";
import homeRoute from "./homeRoutes.js";
import detailRoute from "./detailRoutes.js";
import imageRoute from "./imageRoutes.js";

const rootRoute = express.Router();

rootRoute.use("/user", userRoute )
rootRoute.use("/home", homeRoute )
rootRoute.use("/detail", detailRoute )
rootRoute.use("/image", imageRoute )


export default rootRoute;
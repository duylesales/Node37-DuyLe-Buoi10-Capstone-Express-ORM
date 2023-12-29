import express from "express";
import cors from "cors";
import rootRoute from "./src/routes/rootRoutes.js";


const app = express();
app.use(express.json());
app.use(cors());
app.listen(2810);

app.use("/api", rootRoute);

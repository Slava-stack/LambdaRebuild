import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import router from "../routes/router";
import errorLogger from "../middleware/errorHandler";
import errorHandler from "../middleware/errorHandler";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use("/", router);

app.use(errorLogger, errorHandler);

app.listen(PORT, () => {
  console.log("Server's been started.");
});

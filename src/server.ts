import express from "express";
import helmet from "helmet";
import { checkIfAuth } from "./middlewares/auth";
import BaseRouter from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(checkIfAuth);

app.use("/", BaseRouter);

export default app;

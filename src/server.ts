import express from "express";
import helmet from "helmet";
import BaseRouter from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger";
import swaggerJSDoc from "swagger-jsdoc";

const openapiSpecification = swaggerJSDoc(swaggerOptions);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/", BaseRouter);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

export default app;

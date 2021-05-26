/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { create, login, logout } from "./Auth";

// Auth router
const authRouter = Router();
authRouter.post("/login", login);
authRouter.post("/create", create);
authRouter.get("/logout", logout);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/auth", authRouter);

export default baseRouter;

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { checkIfAuth } from "../middlewares/auth";
import { create, login, logout } from "./Auth";
import {
  createExpressions,
  deleteExpressions,
  getAllExpressions,
  getExpression,
  updateExpression,
} from "./Calc";

import {
  createTasks,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "./Notes";

const authRouter = Router();
authRouter.post("/login", login);
authRouter.post("/create", create);
authRouter.get("/logout", checkIfAuth, logout);

const calcRouter = Router();
calcRouter.get("/expressions/:id", getExpression);
calcRouter.put("/expressions/:id", updateExpression);
calcRouter.delete("/expressions", deleteExpressions);
calcRouter.get("/expressions", getAllExpressions);
calcRouter.post("/expressions", createExpressions);

const notesRouter = Router();
notesRouter.get("/tasks/:id", getTask);
notesRouter.put("/tasks/:id", updateTask);
notesRouter.delete("/tasks", deleteTask);
notesRouter.get("/tasks", getAllTasks);
notesRouter.post("/tasks", createTasks);

const baseRouter = Router();
baseRouter.use("/auth", authRouter);
baseRouter.use("/calc", checkIfAuth, calcRouter);
baseRouter.use("/notes", checkIfAuth, notesRouter);

export default baseRouter;

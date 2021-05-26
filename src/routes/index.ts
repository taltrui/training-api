/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { checkIfAuth } from "src/middlewares/auth";
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
calcRouter.get("/exp/:id", getExpression);
calcRouter.put("/exp/:id", updateExpression);
calcRouter.delete("/exp", deleteExpressions);
calcRouter.get("/exp", getAllExpressions);
calcRouter.post("/exp", createExpressions);

const notesRouter = Router();
notesRouter.get("/task/:id", getTask);
notesRouter.put("/task/:id", updateTask);
notesRouter.delete("/task", deleteTask);
notesRouter.get("/task", getAllTasks);
notesRouter.post("/task", createTasks);

const baseRouter = Router();
baseRouter.use("/auth", authRouter);
baseRouter.use("/calc", checkIfAuth, calcRouter);
baseRouter.use("/notes", checkIfAuth, notesRouter);

export default baseRouter;

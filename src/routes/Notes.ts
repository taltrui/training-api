/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response } from "express";

interface LoginBody {
  email?: string;
  password?: string;
}

export const getTask = async (req: Request, res: Response) => {};
export const updateTask = async (req: Request, res: Response) => {};
export const deleteTask = async (req: Request, res: Response) => {};
export const getAllTasks = async (req: Request, res: Response) => {};
export const createTasks = async (req: Request, res: Response) => {};

import { Request, Response, NextFunction } from "express";

import { admin } from "@firebase";

export const checkIfAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "") || "";

  try {
    const user = await admin.auth().verifyIdToken(token, true);
    res.locals.user = user;
    next();
  } catch (err) {
    return res.status(401).send({
      error: "You are not authorized to make this request",
      payload: err,
    });
  }
};

import { Request, NextFunction } from "express";
import { IdUnknownParam, TypedResponse } from "../interfaces/interfaces";
import errorMsgs from "./data/errorMessages";

export const idHandler = (
  req: Request<IdUnknownParam, {}, {}, {}>,
  res: TypedResponse<{ message: string }>,
  next: NextFunction
): undefined | void => {
  const { id } = req.params;

  if (typeof id === "string") {
    if (id.trim()) {
      next();
      return;
    }
  }
  res.status(404).json({ message: errorMsgs.idMsg });
};

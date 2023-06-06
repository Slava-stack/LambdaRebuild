import { Request, NextFunction } from "express";
import { SearchUnknownParam } from "../interfaces/interfaces";
import errorMsgs from "./data/errorMessages";
import { TypedResponse } from "../interfaces/interfaces";

export const searchHandler = (
  req: Request<SearchUnknownParam, {}, {}, {}>,
  res: TypedResponse<{ message: string }>,
  next: NextFunction
): undefined | void => {
  const { type, searchWord } = req.params;

  if (!type) {
    res.status(404).json({ message: errorMsgs.searchTypeMsg });
    return;
  }

  const isValidParam = ["Products", "Customers"].includes(type);

  if (!isValidParam) {
    res.status(404).json({ message: errorMsgs.searchPathMsg });
    return;
  }
  // if (!searchWord) {
  //   res.status(404).json({ message: errorMsgs.searchWordMsg });
  //   return;
  // }

  next();
};

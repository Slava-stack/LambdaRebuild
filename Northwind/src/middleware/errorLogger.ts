import { Request, NextFunction } from "express";
import { TypedResponse } from "../interfaces/interfaces";

const errorHandler = (
  err: unknown,
  _req: Request,
  _res: TypedResponse<void>,
  next: NextFunction
) => {
  console.log(err);

  next(err);
};

export default errorHandler;

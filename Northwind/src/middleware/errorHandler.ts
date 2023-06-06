import { ErrorRequestHandler, Request, NextFunction } from "express";
import { TypedResponse } from "../interfaces/interfaces";

const errorHandler: ErrorRequestHandler = (
  _err: unknown,
  _req: Request,
  res: TypedResponse<{ message: string }>,
  _next: NextFunction
) => {
  res.send(500).json({ message: "internal error" });
};

export default errorHandler;

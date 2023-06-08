import { ErrorRequestHandler, Request, NextFunction } from "express";
import { TypedResponse } from "../interfaces/interfaces";

const errorHandler: ErrorRequestHandler = (
  _err: unknown,
  _req: Request,
  res: TypedResponse<{ status: number; message: string }>,
  _next: NextFunction
) => {
  console.log(_err);
  res.json({ status: 500, message: "internal error" });
};

export default errorHandler;

import { Request, NextFunction } from "express";
import { getEmployee, getEmployees } from "../repositories/employees";
import {
  TypedResponse,
  QueryType,
  ResponseAPI,
} from "../interfaces/interfaces";

export const Employees = async (
  _req: Request,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "select">>,
  next: NextFunction
) => {
  try {
    res.send(await getEmployees());
  } catch (err) {
    next(err);
  }
};

export const Employee = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "selectLeftJoinWhere">>,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    res.send(await getEmployee(+id));
  } catch (err) {
    next(err);
  }
};

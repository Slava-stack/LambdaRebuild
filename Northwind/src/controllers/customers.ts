import { Request, NextFunction } from "express";
import { getCustomer, getCustomers } from "../repositories/customers";
import {
  TypedResponse,
  QueryType,
  ResponseAPI,
} from "../interfaces/interfaces";

export const Customers = async (
  _req: Request,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "select">>,
  next: NextFunction
) => {
  try {
    res.send(await getCustomers());
  } catch (err) {
    next(err);
  }
};

export const Customer = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "selectWhere">>,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    res.send(await getCustomer(id));
  } catch (err) {
    next(err);
  }
};

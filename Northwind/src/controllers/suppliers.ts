import { NextFunction, Request } from "express";
import { getSupplier, getSuppliers } from "../repositories/suppliers";
import {
  TypedResponse,
  QueryType,
  ResponseAPI,
} from "../interfaces/interfaces";

export const Suppliers = async (
  _req: Request,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "select">>,
  next: NextFunction
) => {
  try {
    res.send(await getSuppliers());
  } catch (err) {
    next(err);
  }
};

export const Supplier = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "selectWhere">>,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    res.send(await getSupplier(+id));
  } catch (err) {
    next(err);
  }
};

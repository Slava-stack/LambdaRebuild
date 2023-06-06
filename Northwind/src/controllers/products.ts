import { Request, NextFunction } from "express";
import { getProduct, getProducts } from "../repositories/products";
import {
  TypedResponse,
  QueryType,
  ResponseAPI,
} from "../interfaces/interfaces";

export const Products = async (
  _req: Request,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "select">>,
  next: NextFunction
) => {
  try {
    res.send(await getProducts());
  } catch (err) {
    next(err);
  }
};

export const Product = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "selectLeftJoinWhere">>,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    res.send(await getProduct(+id));
  } catch (err) {
    next(err);
  }
};

import { NextFunction, Request } from "express";
import { searchCustomers, searchProduct } from "../repositories/search";
import {
  SearchParam,
  TypedResponse,
  QueryType,
  ResponseAPI,
} from "../interfaces/interfaces";

export const Search = async (
  req: Request<SearchParam, {}, {}, {}>,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "selectWhere">>,
  next: NextFunction
): Promise<undefined | void> => {
  const { searchWord, type } = req.params;
  try {
    if (type === "Products") {
      res.send(await searchProduct(searchWord));
      return;
    }
    if (type === "Customers") {
      res.send(await searchCustomers(searchWord));
    }
  } catch (err) {
    next(err);
  }
};

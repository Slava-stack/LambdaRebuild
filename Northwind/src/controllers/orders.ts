import { NextFunction, Request } from "express";
import { getOrder, getOrders } from "../repositories/orders";
import {
  TypedResponse,
  QueryType,
  ResponseAPI,
} from "../interfaces/interfaces";

export const Orders = async (
  _req: Request,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "selectLeftJoin">>,
  next: NextFunction
) => {
  try {
    res.send(await getOrders());
  } catch (err) {
    next(err);
  }
};

export const Order = async (
  req: Request<{ id: string }, {}, {}, {}>,
  res: TypedResponse<ResponseAPI & Pick<QueryType, "selectLeftJoinWhere">>,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    res.send(await getOrder(+id));
  } catch (err) {
    next(err);
  }
};

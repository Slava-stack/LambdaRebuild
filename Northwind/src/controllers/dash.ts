import { NextFunction, Request, Response } from "express";
import getCountryCode from "../helpers/getCountryCode";
import getIATA from "../helpers/getIATA";
import { TypedResponse, CountryCode } from "../interfaces/interfaces";

export const Dash = async (
  req: Request,
  res: TypedResponse<CountryCode>,
  next: NextFunction
) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (ip && !Array.isArray(ip)) {
    try {
      const code = await getCountryCode(ip);
      if (code) {
        res.send({ countryCode: code, colo: await getIATA(code) });
      }
    } catch (err) {
      next(err);
    }
  }
};

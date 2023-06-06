import { Response } from "express";
import { Send } from "express-serve-static-core";

export interface IdUnknownParam {
  id: undefined | string;
}

export interface SearchParam {
  searchWord: string;
  type: string;
}

export interface SearchUnknownParam {
  searchWord: undefined | string;
  type: undefined | string;
}

export interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

export interface CountryCode {
  countryCode: string;
  colo: Promise<string>;
}

interface Logging {
  productQuery: string;
  ts: Date;
  duration: number;
}

export interface QueryType {
  select: number;
  selectWhere: number;
  selectLeftJoin: number;
  selectLeftJoinWhere: number;
}

export interface ResponseAPI {
  result: any;
  log: Logging[];
  queries: number;
  results: any;
}

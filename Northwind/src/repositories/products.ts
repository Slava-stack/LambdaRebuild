import { createConnection } from "mysql2/promise";
import conf from "./config/config";
import queryTimeExecution from "./queryTimeExecution";
import queries from "./queries/queries";

export async function getProducts() {
  const connection = await createConnection(conf);
  const { productsQuery } = queries;
  const output = await queryTimeExecution(connection, productsQuery);
  await connection.end();
  return {
    result: output.result,
    log: [{ query: productsQuery, ts: new Date(), duration: output.duration }],
    queries: 1,
    results: output.result.length,
    select: 1,
  };
}

export async function getProduct(id: number) {
  const connection = await createConnection(conf);
  const { productQuery } = queries;
  const output = await queryTimeExecution(connection, productQuery, [id]);
  await connection.end();
  return {
    result: output.result[0],
    log: [{ query: productQuery, ts: new Date(), duration: output.duration }],
    queries: 1,
    results: output.result[0].length,
    selectLeftJoinWhere: 1,
  };
}

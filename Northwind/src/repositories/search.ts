import { createConnection } from "mysql2/promise";
import conf from "./config/config";
import queryTimeExecution from "./queryTimeExecution";
import queries from "./queries/queries";

export async function searchProduct(product: string) {
  const connection = await createConnection(conf);
  const { searchProductsQuery } = queries;
  const output = await queryTimeExecution(connection, searchProductsQuery, [
    product,
  ]);
  await connection.end();
  return {
    result: output.result[0],
    log: [
      { query: searchProductsQuery, ts: new Date(), duration: output.duration },
    ],
    queries: 1,
    results: output.result[0].length,
    selectWhere: 1,
  };
}

export async function searchCustomers(product: string) {
  const connection = await createConnection(conf);
  const { searchCustomersQuery } = queries;
  const output = await queryTimeExecution(connection, searchCustomersQuery, [
    product,
  ]);
  await connection.end();
  return {
    result: output.result[0],
    log: [
      {
        query: searchCustomersQuery,
        ts: new Date(),
        duration: output.duration,
      },
    ],
    queries: 1,
    results: output.result[0].length,
    selectWhere: 1,
  };
}

import { createConnection } from "mysql2/promise";
import conf from "./config/config";
import queryTimeExecution from "./queryTimeExecution";
import queries from "./queries/queries";

export async function getSuppliers() {
  const connection = await createConnection(conf);
  const { suppliersQuery } = queries;
  const output = await queryTimeExecution(connection, suppliersQuery);
  await connection.end();
  return {
    result: output.result,
    log: [
      {
        query: suppliersQuery,
        ts: new Date(),
        duration: output.duration,
      },
    ],
    queries: 1,
    results: output.result.length,
    select: 1,
  };
}

export async function getSupplier(id: number) {
  const connection = await createConnection(conf);
  const { supplierQuery } = queries;
  const output = await queryTimeExecution(connection, supplierQuery, [id]);
  await connection.end();
  return {
    result: output.result[0],
    log: [{ query: supplierQuery, ts: new Date(), duration: output.duration }],
    queries: 1,
    results: output.result[0].length,
    selectWhere: 1,
  };
}

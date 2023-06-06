import { createConnection } from "mysql2/promise";
import conf from "./config/config";
import queryTimeExecution from "./queryTimeExecution";
import queries from "./queries/queries";

export async function getCustomers() {
  const connection = await createConnection(conf);
  const { customersQuery } = queries;
  const output = await queryTimeExecution(connection, customersQuery);
  await connection.end();
  return {
    result: output.result,
    log: [{ query: customersQuery, ts: new Date(), duration: output.duration }],
    queries: 1,
    results: output.result.length,
    select: 1,
  };
}

export async function getCustomer(id: string) {
  const connection = await createConnection(conf);
  const { customerQuery } = queries;
  const output = await queryTimeExecution(connection, customerQuery, [id]);
  await connection.end();
  return {
    result: output.result[0],
    log: [{ query: customerQuery, ts: new Date(), duration: output.duration }],
    queries: 1,
    results: output.result[0].length,
    selectWhere: 1,
  };
}

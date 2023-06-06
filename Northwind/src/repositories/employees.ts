import { createConnection } from "mysql2/promise";
import conf from "./config/config";
import queryTimeExecution from "./queryTimeExecution";
import queries from "./queries/queries";

export async function getEmployees() {
  const connection = await createConnection(conf);
  const { employeesQuery } = queries;
  const output = await queryTimeExecution(connection, employeesQuery);
  await connection.end();
  return {
    result: output.result,
    log: [{ query: employeesQuery, ts: new Date(), duration: output.duration }],
    queries: 1,
    results: output.result.length,
    select: 1,
  };
}

export async function getEmployee(id: number) {
  const connection = await createConnection(conf);
  const { employeeQuery } = queries;
  const output = await queryTimeExecution(connection, employeeQuery, [id]);
  await connection.end();
  return {
    result: output.result[0],
    log: [{ query: employeeQuery, ts: new Date(), duration: output.duration }],
    queries: 1,
    results: output.result[0].length,
    selectLeftJoinWhere: 1,
  };
}

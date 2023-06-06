import { Connection } from "mysql2/promise";

async function queryTimeExecution<T>(
  connection: Connection,
  query: string,
  args?: T[]
) {
  if (args) {
    const start = new Date().getTime();
    const result: any[] = await connection.query(query, args);
    const end = new Date().getTime();
    return { duration: end - start, result };
  } else {
    const start = new Date().getTime();
    const result: any[] = await connection.query(query);
    const end = new Date().getTime();
    return { duration: end - start, result: result[0] };
  }
}

export default queryTimeExecution;

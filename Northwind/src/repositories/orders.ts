import { createConnection } from "mysql2/promise";
import conf from "./config/config";
import queryTimeExecution from "./queryTimeExecution";
import queries from "./queries/queries";

export async function getOrders() {
  const connection = await createConnection(conf);
  const { ordersQuery } = queries;
  const output = await queryTimeExecution(connection, ordersQuery);
  await connection.end();
  return {
    result: output.result,
    log: [{ query: ordersQuery, ts: new Date(), duration: output.duration }],
    queries: 1,
    results: output.result.length,
    selectLeftJoin: 1,
  };
}

export async function getOrder(id: number) {
  const connection = await createConnection(conf);
  const { orderQuery1 } = queries;
  const output1 = await queryTimeExecution(connection, orderQuery1, [id]);
  const { orderQuery2 } = queries;

  const output2 = await queryTimeExecution(connection, orderQuery2, [id]);
  await connection.end();
  return {
    result: {
      OrderInformation: output1.result[0],
      ProductsInOrder: output2.result[0],
    },
    log: [
      { query: orderQuery1, ts: new Date(), duration: output1.duration },
      { query: orderQuery2, ts: new Date(), duration: output2.duration },
    ],
    queries: 2,
    results: output1.result[0].length + output2.result[0].length,
    selectLeftJoinWhere: 3,
  };
}

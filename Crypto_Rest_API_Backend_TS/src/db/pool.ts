import mysql from "mysql";
import { config } from "dotenv";

config({ path: "./.env" });

const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

export default pool;

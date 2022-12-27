const express = require("express");
const { MongoClient } = require("mongodb");
const authRouter = require("./authRouter");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/", authRouter);

const start = async () => {
  try {
    await client.connect();
    app.listen(PORT, () => console.log("server has been started"));
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
};

start();

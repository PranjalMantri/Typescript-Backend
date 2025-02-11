import express from "express";
import config from "config";
import connectDb from "./utils/connect";

const app = express();

const port = config.get<number>("port");

app.listen(port, async () => {
  console.log(`Server running on port: ${port}`);

  await connectDb();
});

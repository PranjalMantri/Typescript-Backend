import express from "express";
import config from "config";
import connectDb from "./utils/connect";
import logger from "./utils/logger";

const app = express();

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Server running on port: ${port}`);

  await connectDb();
});

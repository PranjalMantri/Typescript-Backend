import express from "express";
import config from "config";
import connectDb from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const app = express();

app.use(express.json());

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Server running on port: ${port}`);

  await connectDb();

  routes(app);
});

import express from "express";
import config from "config";
import connectDb from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

import { deserializeUser } from "./middleware/deserialize";

const app = express();

app.use(express.json());
app.use(deserializeUser);

const port = config.get<number>("port");

app.listen(port, async () => {
  logger.info(`Server running on port: ${port}`);

  await connectDb();

  routes(app);
});

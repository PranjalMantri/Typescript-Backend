import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

async function connectDb(): Promise<void> {
  const dbURI = config.get<string>("dbURI");

  try {
    await mongoose.connect(dbURI);
    logger.info("Connected to the database");
  } catch (error) {
    logger.error(
      "Something went wrong while connecting to the database",
      error
    );
    process.exit(1);
  }
}

export default connectDb;

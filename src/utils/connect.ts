import mongoose from "mongoose";
import config from "config";

async function connectDb(): Promise<void> {
  const dbURI = config.get<string>("dbURI");

  try {
    await mongoose.connect(dbURI);
    console.log("Connected to the database");
  } catch (error) {
    console.error(
      "Something went wrong while connecting to the database",
      error
    );
    process.exit(1);
  }
}

export default connectDb;

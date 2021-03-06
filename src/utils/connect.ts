import mongoose from "mongoose";
import config from "config";
import log from "../logger";

const connect = async () => {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    log.info("DB connected");
  } catch (error) {
    log.error("Could not connect to db", error);
    process.exit(1);
  }
};

export default connect;

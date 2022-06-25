import express from "express";
import config from "config";
import log from "./logger";
import connect from "./utils/connect";
// route
import { route as healthCheckRoutes } from "./routes/healthCheckRoutes";
import { route as userRoutes } from "./routes/userRoutes";
import { route as sessionRoutes } from "./routes/sessionRoutes";

const port = config.get<number>("port");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/health", healthCheckRoutes);
app.use("/api/user", userRoutes);
app.use("/api/session", sessionRoutes);

app.listen(port, async () => {
  log.info(`🚀 Server is running on http://localhost:${port}`);
  await connect();
});

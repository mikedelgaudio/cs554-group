import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import { redisClient } from "./config/redisClient";
import { configRoutes } from "./routes";

dotenv.config();

const app: Express = express();
app.use(cors()); // Must allow-list only the FE / domain
app.use(express.json());
app.use(helmet());
const PORT = process.env?.PORT ?? 3001;

configRoutes(app);

app.listen(PORT, async () => {
  // Test connection to MongoDB and Redis
  try {
    await redisClient.connect();
  } catch (e) {
    console.error("[REDIS] Error - Unable to connect to Redis");
  }

  console.log(`[EXPRESS] Running on port: ${PORT}`);
});

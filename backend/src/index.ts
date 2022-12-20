import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import helmet from "helmet";
import { redisClient } from "./config/redisClient";
import { configRoutes } from "./routes";

dotenv.config();

const app: Express = express();
const whitelist = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://cs554.eastus.azurecontainer.io",
];
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
const PORT = process.env?.PORT ?? 3001;

configRoutes(app);

app.listen(PORT, async () => {
  // Test connection to MongoDB and Redi
  try {
    await redisClient.connect();
    // eslint-disable-next-line no-console
    console.log("[REDIS] Successful connection.");
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[REDIS] Error - Unable to connect to Redis");
  }
  // eslint-disable-next-line no-console
  console.log(`[EXPRESS] Successful running on port: ${PORT}`);
});

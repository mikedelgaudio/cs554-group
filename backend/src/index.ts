import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import helmet from "helmet";

dotenv.config();

const app: Express = express();
app.use(cors()); // Must allow-list only the FE / domain
app.use(express.json());
app.use(helmet());
const port = process.env?.PORT ?? 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is runnings on PORT:${port}`);
});

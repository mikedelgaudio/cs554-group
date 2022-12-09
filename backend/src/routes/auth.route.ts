import express, { Request, Response, Router } from "express";

export const authRouter: Router = express.Router();

authRouter.post("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

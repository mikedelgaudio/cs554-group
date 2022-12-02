import { Express, Request, Response } from "express";
import { authRouter } from "./auth.route";
import { usersRouter } from "./users.route";


export const configRoutes = (app: Express) => {
  app.use("/auth", authRouter);
  app.use("/users", usersRouter)
  app.use("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "Route not found" });
  });
};

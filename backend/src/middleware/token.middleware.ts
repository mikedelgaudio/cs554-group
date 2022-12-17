import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase.admin";

export interface IAuthReq extends Request {
  headers: any;
}

export const checkAuth = async (
  req: IAuthReq,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.token) return;
  try {
    const token = req.headers.token;
    const { decodedToken } = await admin.auth().verifyIdToken(token);
    console.log(decodedToken.uid);
    next();
  } catch (e) {
    res.status(403).json("Unauthorized");
  }
};

const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
import express, { Request, Response, Router } from "express";
let data = require("../data/users");

export const usersRouter: Router = express.Router();

usersRouter.post("/register", async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;
    console.log(typeof username);
    console.log(typeof email);
    console.log(typeof password);
    //console.log(username, email, password);
  } catch (e) {}
});
usersRouter.post("/register", async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;
    console.log(typeof username);
    console.log(typeof email);
    console.log(typeof password);
    //console.log(username, email, password);

    let answer = await data.createUser(username, email, password);
    //console.log(answer.username);
    res.json(answer);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

usersRouter.get("/profile/:id", async (req: Request, res: Response) => {
  let id = req.params.id;
  console.log("getUser route");
  try {
    let users = await data.getOneUser(id);
    res.json(users);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});
usersRouter.delete("/profile/:id", async (req: Request, res: Response) => {
  let id = req.params.id;
  console.log("getUser route");
  try {
    let users = await data.deleteOneUser(id);
    res.json(users);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

usersRouter.get("/favorited/:id", async (req: Request, res: Response) => {
  let id = req.params.id;
  let favorites;
  try {
    favorites = await data.getFavoritedUsers(id);
    console.log(favorites);
    res.json(favorites);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});
usersRouter.post("/:username/editUser", async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;

    //console.log(username, email, password);

    let answer = await data.createUser(username, email, password);
    //console.log(answer.username);
    res.json(answer);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    let users = await data.getAllUsers();
    return res.json(users);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

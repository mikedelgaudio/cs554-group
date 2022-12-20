import express, { Request, Response, Router } from "express";
import {
  SocialMediaItem,
  User,
  UserDislikeItem,
  UserLikeItem,
} from "../data/interfaces";
import { checkAuth } from "../middleware/token.middleware";
const data = require("../data/users");

export const usersRouter: Router = express.Router();

function isAUserDislikeItem(obj: any): obj is UserDislikeItem {
  return "name" in obj;
}
function isAUserLikeItem(obj: any): obj is UserLikeItem {
  return "name" in obj;
}
function isASocialMediaItem(obj: any): obj is SocialMediaItem {
  return "profileURL" in obj;
}
usersRouter.post("/register", async (req: Request, res: Response) => {
  if (!req.body.username || typeof req.body.username !== "string") {
    throw "add username as a parameter";
  }
  if (!req.body.email || typeof req.body.email !== "string") {
    throw "add email as a parameter";
  }
  if (!req.body.firstName || typeof req.body.lastName !== "string") {
    throw "add firstName as a parameter";
  }
  if (!req.body.lastName || typeof req.body.lastName !== "string") {
    throw "add lastName as a parameter";
  }
  if (!req.body.firebaseUid || typeof req.body.firebaseUid !== "string") {
    throw "add uid as a parameter";
  }
  try {
    const { username, email, firstName, lastName, firebaseUid } = req.body;
    const response = await data.createUser(
      username,
      email,
      firstName,
      lastName,
      firebaseUid,
    );
    res.json(response);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

usersRouter.get(
  "/profile/:firebaseUid",
  async (req: Request, res: Response) => {
    if (!req.params.firebaseUid || typeof req.params.firebaseUid !== "string") {
      throw "add uid as a parameter";
    }
    const firebaseUid = req.params.firebaseUid;
    try {
      const users = await data.getOneUser(firebaseUid);
      res.json(users);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  },
);

// No plans for this
// usersRouter.delete("/profile/:id", async (req: Request, res: Response) => {
//   let id = req.params.id;
//   console.log("getUser route");
//   try {
//     let users = await data.deleteOneUser(id);
//     res.json(users);
//   } catch (e) {
//     res.status(404).json({ error: e });
//   }
// });

usersRouter.get(
  "/favorited/:firebaseUid",
  checkAuth,
  async (req: Request, res: Response) => {
    if (!req.params.firebaseUid || typeof req.params.firebaseUid !== "string") {
      throw "add uid as a parameter";
    }
    const firebaseUid = req.params.firebaseUid;
    let favorites;
    try {
      let objArr: User[] = [];
      favorites = await data.getFavoritedUsers(firebaseUid);
      for (let i = 0; i < favorites.length; i++) {
        objArr.push(await data.getOneUser(favorites[i]));
      }
      res.json(objArr);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  },
);

usersRouter.post(
  "/:firebaseUid/editUser",
  checkAuth,
  async (req: Request, res: Response) => {
    if (!req.params.firebaseUid || typeof req.params.firebaseUid !== "string") {
      throw "add uid as a parameter";
    }
    try {
      const firebaseUid = req.params.firebaseUid;

      const userObj = {} as User;

      if (req.body.username) {
        if (typeof req.body.username != "string" || !req.body.username) {
          return res
            .status(400)
            .json({ error: "Updated username must be a valid string" });
        } else {
          userObj.username = req.body.username;
        }
      }
      if (req.body.firstName) {
        if (typeof req.body.firstName != "string" || !req.body.firstName) {
          return res
            .status(400)
            .json({ error: "Updated first name must be a valid string" });
        } else {
          userObj.firstName = req.body.firstName;
        }
      }
      if (req.body.lastName) {
        if (typeof req.body.lastName != "string" || !req.body.lastName) {
          return res
            .status(400)
            .json({ error: "Updated last name must be a valid string" });
        } else {
          userObj.lastName = req.body.lastName;
        }
      }
      if (req.body.profileImage) {
        if (
          typeof req.body.profileImage != "string" ||
          !req.body.profileImage
        ) {
          return res
            .status(400)
            .json({ error: "Updated profile image must be a valid string" });
        } else {
          userObj.profileImage = req.body.profileImage;
        }
      }

      if (req.body.resume) {
        if (typeof req.body.resume != "string" || !req.body.resume) {
          return res.status(400).json({ error: "Resume be a valid string" });
        } else {
          userObj.resume = req.body.resume;
        }
      }
      if (req.body.contactInfo) {
        const contactFields = ["phoneNumber", "email", "website", "occupation"];

        for (const [k, v] of Object.entries(req.body.contactInfo)) {
          if (!contactFields.includes(k)) {
            return res.status(400).json({
              error:
                "Contact Field must be either phone number, email, website, or occupation",
            });
          }
          if (typeof v != "string") {
            return res
              .status(400)
              .json({ error: "Contact Info must be string" });
          }
        }
        userObj.contactInfo = req.body.contactInfo;
      }
      if (req.body.socialMedia) {
        if (!Array.isArray(req.body.socialMedia)) {
          return res
            .status(400)
            .json({ error: "Updated social medias must be a valid array" });
        } else {
          for (let i = 0; i < req.body.socialMedia.length; i++) {
            if (!isASocialMediaItem(req.body.socialMedia[i])) {
              return res
                .status(400)
                .json({ error: "Social medias in array must be valid type" });
            }
          }
          userObj.socialMedia = req.body.socialMedia;
        }
      }
      if (req.body.likes) {
        if (!Array.isArray(req.body.likes)) {
          return res
            .status(400)
            .json({ error: "Updated Likes must be a valid array" });
        } else {
          for (let i = 0; i < req.body.likes.length; i++) {
            if (!isAUserLikeItem(req.body.likes[i])) {
              return res
                .status(400)
                .json({ error: "Likes in array must be valid type" });
            }
          }
          userObj.likes = req.body.likes;
        }
      }
      if (req.body.dislikes) {
        if (!Array.isArray(req.body.dislikes)) {
          return res
            .status(400)
            .json({ error: "Updated dislikes must be a valid array" });
        } else {
          for (let i = 0; i < req.body.dislikes.length; i++) {
            if (!isAUserDislikeItem(req.body.dislikes[i])) {
              return res
                .status(400)
                .json({ error: "Dislikes in array must be valid type" });
            }
          }
          userObj.dislikes = req.body.dislikes;
        }
      }
      if (req.body.favoritedUsers) {
        if (!Array.isArray(req.body.favoritedUsers)) {
          return res
            .status(400)
            .json({ error: "Updated favorites must be a valid array" });
        } else {
          for (let i = 0; i < req.body.favoritedUsers; i++) {
            if (typeof req.body.favoritedUsers[i] != "string") {
              return res
                .status(400)
                .json({ error: "Favorite values in array must be a strings" });
            }
          }
          userObj.favoritedUsers = req.body.favoritedUsers;
        }
      }

      const answer = await data.patchUser(userObj, firebaseUid);

      return res.json(answer);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  },
);

usersRouter.get("/:firebaseUid", async (req: Request, res: Response) => {
  if (!req.params.firebaseUid || typeof req.params.firebaseUid !== "string") {
    throw "add uid as a parameter";
  }
  try {
    const users = await data.getAllUsers(req.params.firebaseUid);
    return res.json(users);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

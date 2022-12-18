const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
import { checkAuth } from "../middleware/token.middleware";
import express, { Request, Response, Router } from "express";
import { User, UserDislikeItem, UserLikeItem, SocialMediaItem } from "../data/interfaces";
let data = require("../data/users");

export const usersRouter: Router = express.Router();

function isAUserDislikeItem(obj: any): obj is UserDislikeItem {
    return 'id' in obj && 'name' in obj;
  }
  function isAUserLikeItem(obj: any): obj is UserLikeItem {
    return 'id' in obj && 'name' in obj;
  }
  function isASocialMediaItem(obj: any): obj is SocialMediaItem {
    return 'profileURL' in obj && 'id' in obj;
  }
usersRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, firstName, lastName, firebaseUid } = req.body;
    const response = await data.createUser(
      username,
      email,
      firstName,
      lastName,
      firebaseUid
    );
    res.json(response);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

usersRouter.get(
  "/profile/:firebaseUid",
  async (req: Request, res: Response) => {
    const firebaseUid = req.params.firebaseUid;
    try {
      let users = await data.getOneUser(firebaseUid);
      res.json(users);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  }
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
    let firebaseUid = req.params.firebaseUid;
    let favorites;
    try {
      favorites = await data.getFavoritedUsers(firebaseUid);
      res.json(favorites);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
  }
);

usersRouter.post(
  "/:firebaseUid/editUser",
  checkAuth,
  async (req: Request, res: Response) => {
    try {
      let firebaseUid = req.params.firebaseUid;

      //console.log(username, email, password);
      let userObj = {} as User;

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
      if (req.body.contactInfo) {
        let contactFields = [
          "phoneNumber",
          "email",
          "website",
          "occupation",
        ];

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
          console.log("EDSD")
            for(let i = 0; i<req.body.socialMedia.length; i++){
              console.log("SDF")
                if(!isASocialMediaItem(req.body.socialMedia[i])){
                    return res
                    .status(400)
                    .json({ error: "Social medias in array must be valid type" });                    }
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
            for(let i = 0; i<req.body.likes.length; i++){
                if(!isAUserLikeItem(req.body.likes[i])){
                    return res
                    .status(400)
                    .json({ error: "Likes in array must be valid type" });                    }
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
            for(let i = 0; i<req.body.dislikes.length; i++){
                if(!isAUserDislikeItem(req.body.dislikes[i])){
                    return res
                    .status(400)
                    .json({ error: "Dislikes in array must be valid type" });                    }
                }
                userObj.dislikes = req.body.dislikes;  
        }
      }
      let answer = await data.patchUser(userObj, firebaseUid);
  
      return res.json(answer);
    } catch (e) {
      return res.status(404).json({ error: e });
    }
  }
);

usersRouter.get("/", async (req: Request, res: Response) => {
  try {
    let users = await data.getAllUsers();
    return res.json(users);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

/* 

/auth/register -> createa user:

{
	_id: "507f1f77bcf86cd799439011",
	username: “mikeydellWooHoo”,
	password: ################, ← hashed value
	firstName: “Mike”,
	lastName: “Dell”,
	profileImage:  
	contactInfo: {
				phoneNumber: “201-204-2482”,
				email: “blahblah@gmail.com”,
				personalWebsite: “hoboken.com”
				currentRole: “Senior CS Major”
            }, 
	socialMedia: [
        {
            _id: “12497c4c-b923-422f-98bb-801f8bd737ba”, 
            profileURL: “https://twitter.com/CityofHoboken”
        }
    ],
    likes: [
        {
            _id: “7e13b59d-18b0-439f-ac68-2d6bfed7ee72”, 
            like: “Swimming”
        },
        {
            _id: “7e13b59d-18b0-439f-ac68-2d6bfed7ee71”, 
            like: Running
        }, 
    ],
    dislikes: [
        {
            _id: "5349b4ddd2781d08c09890f3",
            dislike: “Running”
        }, 
    ],
    favortiedUsers: [“507f1f77bcf86cd799439011”] 
}


*/

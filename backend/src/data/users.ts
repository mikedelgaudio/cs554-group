import { connectToDb } from "../config/mongoConnection";
import { redisClient } from "../config/redisClient";
import {
  SocialMediaItem,
  User,
  UserDislikeItem,
  UserLikeItem,
} from "./interfaces";
// @ts-ignore
const validator = require('validator');
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");


function isAUserDislikeItem(obj: any): obj is UserDislikeItem {
  return "name" in obj;
}
function isAUserLikeItem(obj: any): obj is UserLikeItem {
  return "name" in obj;
}
function isASocialMediaItem(obj: any): obj is SocialMediaItem {
  return "profileURL" in obj;
}

module.exports = {
  isASocialMediaItem,
  isAUserDislikeItem,
  isAUserLikeItem,

  async createUser(
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    firebaseUid: string,
  ) {
    username = username.toLowerCase();
    if (!username || !email || !firstName || !lastName || !firebaseUid) {
      throw "bad inputs";
    }
    let userCollection = await users();
    const userList = await userCollection
      .find({ username: username })
      .toArray();
    if (userList.length > 0) {
      throw "that username is already in use";
    }
    let newUser: User = {
      _id: new ObjectId(),
      firebaseUid,
      username,
      firstName,
      lastName,
      profileImage: "",
      contactInfo: { email: email },
      socialMedia: [],
      likes: [],
      dislikes: [],
      favoritedUsers: [],
      resume: "",
    };
    console.log(newUser);
    let newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount == 0) {
      throw "this didn't work";
    } else {
      let hashing = JSON.stringify(newUser);
      await redisClient.set("User" + newUser.firebaseUid, hashing);
      let allUsers = await redisClient.lRange("allUsers", 0, -1);
      if (!allUsers) {
        try {
          await redisClient.lPush("allUsers", hashing);
          console.log("addedUserList");
        } catch (e) {
          throw "Reddis not adding";
        }
      } else {
        try {
          await redisClient.lPush("allUsers", hashing);
          console.log("pushed more in");
        } catch (e) {
          throw "Reddis not adding";
        }
      }
      return newUser;
    }
  },

  async getAllUsers(firebaseUid: string) {
    const filterCurrentUser = (users: User[]) => {
      return users?.filter((user: User) => user.firebaseUid !== firebaseUid);
    };

    try {
      const allUsers = await redisClient.lRange("allUsers", 0, -1);
      if (allUsers.length > 0) {
        return filterCurrentUser(allUsers.map(x => JSON.parse(x)));
      }
    } catch (e) {
      throw "error with reddis";
    }

    try {
      let userCollection = await users();
      let userList: User[] = await userCollection.find().toArray();

      for (let i = 0; i < userList.length; i++) {
        await redisClient.lPush("allUsers", JSON.stringify(userList[i]));
      }

      return filterCurrentUser(userList);
    } catch (e) {
      throw "Could not get users.";
    }
  },

  async getOneUser(firebaseUid: string) {
    let holder;
    try {
      holder = await redisClient.get("User" + firebaseUid);
    } catch (e) {
      throw e;
    }
    if (holder) {
      holder = JSON.parse(holder);
      return holder;
    } else {
      try {
        let userCollection = await users();
        let userList = await userCollection.findOne({
          firebaseUid: firebaseUid,
        });
        await redisClient.set("User" + firebaseUid, JSON.stringify(userList));

        return userList;
      } catch (e) {
        throw new Error("Could not get user.");
      }
    }
  },

  // No plans for this
  // async deleteOneUser(id: string) {
  //   try {
  //     let userCollection = await users();
  //     id = ObjectId(id);
  //     let deletedUser = await userCollection.deleteOne({ _id: id });
  //     if (deletedUser.deletedCount != 1) {
  //       throw new Error("could not delete user");
  //     } else {
  //       return true;
  //     }
  //   } catch (e) {
  //     throw new Error("Could not get user.");
  //   }
  // },

  async getFavoritedUsers(firebaseUid: string) {
    let cached = await redisClient.lRange("favorite" + firebaseUid, 0, -1);
    if (cached) {
      console.log("getfy, ", cached);
      return cached;
    } else {
      try {
        let userCollection = await users();
        let userList = await userCollection.findOne({
          firebaseUid: firebaseUid,
        });
        let favoriteArr = userList.favoritedUsers;
        for (let i = 0; i < favoriteArr.length; i++) {
          await redisClient.lPush("favorite" + firebaseUid, favoriteArr[i]);
        }
        return favoriteArr;
      } catch (e) {
        throw new Error("Could not get favorited users.");
      }
    }
  },

  async patchUser(user: User, firebaseUid: string) {
    const userObj = {} as User;
    let holder = await redisClient.get("User" + firebaseUid);
    if (holder) {
      holder = JSON.parse(holder);
    }

    if (user.username) {
      userObj.username = user.username;
    }

    if (user.firstName) {
      userObj.firstName = user.firstName;
    }

    if (user.lastName) {
      userObj.lastName = user.lastName;
    }
    if (user.profileImage) {

      if (!((user.profileImage.includes("http://") || user.profileImage.includes("https://")) && validator.isURL(user.profileImage)))
      {
        throw "Please enter a valid link for images."
      }
      userObj.profileImage = user.profileImage;
    }
    if (user.contactInfo) {
      console.log("getting here");
      if (user.contactInfo.website && ((!user.contactInfo.website.includes("http://") && !(user.contactInfo.website.includes("https://")) || !validator.isURL(user.contactInfo.website)))) {
        console.log("please break")
        throw "Please enter a valid website";
      }
      if (user.contactInfo.email && !validator.isEmail(user.contactInfo.email)) {
        throw "Please enter a valid email";
      }
       userObj.contactInfo = user.contactInfo;
    }
    if (user.resume) {
      if (!((user.resume.includes("http://") || user.resume.includes("https://")) && validator.isURL(user.resume))) {
            throw "pleae enter a valid link for your resume"
          }
      userObj.resume = user.resume;
    }
    if (user.socialMedia) {
      if (Array.isArray(user.socialMedia)) {
        for (let i = 0; i < user.socialMedia.length; i++) {
          if (!isASocialMediaItem(user.socialMedia[i])) {
            throw new Error("Not a valid Social Media Item");
          }
          if (!user.socialMedia[i]["id"]) {
            user.socialMedia[i]["id"] = ObjectId();
          }
          console.log("HERE I AM");
          console.log(validator.isURL(user.socialMedia[i]["profileURL"]));
          if (!((user.socialMedia[i]["profileURL"].includes("http://") || user.socialMedia[i]["profileURL"].includes("https://")) && validator.isURL(user.socialMedia[i]["profileURL"]))) {
            console.log("HALP");
            throw "please enter a valid link"
          }
          for (let j = i+1; j < user.socialMedia.length; j++) {
            if (user.socialMedia[i]["profileURL"] === user.socialMedia[j]["profileURL"]){
              throw "no duplicate items allowed";
            }
          }
        }
        userObj.socialMedia = user.socialMedia;
      } else {
        throw new Error("Must be Social Media Array");
      }
    }

    if (user.likes) {
      if (Array.isArray(user.likes)) {
        for (let i = 0; i < user.likes.length; i++) {
          if (!isAUserLikeItem(user.likes[i])) {
            throw new Error("Not a valid Like Item");
          }
          if (!user.likes[i]["id"]) {
            user.likes[i]["id"] = ObjectId();
          }
          for (let j = i+1; j < user.likes.length; j++) {
            if (user.likes[j]["name"].toLowerCase() == user.likes[i]["name"].toLowerCase()) {
              console.log(user.likes[j]);
              throw "please enter a unique like"
            }
          }
        }
        userObj.likes = user.likes;
      } else {
        throw new Error("Must be Likes Array");
      }
    }
    if (user.dislikes) {
      if (Array.isArray(user.dislikes)) {
        for (let i = 0; i < user.dislikes.length; i++) {
          if (!isAUserDislikeItem(user.dislikes[i])) {
            throw new Error("Not a valid DislikeItem");
          }

          if (!user.dislikes[i]["id"]) {
            user.dislikes[i]["id"] = ObjectId();
          }
          for (let j = i+1; j < user.dislikes.length; j++) {
            if (user.dislikes[j]["name"].toLowerCase() == user.dislikes[i]["name"].toLowerCase()) {
              throw "please enter a unique dislike"
            }
          }
        }
        userObj.dislikes = user.dislikes;
      } else {
        throw new Error("Must be Likes Array");
      }
    }

    if (user.favoritedUsers) {
      console.log("DO I REACH HERE?");
      console.log(user.favoritedUsers);
      if (!Array.isArray(user.favoritedUsers)) {
        throw "Updated favorites must be a valid array";
      } else {
        for (let i = 0; i < user.favoritedUsers.length; i++) {
          if (typeof user.favoritedUsers[i] != "string") {
            throw "Favorite values in array must be a strings";
          }
        }

        let oldArr = await redisClient.lRange("favorite" + firebaseUid, 0, -1);
        console.log("THIS IS CURRENT FAVORITES");
        console.log("oldArr: ", oldArr);
        if (oldArr) {
          console.log("eee");
          let favName = "favorite" + firebaseUid;
          if (oldArr.includes(user.favoritedUsers[0])) {
            await redisClient.lRem(favName, 0, user.favoritedUsers[0]);
            let index = oldArr.indexOf(user.favoritedUsers[0]);
            if (index !== -1) {
              oldArr.splice(index, 1);
            }
          } else {
            console.log(user.favoritedUsers[0]);
            await redisClient.lPush(favName, user.favoritedUsers[0]);
            console.log(favName);
            oldArr.push(user.favoritedUsers[0]);
          }
          userObj.favoritedUsers = oldArr;
        } else {
          let getOldUser = await this.getOneUser(firebaseUid);
          let oldFavoritedMongo = getOldUser.favoritedUsers;
          if (oldFavoritedMongo.includes(user.favoritedUsers[0])) {
            let index = oldFavoritedMongo.indexOf(user.favoritedUsers[0]);
            if (index !== -1) {
              oldFavoritedMongo.splice(index, 1);
            }
          } else {
            oldFavoritedMongo.push(user.favoritedUsers[0]);
          }
          for (let i = 0; i < oldFavoritedMongo.length; i++) {
            await redisClient.lPush(
              "favorite" + firebaseUid,
              oldFavoritedMongo[i],
            );
          }
          userObj.favoritedUsers = oldFavoritedMongo;
        }
      }
    }

    if (holder) {
      //Reisbackend updates
      let newRedisHolder = JSON.stringify(Object.assign(holder, userObj));
      await redisClient.set("User" + firebaseUid, newRedisHolder);
    }

    let allUsers = await redisClient.lRange("allUsers", 0, -1);
    if (allUsers) {
      for (let i = 0; i < allUsers.length; i++) {
        let temp: User = JSON.parse(allUsers[i]);
        if (temp["firebaseUid"] === firebaseUid) {
          await redisClient.lRem("allUsers", 0, allUsers[i]);
          let updatedAllUserObj = JSON.stringify(Object.assign(temp, userObj));
          await redisClient.lPush("allUsers", updatedAllUserObj);
        }
      }
    }

    let userCollection = await users();

    const updateUser = await userCollection.updateOne(
      { firebaseUid: firebaseUid },
      { $set: userObj },
    );
    return await this.getOneUser(firebaseUid);
  },
};

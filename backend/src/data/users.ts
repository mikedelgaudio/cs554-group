import { UserImportBuilder } from "firebase-admin/lib/auth/user-import-builder";
import { redisClient } from "../config/redisClient";
import {
  User,
  UserDislikeItem,
  UserLikeItem,
  SocialMediaItem,
} from "./interfaces";
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

function isAUserDislikeItem(obj: any): obj is UserDislikeItem {
  return 'name' in obj;
}
function isAUserLikeItem(obj: any): obj is UserLikeItem {
  return 'name' in obj;
}
function isASocialMediaItem(obj: any): obj is SocialMediaItem {
  return 'profileURL' in obj;
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
    let allUsers = [] as any[];
    try {
      allUsers = await redisClient.lRange("allUsers", 0, -1);
    } catch (e) {
      throw "error with reddis";
    }
    if (allUsers.length) {
      allUsers = allUsers.map(x => JSON.parse(x));
      let notCurrent = allUsers.filter(x => {
        return x.firebaseUid != firebaseUid;
      });
      console.log(notCurrent);
      return notCurrent;
    }

    try {
      let userCollection = await users();
      let userList: User[] = await userCollection.find().toArray();
      userList.map(x => redisClient.lPush("allUsers", JSON.stringify(x)));
      return userList;
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
        await redisClient.set("User"+firebaseUid, JSON.stringify(userList));
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
    let cached = await redisClient.lRange("favorite" + firebaseUid.toString(), 0, -1);
    if (cached) {
      console.log(cached);
      return cached;
    }else{
      try {
        let userCollection = await users();
        let userList = await userCollection.findOne({ firebaseUid: firebaseUid });
        let favoriteArr = userList.favoritedUsers;
        for(let i = 0; i<favoriteArr.length; i++){
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
      userObj.profileImage = user.profileImage;
    }
    if (user.contactInfo) {
      userObj.contactInfo = user.contactInfo;
    }
    if(user.socialMedia){
    if (Array.isArray(user.socialMedia)) {
      for(let i = 0; i<user.socialMedia.length; i++){
        if(!isASocialMediaItem(user.socialMedia[i])){
          throw new Error("Not a valid Social Media Item");
        }
        if(!user.socialMedia[i]["id"]){
            user.socialMedia[i]["id"] = ObjectId();
        }
      }

      userObj.socialMedia = user.socialMedia;
    }else{
        throw new Error("Must be Social Media Array");
      }
    }

    if(user.likes){
    if (Array.isArray(user.likes)) {
      for(let i = 0; i<user.likes.length; i++){
        if(!isAUserLikeItem(user.likes[i])){
          throw new Error("Not a valid Like Item");
        }
        if(!user.likes[i]["id"]){
          user.likes[i]["id"] = ObjectId();
      }
      }
      userObj.likes = user.likes;
    }else{
        throw new Error("Must be Likes Array");
      }
    }
    if (user.dislikes) {
      if (Array.isArray(user.dislikes)) {
        for (let i = 0; i < user.dislikes.length; i++) {
          if (!isAUserDislikeItem(user.dislikes[i])) {
            throw new Error("Not a valid DislikeItem");
          }

          if(!user.dislikes[i]["id"]){
            user.dislikes[i]["id"] = ObjectId();
        }
        }
        userObj.dislikes = user.dislikes;
      } else {
        throw new Error("Must be Likes Array");
      }
    }

    if (user.favoritedUsers) {
      if (!Array.isArray(user.favoritedUsers)) {
        throw "Updated favorites must be a valid array";
      } else {
        let oldArr = await redisClient.lRange("favorite" + firebaseUid, 0, -1);
        let favName = "favorite" + firebaseUid;
        for(let i = 0; i<oldArr.length; i++){
          await redisClient.lRem(favName,0, oldArr[i] )
        }
        //Unfavoriting something deletes all the IDs
        for (let i = 0; i < user.favoritedUsers.length; i++) {
          if (typeof user.favoritedUsers[i] != "string") {
            throw "Favorite values in array must be a strings";
          }
         await redisClient.lPush(favName, user.favoritedUsers[i]);
        }
          userObj.favoritedUsers = user.favoritedUsers;
        }
      }

      let holder = await redisClient.get("User"+firebaseUid);
      if(holder){
        //Reisbackend updates
        let newHolder: User = JSON.parse(holder);
        let newRedisHolder = JSON.stringify(Object.assign(newHolder, userObj));
        await redisClient.set("User" + firebaseUid, newRedisHolder);

      }

      let allUsers = await redisClient.lRange("allUsers", 0, -1);
      if(allUsers){
        for(let i = 0; i<allUsers.length; i++){
          let temp: User = JSON.parse(allUsers[i]);
          if(temp["firebaseUid"] === firebaseUid){
            await redisClient.lRem("allUsers", 0, allUsers[i]);
            let updatedAllUserObj = JSON.stringify(Object.assign(temp, userObj));
            await redisClient.lPush("allUsers", updatedAllUserObj)
          }
        }
      }
    
    let userCollection = await users();

    const updateUser = await userCollection.updateOne(
      { firebaseUid: firebaseUid },
      { $set: userObj },
    );
    return this.getOneUser(firebaseUid);
  },
};

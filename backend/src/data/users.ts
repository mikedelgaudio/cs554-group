import { redisClient } from "../config/redisClient";
import { User, UserDislikeItem, UserLikeItem, SocialMediaItem } from "./interfaces";
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

function isAUserDislikeItem(obj: any): obj is UserDislikeItem {
  return 'id' in obj && 'name' in obj;
}
function isAUserLikeItem(obj: any): obj is UserLikeItem {
  return 'id' in obj && 'name' in obj;
}
function isASocialMediaItem(obj: any): obj is SocialMediaItem {
  return 'profileURL' in obj && 'id' in obj;
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
    firebaseUid: string
  ) {
    username = username.toLowerCase();
    if (!username || !email || !firstName || !lastName || !firebaseUid) {
      throw new Error("bad inputs");
    }
    let userCollection = await users();
    const userList = await userCollection
      .find({ username: username })
      .toArray();
    if (userList.length > 0) {
      throw new Error("that username is already in use");
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
      throw new Error("this didn't work");
    } else {
      let hashing = JSON.stringify(newUser);
      await redisClient.set("User" + newUser._id.toString(), hashing);
      let allUsers = await redisClient.get("allUsers");
      let updateCache: [] = []; 
      if (!allUsers) {
        try {
          await redisClient.set("allUsers", JSON.stringify([hashing]));
        }
        catch (e) {
          throw new Error ("Reddis not adding")
        }
      } else {
        try {
            await redisClient.lPush("history", hashing);
          }
          catch (e) {
            throw new Error ("Reddis not adding")
          }
      }
      return newUser;
    }
  },

  async getAllUsers() {
    try {
      await redisClient.get("User" + newUser._id.toString(), hashing);
    }

    try {
      let userCollection = await users();
      let userList = await userCollection.find().toArray();
      return userList;
    } catch (e) {
      throw new Error("Could not get users.");
    }
  },

  async getOneUser(firebaseUid: string) {
    try {
      let userCollection = await users();
      let userList = await userCollection.findOne({ firebaseUid: firebaseUid });
      return userList;
    } catch (e) {
      throw new Error("Could not get user.");
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
    let answer = [];
    let cached = await redisClient.get("favorite" + firebaseUid.toString());
    if (cached) {
      return JSON.parse(cached);
    }
    try {
      let userList = await this.getOneUser(firebaseUid);
      let fav = userList.favoritedUsers;
      for (let i = 0; i < fav.length; i++) {
        let temp = await this.getOneUser(fav[i]);
        answer.push(temp);
      }
      let flattened = JSON.stringify(answer);
      await redisClient.set("favorite" + firebaseUid.toString(), flattened);
      return answer;
    } catch (e) {
      throw new Error("Could not get favorited users.");
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
      }
      userObj.likes = user.likes;
    }else{
        throw new Error("Must be Likes Array");
      }

    }
    if(user.dislikes){
      if (Array.isArray(user.dislikes)) {
        for(let i = 0; i<user.dislikes.length; i++){
          if(!isAUserDislikeItem(user.dislikes[i])){
            throw new Error("Not a valid DislikeItem");
          }
        }
        userObj.dislikes = user.dislikes;
      }else{
          throw new Error("Must be Likes Array");
        }
      }
        
    if (user.favoritedUsers) {
      userObj.favoritedUsers = user.favoritedUsers;
    }

    let userCollection = await users();

    const updateUser = await userCollection.updateOne(
      { firebaseUid: firebaseUid },
      { $set: userObj }
    );
    return this.getOneUser(firebaseUid);
  },
};

import { redisClient } from "../config/redisClient";
import { contactInfo, user } from "./interfaces";
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");

module.exports = {
  async createUser(
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    firebaseUid: string
  ) {
    username = username.toLowerCase();
    if (!username || !email) {
      throw new Error("bad inputs");
    }
    let userCollection = await users();
    const userList = await userCollection
      .find({ username: username })
      .toArray();
    if (userList.length > 0) {
      throw new Error("that username is already in use");
    }

    let newUser: user = {
      _id: new ObjectId(),
      firebaseUid,
      username,
      firstName,
      lastName,
      profileImage: "",
      contactInfo: { email: email } as contactInfo,
      socialMedias: [],
      likes: [],
      dislikes: [],
      favoritedUsers: [],
    };

    let newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount == 0) {
      throw new Error("this didn't work");
    } else {
      let hashing = JSON.stringify(newUser);
      await redisClient.set("User" + newUser._id.toString(), hashing);
      return newUser;
    }
  },

  async getAllUsers() {
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
    console.log("passed cache");
    if (cached) {
      return JSON.parse(cached);
    }
    try {
      let userList = await this.getOneUser(firebaseUid);
      console.log("userList", userList);
      let fav = userList[0].favoritedUsers;
      for (let i = 0; i < fav.length; i++) {
        let temp = await this.getOneUser(fav[i]);
        answer.push(temp[0]);
      }
      let flattened = JSON.stringify(answer);
      await redisClient.set("favorite" + firebaseUid.toString(), flattened);
      return answer;
    } catch (e) {
      throw new Error("Could not get favorited users.");
    }
  },

  async patchUser(user: user, firebaseUid: string) {
    const userObj = {} as user;

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
    if (user.socialMedias) {
      userObj.socialMedias = user.socialMedias;
    }
    if (user.likes) {
      userObj.likes = user.likes;
    }
    if (user.dislikes) {
      userObj.dislikes = user.dislikes;
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

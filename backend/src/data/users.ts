import {contactInfo, socialMedia, like, dislike, user, usersI } from "./interfaces";
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const { json } = require('express');
const saltRounds = 16;


module.exports = {
async createUser(user: user) {
    console.log(user.username, user.contactInfo.email, user.password);
    user.username = user.username.toLowerCase();
    if(!user.username || !user.password || !user.contactInfo.email) {
      throw new Error("bad inputs");
    }
    console.log("1");
    let userCollection = await users();
    console.log("2")
    const userList = await userCollection.find({'username': user.username}).toArray();
    if (userList.length > 0) {
      throw new Error("that username is already in use")
    }
    console.log("3");
    let newPassword = await bcrypt.hash(user.password, saltRounds);
    let newUser = {
      email: user.contactInfo.email,
      username: user.username,
      password: newPassword,
      firstName: "",
      lastName:"",
      profileImage: null, 
      contactInfo:{},
      socialMedia: [],
      likes:[],
      dislikes:[],
      favoritedUsers:[]
    }
    console.log(newUser);
    
    let newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount == 0) {
      throw new Error("this didn't work");
    }
    else {
      return newUser;

    }
  },
  async getAllUsers() {
    try{
      let userCollection = await users();
      let userList = await userCollection.find().toArray();
      return userList;
    }catch(e){
      throw new Error("Could not get users.")
    }
  }, 

  async getOneUser(username: string) {
    try{
    let userCollection = await users();
    let userList = await userCollection.find({"username": username}).toArray();
    console.log(userList);
    return userList;
  }catch(e){
    throw new Error("Could not get user.")
  }

  },

  async getFavoritedUsers(id: string){
    let answer = [];
    try{
      let userCollection = await users();
      let userList = await userCollection.find({"_id": id}).favoritedUsers.toArray();
      for (let i = 0; i < userList.length; i++) {
        answer.push(this.getOneUser(userList[i]));
      }
      return answer;
    }catch(e){
      throw new Error("Could not get favorited users.")
  }
    }
  }


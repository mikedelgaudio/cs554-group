import {contactInfo, socialMedia, like, dislike, user, users} from "./interfaces";
const mongoCollections = require('./config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const { json } = require('express');
const saltRounds = 16;


module.exports = {
async addUser(username: string, email: string, password: string) {
    username = username.toLowerCase();
    if(!username || !password || !email) {
      throw new Error("bad inputs");
    }
    
    let userCollection = await users();
    const userList = await userCollection.find({'username': username}).toArray();
    if (userList.length > 0) {
      throw new Error("that username is already in use")
    }
    
    let newPassword = await bcrypt.hash(password, saltRounds);
    let newUser = {
      email: email,
      username: username,
      password: newPassword,
    }
    
    let newInsertInformation = await userCollection.insertOne(newUser);
    if (newInsertInformation.insertedCount == 0) {
      throw new Error("this didn't work");
    }
    else {
      return newUser;
    }
  },
    }


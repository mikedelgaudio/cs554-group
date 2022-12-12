import {contactInfo, socialMedia, like, dislike, user, usersI } from "./interfaces";
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const { json } = require('express');
const saltRounds = 16;


module.exports = {
async createUser(username: string, email: string, password: string) {
    console.log(username, email, password);
    username = username.toLowerCase();
    if(!username || !password || !email) {
      throw new Error("bad inputs");
    }
    console.log("1");
    let userCollection = await users();
    console.log("2")
    const userList = await userCollection.find({'username': username}).toArray();
    if (userList.length > 0) {
      throw new Error("that username is already in use")
    }
    console.log("3");
    let newPassword = await bcrypt.hash(password, saltRounds);
    let newUser = {
      email: email,
      username: username,
      password: newPassword,
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
    let userCollection = await users();
    let userList = await userCollection.find().toArray();

    return userList;
  }, 
    }


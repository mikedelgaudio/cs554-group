const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
import express, { Request, Response, Router } from "express";
let data = require("../data/users");
import {contactInfo, socialMedia, like, dislike, user, usersI } from "../data/interfaces";

export const usersRouter: Router = express.Router();



usersRouter.post('/register', async (req: Request, res: Response) => {

    try {
        let {username, email, password} = req.body;
        console.log(typeof(username));
        console.log(typeof(email));
        console.log(typeof(password));
        //console.log(username, email, password);
        
        let answer = await data.createUser(username, email, password);
        //console.log(answer.username);
        res.json(answer);
      }
      catch (e) {
        res.status(404).json({error:e});
      }
    });


usersRouter.get('/profile/:id', async (req: Request, res: Response) => {
    let id = req.params.id;
    console.log("getUser route");
    try{
        let users = await data.getOneUser(id);
        res.json(users);
    }catch(e){
        res.status(404).json({error:e});
    }
  });
  usersRouter.delete('/profile/:id', async (req: Request, res: Response) => {
    let id = req.params.id;
    console.log("getUser route");
    try{
        let users = await data.deleteOneUser(id);
        res.json(users);
    }catch(e){
        res.status(404).json({error:e});
    }
  });
 

usersRouter.get("/favorited/:id", async (req: Request, res: Response) => {
    let id = req.params.id;
    let favorites;
    try {
        favorites = await data.getFavoritedUsers(id);
        console.log(favorites);
        res.json(favorites);
    }
    catch (e) {
        res.status(404).json({error:e});
    }
});
usersRouter.post('/:id/editUser', async (req: Request, res: Response) => {

    try {
        let id = req.params.id;

        //console.log(username, email, password);

        let userBody = {};
        if(req.body.username){
        if (typeof req.body.username != "string" || !req.body.username) {
            res.status(400).json({error:"Updated username must be a valid string"});
        }else{
            userBody.username = req.body.username;
        }
    }
    if(req.body.username){
        if (typeof req.body.username != "string" || !req.body.username) {
            res.status(400).json({error:"Updated username must be a valid string"});
        }
    }
    if(req.body.firstName){
        if (typeof req.body.firstName != "string" || !req.body.firstName) {
            res.status(400).json({error:"Updated first name must be a valid string"});
        }
    }
    if(req.body.lastName){
        if (typeof req.body.lastName != "string" || !req.body.lastName) {
            res.status(400).json({error:"Updated last name must be a valid string"});
        }
    }
    if(req.body.profileImage){
        if (typeof req.body.profileImage != "string" || !req.body.profileImage) {
            res.status(400).json({error:"Updated profile image must be a valid string"});
        }
    }
    if(req.body.contactInfo){
        let contactFields = ["phoneNumber", "email", "personalWebsite","currentRole"]
       
        for (const [k, v] of Object.entries(req.body.contactInfo)) {
            if (!contactFields.includes(k)){
                res.status(400).json({error: "Contact Field must be either phone number, email, personal website, or current role"})
            }
            if(typeof(v) != "string"){
                res.status(400).json({error: "Contact Info must be string"})
            }
    }
}
    if(req.body.socialMedias){
        if (Array.isArray(req.body.socialMedias)) {
            res.status(400).json({error:"Updated social medias must be a valid array"});
        }
    }
    if(req.body.likes){
        if (Array.isArray(req.body.likes) || !req.body.likes) {
            res.status(400).json({error:"Updated social medias must be a valid string"});
        }
    }
    if(req.body.dislikes){
        if (Array.isArray(req.body.dislikes) || !req.body.dislikes) {
            res.status(400).json({error:"Updated social medias must be a valid string"});
        }
    }

    
        let answer = await data.patchUser(userBody, id);
        res.json(answer);
      }
      catch (e) {
        res.status(404).json({error:e});
      }
    });

usersRouter.get("/", async(req: Request, res: Response) => {

    try{
        let users = await data.getAllUsers();
        return res.json(users);
    }catch(e){
        res.status(404).json({error:e});

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









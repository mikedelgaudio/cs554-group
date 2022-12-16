const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
import express, { Request, Response, Router } from "express";
let data = require("../data/users");

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


usersRouter.get('/profile/:username', async (req: Request, res: Response) => {
    let username = req.params.username;
    console.log(username);
    console.log("getUser route");
    try{
        let users = await data.getOneUser(username);
        res.json(users);
    }catch(e){
        res.status(404).json({error:e});
    }
  });
 

usersRouter.get("/favorited", (req: Request, res: Response) => {
    try {
        let users = await data.getOneUser
    }
    res.send("Express + TypeScript Server");
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









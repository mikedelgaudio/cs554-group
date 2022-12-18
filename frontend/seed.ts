import { ObjectId } from "mongodb";
import axios from "axios";
import { getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "./src/firebase/firebase.service";
import { validString } from "./src/utils/error.util";


const register = async (email: string, password: string) => {
  if (!validString(email) || !validString(password))
    return Promise.reject({ message: "Invalid fields to register" });

  return createUserWithEmailAndPassword(auth, email, password);
};


interface IFirebaseContext {
  currentUser: User | null;
  login?: (email: string, password: string) => Promise<UserCredential>;
  register?: (email: string, password: string) => Promise<UserCredential>;
  logout?: () => Promise<void>;
  updateDisplayName?: (firstName: string, lastName: string) => Promise<void>;
}

const main = async () => {
    try {
        // If firebase or mongo fails could be data sync issue
        let userId = "";
        if (register) {
          const creds = await register('kevinha@stevens.edu', "thisIsARealPassword");
          userId = creds.user.uid;
        }
        const url = "http://localhost:3001/users/register";
        await axios.post(url, {
          username: "something",
          firebaseUid: userId,
          email: 'kevinha@stevens.edu',
          firstName: "Kevin",
          lastName: "Ha",
        });
    }
    catch (e) {
        console.log(e);
    }
};
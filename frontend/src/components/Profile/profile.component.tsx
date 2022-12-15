import axios from "axios";
import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle.hook";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { User } from "../../models/user.model";
import "./profile.css";

const Profile = () => {
  useTitle("Profile");
  const params = useParams();
  const [user, setUser] = React.useState<User>();
  const [isFavorited, setisFavorited] = React.useState<boolean>(false);
  const { currentUser } = useFirebaseAuth();
  const url = `http://localhost:3000/users/${params.id}`;
  const url2 = `http://localhost:3000/users/1`;
  useEffect(
    () => {
      console.log ("useEffect fired")
      async function getUser() {
        try {
          // check if url has data
          const {data: userData} = await axios.get(url)
          const {data: currentUserData} = await axios.get(url2)
          setUser(userData);
          if (currentUserData.favoritedUsers.find((favoritedUser: { id: any; }) => favoritedUser.id === userData.id)) {
            setisFavorited(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
      getUser();
    }, [url]
  );
  // if params.id is the same as the current user's id, then this is the current user's profile
  if (params.id === currentUser?.uid && user!==undefined) {
    return (
      <div className="profile">        
        {/* Form to edit Username */}
        <form>
          <label>
            Username:
            <input type="text" name="username" defaultValue={user.username} />
          </label>
          <input type="submit" value="Submit"/>
        </form>

        {/* Form to edit First Name */}
        <form>
          <label>
            First Name:
            <input type="text" name="firstName" defaultValue={user.firstName} />
          </label>
          <input type="submit" value="Submit"/>
        </form>

        {/* Form to edit Last Name */}
        <form>
          <label>
            Last Name:
            <input type="text" name="lastName" defaultValue={user.lastName} />
          </label>
          <input type="submit" value="Submit"/>
        </form>

        {/* Form to Edit Profile Image URL */}
        <form>
          <label>
            Profile Image URL:
            <input type="text" name="profileImageURL" defaultValue={user.profileImage} />
          </label>
          <input type="submit" value="Submit"/>
        </form>

        {/* Form to Edit Contact Info (phone number, email, website, current role) */}
        <form>
          <label>
            Phone Number:
            <input type="text" name="phoneNumber" defaultValue={user.contactInfo.phoneNumber} />
          </label>
          <label>
            Email:
            <input type="text" name="email" defaultValue={user.contactInfo.email} />
          </label>
          <label>
            Website:
            <input type="text" name="website" defaultValue={user.contactInfo.website} />
          </label>
          <label>
            Current Role:
            <input type="text" name="currentRole" defaultValue={user.contactInfo.occupation} />
          </label>
          <input type="submit" value="Submit"/>
        </form>

        {/* Form to edit, delete, or add social media (generated ID, and Profile URL) */}

        {/* Form to edit, delete, or add likes (generated ID, and like)  */}

        {/* Form to edit, delete, or add dislikes (generated ID, and dislike) */}

        {/* Form to delete a favorited user */}
      </div>
    );
  }
  else if (params.id !== currentUser?.uid && user!==undefined) {
    return (
      <div className="profile">
        {/* Username */}
        <h1>Username: {user.username}</h1>

        {/* Full Name */}
        <h2>Name: {user.firstName} {user.lastName}</h2>

        {/* Profile Image */}
        <img src={user.profileImage} alt="Profile Image"/>

        {/* Contact Info (phone number, email, website, current role) */}
        <h2>Contact Information: </h2>
        <p>Phone Number: {user.contactInfo.phoneNumber}</p>
        <p>Email: {user.contactInfo.email}</p>
        <p>Website: 
          <a href={user.contactInfo.website}>{user.contactInfo.website}</a>
        </p>
        <p>Current Role: {user.contactInfo.occupation}</p>
        <br/>

        {/* Social Media */}
        <p>Social Media: </p>
        {user.socialMedia? user.socialMedia.map((socialMedia) => (
          <div key={socialMedia.id}>
            <a href={socialMedia.profileURL}>{socialMedia.profileURL}</a>
          </div>
        )) : <p>No Social Media</p>}
        <br/>

        {/* Likes */}
        <p>Likes: </p>
        {user.likes? user.likes.map((like) => (
          <div key={like.id}>
            <p>{like.name}</p>
          </div>
        )) : <p>No Likes</p>}
        <br/>

        {/* Dislikes */}
        <p>Dislikes: </p>
        {user.dislikes? user.dislikes.map((dislike) => (
          <div key={(dislike.id)}>
            <p>{dislike.name}</p>
          </div>
        )) : <p>No Dislikes</p>}
        <br/>

        {/* Favorited Users */}
        <p>Favorited Users: </p>
        {user.favoritedUsers? user.favoritedUsers.map((favoritedUser) => (
          <div key={favoritedUser.id}>
            <p>{favoritedUser.id}</p>
          </div>
        )) : <p>No Favorited Users</p>}
        <br/>
        
        {/* Add to Favorites Button */}
        {/* if user.id is in currentUserFavorites, then the button should say "Remove from Favorites" */}
        {isFavorited ? 
          <button>Unfavorite</button> : 
          <button>Favorite</button>
        }
      </div>
    )
  }
  // User is undefined
  else {
    return (
      <div className="profile">
        <p>User Does Not Exist</p>
      </div>
    )
  }
};

export { Profile };

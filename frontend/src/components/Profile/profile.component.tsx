import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { useTitle } from "../../hooks/useTitle.hook";
import { User } from "../../models/user.model";
import { PageLayout } from "../Shared/PageLayout.component";
import {
  changeUsername,
  changeFirstName,
  changeLastName,
  changeProfilePicture,
  changePhoneNumber,
  changeEmail,
  changeWebsite,
  changeOccupation,
  addSocialMedia,
  deleteSocialMedia,
  addLike,
  deleteLike,
  addDislike,
  deleteDislike,
  addFavoritedUser,
  deleteFavoritedUser
} from "./helper";
import "./profile.css";

const Profile = () => {
  useTitle("Profile");
  const params = useParams();
  const [user, setUser] = React.useState<User>();
  const [isFavorited, setisFavorited] = React.useState<boolean>(false);
  const { currentUser } = useFirebaseAuth();
  // Chage url to 'http://localhost:3001/users/${params.id}' when FE is done -Sydney
  const url = `http://localhost:3000/users/${params.id}`;
  // Chage url2 to 'http://localhost:3001/users/${currentUser?.uid}' when FE is done -Sydney
  const url2 = `http://localhost:3000/users/1`;
  useEffect(() => {
    console.log("useEffect fired");
    async function getUser() {
      try {
        // check if url has data
        const { data: userData } = await axios.get(url);
        const { data: currentUserData } = await axios.get(url2);
        setUser(userData);
        if (
          currentUserData.favoritedUsers.find(
            (favoritedUser: { id: any }) => favoritedUser.id === userData.id,
          )
        ) {
          setisFavorited(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [url]);
  // if params.id is the same as the current user's id, then this is the current user's profile
  if (params.id === currentUser?.uid && user !== undefined) {
    return (
      <PageLayout header="Profile">
        {/* Form to edit Username */}
        <form className='profileForm'
        onSubmit={
          event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const username = formData.get("username");
            if (username !== null && typeof username === "string") {
              changeUsername(currentUser?.uid, username);
            }
          }
        }>
          <label>
            Username:
            <input className='profileInput' type="text" name="username" defaultValue={user.username} />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to edit First Name */}
        <form className='profileForm'
        onSubmit={
          event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const firstName = formData.get("firstName");
            if (firstName !== null && typeof firstName === "string") {
              changeFirstName(currentUser?.uid, firstName);
            }
          }
        }>
          <label>
            First Name:
            <input className='profileInput' type="text" name="firstName" defaultValue={user.firstName} />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to edit Last Name */}
        <form className='profileForm'
        onSubmit={
          event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const lastName = formData.get("lastName");
            if (lastName !== null && typeof lastName === "string") {
              changeLastName(currentUser?.uid, lastName);
            }
          }
        }>
          <label>
            Last Name:
            <input className='profileInput' type="text" name="lastName" defaultValue={user.lastName} />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to Edit Profile Image URL */}
        <form className='profileForm'
        onSubmit={
          event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const profileImageURL = formData.get("profileImageURL");
            if (profileImageURL !== null && typeof profileImageURL === "string") {
              changeProfilePicture(currentUser?.uid, profileImageURL);
            }
          }
        }>
          <label>
            Profile Image URL:
            <input
              className='profileInput'
              type="text"
              name="profileImageURL"
              defaultValue={user.profileImage}
            />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to Edit Phone Number (phone number, email, website, current role) */}
        <form className='profileForm'
        onSubmit={
          event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const phoneNumber = formData.get("phoneNumber");
            if (phoneNumber !== null && typeof phoneNumber === "string") {
              changePhoneNumber(currentUser?.uid, phoneNumber);
            }
          }
        }>
          <label>
            Phone Number:
            <input
              className='profileInput'
              type="text"
              name="phoneNumber"
              defaultValue={user.contactInfo.phoneNumber}
            />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to Edit Email */}
        <form className='profileForm'
        onSubmit={
          event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const email = formData.get("email");
            if (email !== null && typeof email === "string") {
              changeEmail(currentUser?.uid, email);
            }
          }
        }>
          <label>
            Email:
            <input
              className='profileInput'
              type="text"
              name="email"
              defaultValue={user.contactInfo.email}
            />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to Edit Website */}
        <form className='profileForm'
        onSubmit={
          event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const website = formData.get("website");
            if (website !== null && typeof website === "string") {
              changeWebsite(currentUser?.uid, website);
            }
          }
        }>
          <label>
            Website:
            <input
              className='profileInput'
              type="text"
              name="website"
              defaultValue={user.contactInfo.website}
            />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to Edit Current Role */}
        <form className='profileForm'
        onSubmit={
          event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const currentRole = formData.get("currentRole");
            if (currentRole !== null && typeof currentRole === "string") {
              changeOccupation(currentUser?.uid, currentRole);
            }
          }
        }>
          <label>
            Current Role:
            <input
              className='profileInput'
              type="text"
              name="currentRole"
              defaultValue={user.contactInfo.occupation}
            />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to Edit Current Company */}

        {/* Delete Social Media */}
        {user.socialMedia
          ? user.socialMedia.map(socialMedia => (
              <div key={socialMedia.id}>
                <p>
                  <a href={socialMedia.profileURL}>{socialMedia.profileURL}</a>
                </p>
                <button
                  className='profileButton'
                  onClick={() => {
                    deleteSocialMedia(currentUser?.uid, socialMedia.id)
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          : null}

        {/* Add Social Media */}
        <form
          onSubmit={event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const socialMediaURL = formData.get("socialMediaURL");
            if (socialMediaURL !== null && typeof socialMediaURL === "string") {
              addSocialMedia(currentUser?.uid, socialMediaURL);
            }
          }}
        >
          <label>
            Social Media URL:
            <input
              className='profileInput'
              type="text"
              name="socialMediaURL"
              defaultValue="google.com"
            />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Delete User Like */}
        {user.likes
          ? user.likes.map(like => (
              <div key={like.id}>
                <p>{like.name}</p>
                <button
                  className='profileButton'
                  onClick={() => {
                    deleteLike(currentUser?.uid, like.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          : null}

        {/* Add User Like */}
        <form
          onSubmit={event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const like = formData.get("like");
            if (like !== null && typeof like === "string") {
              addLike(currentUser?.uid, like);
            }
          }}
        >
          <label>
            Like:
            <input className='profileInput' type="text" name="like" defaultValue="like" />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Delete Dislike */}
        {user.dislikes
          ? user.dislikes.map(dislike => (
              <div key={dislike.id}>
                <p>{dislike.name}</p>
                <button
                  className='profileButton'
                  onClick={() => {
                    deleteDislike(currentUser?.uid, dislike.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          : null}

        {/* Add Dislike */}
        <form className='profileForm'
          onSubmit={event => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            const formData = new FormData(form);
            const dislike = formData.get("dislike");
            if (dislike !== null && typeof dislike === "string") {
              addDislike(currentUser?.uid, dislike);
            }
          }}
        >
          <label>
            Dislike:
            <input className='profileInput' type="text" name="dislike" defaultValue="dislike" />
          </label>
          <input className='profileSubmit' type="submit" value="Submit" />
        </form>

        {/* Form to delete a favorited user */}
        {user.favoritedUsers
          ? user.favoritedUsers.map(favorite => (
              <div key={favorite.id}>
                <p>{favorite.id}</p>
                <button
                  className='profileButton'
                  onClick={() => {
                    deleteFavoritedUser(currentUser?.uid, favorite.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          : null}
      </PageLayout>
    );
  }

  // If the user is viewing someone else's profile
  else if (params.id !== currentUser?.uid && user !== undefined) {
    return (
      <PageLayout header="Profile">
        {/* Username */}
        <h1>Username: {user.username}</h1>

        {/* Full Name */}
        <h2>
          Name: {user.firstName} {user.lastName}
        </h2>

        {/* Profile Image */}
        <img src={user.profileImage} alt="Profile Image" />

        {/* Contact Info (phone number, email, website, current role) */}
        <h2>Contact Information: </h2>
        <p>Phone Number: {user.contactInfo.phoneNumber}</p>
        <p>Email: {user.contactInfo.email}</p>
        <p>
          Website:
          <a href={user.contactInfo.website}>{user.contactInfo.website}</a>
        </p>
        <p>Current Role: {user.contactInfo.occupation}</p>
        <br />

        {/* Social Media */}
        <p>Social Media: </p>
        {user.socialMedia ? (
          user.socialMedia.map(socialMedia => (
            <div key={socialMedia.id}>
              <a href={socialMedia.profileURL}>{socialMedia.profileURL}</a>
            </div>
          ))
        ) : (
          <p>No Social Media</p>
        )}
        <br />

        {/* Likes */}
        <p>Likes: </p>
        {user.likes ? (
          user.likes.map(like => (
            <div key={like.id}>
              <p>{like.name}</p>
            </div>
          ))
        ) : (
          <p>No Likes</p>
        )}
        <br />

        {/* Dislikes */}
        <p>Dislikes: </p>
        {user.dislikes ? (
          user.dislikes.map(dislike => (
            <div key={dislike.id}>
              <p>{dislike.name}</p>
            </div>
          ))
        ) : (
          <p>No Dislikes</p>
        )}
        <br />

        {/* Favorited Users */}
        <p>Favorited Users: </p>
        {user.favoritedUsers ? (
          user.favoritedUsers.map(favoritedUser => (
            <div key={favoritedUser.id}>
              <p>{favoritedUser.id}</p>
            </div>
          ))
        ) : (
          <p>No Favorited Users</p>
        )}
        <br />

        {/* Add to Favorites Button */}
        {isFavorited ? (
          // toggleUserFavorite(user.id)
          <button
            className='profileButton'
            onClick={() => {
              deleteFavoritedUser(currentUser?.uid, user.id);
              setisFavorited(false);
            }}
          >
            Unfavorite
          </button>
        ) : (
          <button
            className='profileButton'
            onClick={() => {
              addFavoritedUser(currentUser?.uid, user.id);
              setisFavorited(true);
            }}
          >
            Favorite
          </button>
        )}
      </PageLayout>
    );
  }
  // User is undefined
  else {
    return (
      <PageLayout header="Profile">
        <p>No user found.</p>
      </PageLayout>
    );
  }
};

export { Profile };

import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { useTitle } from "../../hooks/useTitle.hook";
import { User } from "../../models/user.backend.model";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { PageLayout } from "../Shared/PageLayout.component";
import {
  addDislike,
  addLike,
  addSocialMedia,
  changeEmail,
  changeFirstName,
  changeLastName,
  changeOccupation,
  changePhoneNumber,
  changeProfilePicture,
  changeUsername,
  changeWebsite,
  deleteDislike,
  deleteFavoritedUser,
  deleteLike,
  deleteSocialMedia,
} from "./helper";

const Profile = () => {
  useTitle("Profile - DuckedIn");
  const params = useParams();

  const [user, setUser] = React.useState<User>();
  const [favorited, setFavorited] = React.useState<boolean>(false);
  const { currentUser } = useFirebaseAuth();
  let TOAST_ID = "ERROR_UPDATING_PROFILE";
  // const url = 'http://localhost:3001/profile/${params.id}';
  // const url2 = 'http://localhost:3001/profile/${currentUser?.uid}';
  const url = `http://localhost:3001/users/profile/${params.id}`;
  const url2 = `http://localhost:3001/users/1`;
  useEffect(() => {
    async function getUser() {
      try {
        // check if url has data
        const { data: userData } = await axios.get(url);

        setUser(userData);
        if (
          userData.favoritedUsers.find(
            (favoritedUser: { id: any }) => favoritedUser.id === userData.id,
          )
        ) {
          setFavorited(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [url]);

  const handleFavoriteToggle = async () => {
    try {
      // TODO Handle API Call to Toggle Favoriting
      setFavorited(prev => (prev = !prev));
    } catch (e) {
      TOAST_ID = "FAILED_TO_FAVORITE_USER_TOGGLE";
      TOAST_SERVICE.error(TOAST_ID, "Failed to update user? favorites", true);
      TOAST_ID = "ERROR_UPDATING_PROFILE";
    }
  };

  // Types of Views
  const loggedInLayout = (
    <div className="flex gap-5 flex-col">
      {/* Form to edit Username */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const username = formData.get("username");
          if (username !== null && typeof username === "string") {
            changeUsername(currentUser?.uid, username);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Username cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          Username:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="username"
            defaultValue={user?.username}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to edit First Name */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const firstName = formData.get("firstName");
          if (firstName !== null && typeof firstName === "string") {
            changeFirstName(currentUser?.uid, firstName);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "First Name cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          First Name:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="firstName"
            defaultValue={user?.firstName}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to edit Last Name */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const lastName = formData.get("lastName");
          if (lastName !== null && typeof lastName === "string") {
            changeLastName(currentUser?.uid, lastName);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Last Name cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          Last Name:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="lastName"
            defaultValue={user?.lastName}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Profile Image URL */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const profileImageURL = formData.get("profileImageURL");
          if (profileImageURL !== null && typeof profileImageURL === "string") {
            changeProfilePicture(currentUser?.uid, profileImageURL);
          } else {
            TOAST_SERVICE.error(
              TOAST_ID,
              "Profile Image URL cannot be blank",
              true,
            );
          }
        }}
      >
        <label className="flex items-center gap-3">
          Profile Image URL:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="profileImageURL"
            defaultValue={user?.profileImage}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Phone Number (phone number, email, website, current role) */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const phoneNumber = formData.get("phoneNumber");
          if (phoneNumber !== null && typeof phoneNumber === "string") {
            changePhoneNumber(currentUser?.uid, phoneNumber);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Phone Number cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          Phone Number:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="phoneNumber"
            defaultValue={user?.contactInfo?.phoneNumber}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Email */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const email = formData.get("email");
          if (email !== null && typeof email === "string") {
            changeEmail(currentUser?.uid, email);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Email cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          Email:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="email"
            name="email"
            defaultValue={user?.contactInfo.email}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Website */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const website = formData.get("website");
          if (website !== null && typeof website === "string") {
            changeWebsite(currentUser?.uid, website);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Website cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          Website:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="website"
            defaultValue={user?.contactInfo.website}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Current Role */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const currentRole = formData.get("currentRole");
          if (currentRole !== null && typeof currentRole === "string") {
            changeOccupation(currentUser?.uid, currentRole);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Current Role cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          Current Role:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="currentRole"
            defaultValue={user?.contactInfo.occupation}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Delete Social Media */}
      {user?.socialMedia
        ? // ? user?.socialMedias.map(socialMedia => (
          user?.socialMedia.map(socialMedia => (
            <div key={socialMedia.id}>
              <p>
                <a href={socialMedia.profileURL}>{socialMedia.profileURL}</a>
              </p>
              <button
                className="profileButton"
                onClick={() => {
                  deleteSocialMedia(currentUser?.uid, socialMedia.id);
                }}
              >
                Delete
              </button>
            </div>
          ))
        : null}

      {/* Add Social Media */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const socialMediaURL = formData.get("socialMediaURL");
          if (socialMediaURL !== null && typeof socialMediaURL === "string") {
            addSocialMedia(currentUser?.uid, socialMediaURL);
          } else {
            TOAST_SERVICE.error(
              TOAST_ID,
              "Social Media URL cannot be blank",
              true,
            );
          }
        }}
      >
        <label className="flex items-center gap-3">
          Social Media URL:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="socialMediaURL"
            defaultValue="google.com"
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Delete Likes */}
      {user?.likes
        ? user?.likes.map(like => (
            <div key={like.id}>
              <p>{like.name}</p>
              <button
                className="profileButton"
                onClick={() => {
                  deleteLike(currentUser?.uid, like.id);
                }}
              >
                Delete
              </button>
            </div>
          ))
        : null}

      {/* Add user? Like */}
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const like = formData.get("like");
          if (like !== null && typeof like === "string") {
            addLike(currentUser?.uid, like);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Like cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          Like:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="like"
            defaultValue="like"
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Delete Dislike */}
      {user?.dislikes
        ? user?.dislikes.map(dislike => (
            <div key={dislike.id}>
              <p>{dislike.name}</p>
              <button
                className="profileButton"
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
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const dislike = formData.get("dislike");
          if (dislike !== null && typeof dislike === "string") {
            addDislike(currentUser?.uid, dislike);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Dislike cannot be blank", true);
          }
        }}
      >
        <label className="flex items-center gap-3">
          Dislike:
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="dislike"
            defaultValue="dislike"
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to delete a favorited user? */}
      {user?.favoritedUsers
        ? user?.favoritedUsers.map(favoriteId => (
            <div key={favoriteId}>
              <p>{favoriteId}</p>
              <button
                className="profileButton"
                onClick={() => {
                  deleteFavoritedUser(currentUser?.uid, favoriteId);
                }}
              >
                Delete
              </button>
            </div>
          ))
        : null}
    </div>
  );
  const viewingLayout = (
    <>
      {/* Username */}
      <h1>Username: {user?.username}</h1>

      {/* Full Name */}
      <h2>
        Name: {user?.firstName} {user?.lastName}
      </h2>

      {/* Profile Image */}
      <img src={user?.profileImage} alt="Profile Image" />

      {/* Contact Info (phone number, email, website, current role) */}
      <h2>Contact Information: </h2>
      <p>Phone Number: {user?.contactInfo.phoneNumber}</p>
      <p>Email: {user?.contactInfo.email}</p>
      <p>
        Website:
        <a href={user?.contactInfo.website}>{user?.contactInfo.website}</a>
      </p>
      <p>Current Role: {user?.contactInfo.occupation}</p>
      <br />

      {/* Social Media */}
      <p>Social Media: </p>
      {user?.socialMedia ? (
        user?.socialMedia.map(socialMedia => (
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
      {user?.likes ? (
        user?.likes.map(like => (
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
      {user?.dislikes ? (
        user?.dislikes.map(dislike => (
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
      {user?.favoritedUsers ? (
        user?.favoritedUsers.map(favoriteId => (
          <div key={favoriteId}>
            <p>{favoriteId}</p>
          </div>
        ))
      ) : (
        <p>No Favorited Users</p>
      )}
      <br />

      {/* Heart Icon */}
      <div>
        <svg id="heart" height="0" width="0">
          <defs>
            <clipPath id="svgPath">
              <path d="M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="heart-container">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            className="heart-stroke"
          >
            <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z" />
          </svg>

          <button
            className={`${favorited ? "heart-on" : ""} heart-clip`}
            onClick={() => handleFavoriteToggle()}
            aria-label={`${favorited ? "Unfavorite" : "Favorite"} user: ${
              user?.firstName
            } ${user?.lastName}`}
          ></button>
        </div>
      </div>
    </>
  );
  const errorLayout = (
    <>
      <p>User does not exist</p>
    </>
  );

  // Determine which layout to render based upon logged in user?
  const renderLayout = (): JSX.Element => {
    if (params.id === currentUser?.uid && user !== undefined) {
      return loggedInLayout;
    } else if (params.id !== currentUser?.uid && user !== undefined) {
      return viewingLayout;
    } else {
      return errorLayout;
    }
  };

  return <PageLayout header="Profile">{renderLayout()}</PageLayout>;
};

export { Profile };

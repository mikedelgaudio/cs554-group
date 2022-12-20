import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { useTitle } from "../../hooks/useTitle.hook";
import { User } from "../../models/user.backend.model";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { PageLayout } from "../Shared/PageLayout.component";
import { Tag } from "../Shared/Tag.component";
import { Loading } from "../Shared/Loading.component";
import { postRequest } from "../../utils/api.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faGlobe,
  faFileAlt,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import noImg from "../../assets/noImg.jpg";
import {
  addDislike,
  addLike,
  addSocialMedia,
  // changeEmail,
  changeFirstName,
  changeLastName,
  changeOccupation,
  changePhoneNumber,
  changeProfilePicture,
  changeResume,
  changeUsername,
  changeWebsite,
  deleteDislike,
  deleteLike,
  deleteSocialMedia,
  modifyFavorites,
} from "./helper";

const Profile = () => {
  useTitle("Profile - DuckedIn");
  const params = useParams();

  const [user, setUser] = useState<User>();
  const [currentUserState, setCurrentUser] = useState<User>();
  const [favorited, setFavorited] = useState<boolean>(false);
  const [hasSocialMedia, setHasSocialMeda] = useState<boolean>(false);
  const [hasLikes, setHasLikes] = useState<boolean>(false);
  const [hasDislikes, setHasDislikes] = useState<boolean>(false);
  const [hasFavoritedUsers, setHasFavoritedUsers] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useFirebaseAuth();
  let TOAST_ID = "ERROR_UPDATING_PROFILE";
  const url = "http://localhost:3001/users/profile/" + params.id;
  const url2 = "http://localhost:3001/users/profile/" + currentUser?.uid;
  useEffect(() => {
    async function getUser() {
      setLoading(true);
      try {
        // check if url has data
        const { data: userData } = await axios.get(url);
        const { data: currentUserData } = await axios.get(url2);
        setUser(userData);
        setCurrentUser(currentUserData);
        console.log(userData);
        if (userData.socialMedia.length > 0) {
          setHasSocialMeda(true);
        }
        if (userData.likes.length > 0) {
          setHasLikes(true);
        }
        if (userData.dislikes.length > 0) {
          setHasDislikes(true);
        }
        if (userData.favoritedUsers.length > 0) {
          setHasFavoritedUsers(true);
        }
        console.log("hggg ", currentUserData?.favoritedUsers);
        if (currentUserData?.favoritedUsers?.includes(userData.firebaseUid)) {
          setFavorited(true);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    getUser();
  }, [url]);

  const handleFavoriteToggle = async () => {
    try {
      // TODO Update correct URLdata
      if (currentUser) {
        await postRequest(
          `http://localhost:3001/users/${currentUser.uid}/editUser`,
          {
            favoritedUsers: [user?.firebaseUid],
          },
          currentUser,
        );
        setFavorited(prev => (prev = !prev));
      }
    } catch (e) {
      console.log(e);
      const TOAST_ID = "FAILED_TO_FAVORITE_USER_TOGGLE";
      TOAST_SERVICE.error(TOAST_ID, "Failed to update user favorites", true);
    }
  };

  // Types of Views
  const loggedInLayout = (
    <div className="flex gap-5 flex-col">
      {/* Form to edit Username */}
      <form
        className="flex items-end gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const username = formData.get("username");
          if (username !== "" && typeof username === "string") {
            changeUsername(currentUser, username);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Username cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Username
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="username"
            defaultValue={currentUserState?.username}
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to edit First Name */}
      <form
        className="flex items-end gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const firstName = formData.get("firstName");
          if (firstName !== "" && typeof firstName === "string") {
            changeFirstName(currentUser, firstName);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "First Name cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          First Name
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="firstName"
            defaultValue={currentUserState?.firstName}
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to edit Last Name */}
      <form
        className="flex items-end gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const lastName = formData.get("lastName");
          if (lastName !== "" && typeof lastName === "string") {
            changeLastName(currentUser, lastName);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Last Name cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Last Name
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="lastName"
            defaultValue={currentUserState?.lastName}
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Profile Image URL */}
      <form
        className="flex items-end gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const profileImageURL = formData.get("profileImageURL");
          if (
            profileImageURL !== null &&
            profileImageURL !== "" &&
            typeof profileImageURL === "string"
          ) {
            changeProfilePicture(currentUser, profileImageURL);
          } else {
            TOAST_SERVICE.error(
              TOAST_ID,
              "Profile Image URL cannot be blank",
              true,
            );
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Profile Image URL
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="profileImageURL"
            defaultValue={currentUserState?.profileImage}
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Resume */}
      <form
        className="flex items-end gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const resumeURL = formData.get("resumeURL");
          if (
            resumeURL !== null &&
            resumeURL !== "" &&
            typeof resumeURL === "string"
          ) {
            changeResume(currentUser, resumeURL);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Resume URL cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Resume URL
          <input
            className="border border-slate-400 p-2 rounded-md"
            type="text"
            name="resumeURL"
            defaultValue={currentUserState?.resume}
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Phone Number (phone number, email, website, current role) */}
      <form
        className="flex items-end gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const phoneNumber = formData.get("phoneNumber");
          if (
            phoneNumber !== null &&
            phoneNumber !== "" &&
            typeof phoneNumber === "string"
          ) {
            changePhoneNumber(currentUser, phoneNumber);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Phone Number cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Phone Number
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="phoneNumber"
            defaultValue={currentUserState?.contactInfo?.phoneNumber}
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Email
      <form
        className="flex gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const email = formData.get("email");
          if (email !== null && email !== "" && typeof email === "string") {
            changeEmail(currentUser, email);
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
            defaultValue={currentUserState?.contactInfo?.email}
          />
        </label>
        <button
          className="rounded text-base font-medium text-slate-900 transition-all duration-200 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form> */}

      {/* Form to Edit Website */}
      <form
        className="flex items-end gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const website = formData.get("website");
          if (
            website !== null &&
            website !== "" &&
            typeof website === "string"
          ) {
            changeWebsite(currentUser, website);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Website cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Website
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="website"
            defaultValue={currentUserState?.contactInfo?.website}
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to Edit Current Role */}
      <form
        className="flex items-end gap-6"
        onSubmit={event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const currentRole = formData.get("currentRole");
          if (
            currentRole !== null &&
            currentRole !== "" &&
            typeof currentRole === "string"
          ) {
            changeOccupation(currentUser, currentRole);
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Current Role cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Current Role
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="currentRole"
            defaultValue={currentUserState?.contactInfo?.occupation}
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Delete Social Media */}
      <div className="border-2">
        <p>Current Social Media</p>
        <br />
        {user?.socialMedia
          ? user?.socialMedia.map(socialMedia => (
              <div key={socialMedia?.id}>
                <p>
                  <a
                    href={`${socialMedia.profileURL}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {socialMedia?.profileURL}
                  </a>
                </p>
                <button
                  className="profileButton"
                  onClick={async () => {
                    setUser(
                      await deleteSocialMedia(currentUser, socialMedia.id),
                    );
                  }}
                >
                  Delete
                </button>
                <br />
                <br />
              </div>
            ))
          : null}
      </div>

      {/* Add Social Media */}
      <form
        className="flex items-end gap-6"
        onSubmit={async event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const socialMediaURL = formData.get("socialMediaURL");
          let e:string = "noError"
          if (
            socialMediaURL !== null &&
            socialMediaURL !== "" &&
            typeof socialMediaURL === "string"
          ) {
            try {
              setUser(await addSocialMedia(currentUser, socialMediaURL));
            }
            catch (error) {
              console.log(error);
              console.log(typeof error);
              if (typeof error == 'string')
              TOAST_SERVICE.error(TOAST_ID, error, true);
              else {
                TOAST_SERVICE.error(
                  TOAST_ID,
                  "Please input a valid URL",
                  true,
                );
              }
            }
          } else {
            TOAST_SERVICE.error(
              TOAST_ID,
              "Social Media URL cannot be blank",
              true,
            );
          }
          // refetch page
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Social Media URL
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="socialMediaURL"
            placeholder="https://instagram.com/gogo.the.gorilla.dnt/"
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Delete Likes */}
      <div className="border-2">
        <p>Current Likes</p>
        <br />
        <div>
          {user?.likes
            ? user?.likes.map(like => (
                <Tag
                  key={like.id}
                  text={like.name}
                  removable={true}
                  state={async () =>
                    setUser(await deleteLike(currentUser, like.id))
                  }
                />
              ))
            : null}
        </div>
      </div>

      {/* Add Like */}
      <form
        className="flex items-end gap-6"
        onSubmit={async event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const like = formData.get("like");
          console.log(currentUser)
          if (
            like !== null &&
            like !== "" &&
            typeof like === "string"
          ) {
            try {
              console.log(like);
              setUser(await addLike(currentUser, like));
            }
            catch (e: any) {
              TOAST_SERVICE.error(TOAST_ID, e, true);
            }
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Like cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Like
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="like"
            placeholder="Web Programming"
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Delete Dislike */}
      <div className="border-2">
        <p>Current Dislikes</p>
        <br />
        {user?.dislikes
          ? user?.dislikes.map(dislike => (
              <Tag
                style="bg-red-200 text-red-700"
                key={dislike.id}
                text={dislike.name}
                removable={true}
                state={async () =>
                  setUser(await deleteDislike(currentUser, dislike.id))
                }
              />
            ))
          : null}
      </div>

      {/* Add Dislike */}
      <form
        className="flex items-end gap-6"
        onSubmit={async event => {
          event.preventDefault();
          const form = event.target as HTMLFormElement;
          const formData = new FormData(form);
          const dislike = formData.get("dislike");
          console.log(currentUser)
          if (
            dislike !== null &&
            dislike !== "" &&
            typeof dislike === "string"
          ) {
            try {
              setUser(await addDislike(currentUser, dislike));
            }
            catch (e) {
              TOAST_SERVICE.error(TOAST_ID, "Please enter a unique dislike", true);
            }
          } else {
            TOAST_SERVICE.error(TOAST_ID, "Dislike cannot be blank", true);
          }
        }}
      >
        <label className="flex flex-col gap-3 text-lg font-bold">
          Dislike
          <input
            className="border border-slate-400 p-2 rounded-md font-normal"
            type="text"
            name="dislike"
            placeholder="Bugs in my code"
          />
        </label>
        <button
          className="rounded text-base font-medium bg-blue-500 text-white transition-all duration-200 py-3 px-5 hover:text-opacity-60 focus:outline-none focus:ring-1 focus:ring-slate-800 focus:ring-offset-2"
          type="submit"
          value="Submit"
        >
          Submit
        </button>
      </form>

      {/* Form to delete a favorited user? */}
      <div className="border-2">
        <p>Current Favorited Users</p>
        <br />
        {user?.favoritedUsers
          ? user?.favoritedUsers.map(favoriteId => (
              <div key={favoriteId}>
                <p>{favoriteId}</p>
                <button
                  className="profileButton"
                  onClick={async () => {
                    setUser(await modifyFavorites(currentUser, favoriteId));
                  }}
                >
                  Delete
                </button>
                <br />
              </div>
            ))
          : null}
      </div>
    </div>
  );
  const viewingLayout = loading ? (
    <Loading />
  ) : (
    <div className="grid grid-row-3 grid-col-2 gap-4 text-center gap-6">
      <div className="bg-slate-200 p-6 rounded-xl shadow-md flex flex-col items-center col-span-2">
        {/* Profile Image */}
        {user?.profileImage ? (
          <img src={user?.profileImage} alt="Profile Image" className="w-80" />
        ) : (
          <img
            className="max-w-none w-40 h-40 lg:w-[16rem] lg:h-[16rem] rounded-full"
            height={256}
            width={256}
            loading="lazy"
            src={user?.profileImage || noImg}
            alt={`${user?.firstName ?? "N/A"}'s profile`}
          />
        )}
        <div className="mt-4">
          {/* Full Name */}
          <h1 className="text-4xl font-bold">
            {user?.firstName} {user?.lastName}
          </h1>
          {/* Username */}
          <h2 className="text-lg">@{user?.username}</h2>
        </div>
        {/* heart icon */}
        <div className="flex justify-center mt-6">
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
      </div>
      {/* Likes */}
      <div className="bg-slate-200 p-6 flex flex-col flex-wrap rounded-xl shadow-md col-span-1 gap-4">
        <h3 className="font-bold text-2xl text-left">Likes</h3>
        <div>
          {user?.likes?.length ? (
            user?.likes.map(like => (
              <Tag key={like.id} text={like.name} removable={false} />
            ))
          ) : (
            <p>User has not provided any likes (yet!)</p>
          )}
        </div>
      </div>

      <div className="bg-slate-200 p-6 flex flex-col rounded-xl shadow-md gap-y-3 row-span-2 col-span-1 text-left">
        {/* Resume */}
        <div className="text-md">
          <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
          {user?.resume ? (
            <a href={`${user?.resume}`} target="_blank" rel="noreferrer">
              Click for Resume
            </a>
          ) : (
            "Not provided"
          )}
        </div>

        {/* Contact Info (phone number, email, website, current role) */}
        <div className="text-md">
          <FontAwesomeIcon icon={faPhone} className="mr-2" />
          {user?.contactInfo.phoneNumber || "Not provided"}
        </div>

        <div className="text-md">
          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
          {user?.contactInfo.email || "Not provided"}
        </div>

        <div className="text-md">
          <FontAwesomeIcon icon={faGlobe} className="mr-2" />
          {user?.contactInfo?.website ? (
            <a
              href={`${user?.contactInfo?.website}`}
              target="_blank"
              rel="noreferrer"
            >
              {user?.contactInfo.website}
            </a>
          ) : (
            "Not provided"
          )}
        </div>

        <div className="text-md">
          <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
          {user?.contactInfo.occupation || "Not provided"}
        </div>
        {/* Social Media */}
        {/* if user.socialMedia array length is 0 */}
        {hasSocialMedia ? <p>Social Media: </p> : null}
        {user?.socialMedia ? (
          user?.socialMedia.map(socialMedia => (
            <div key={socialMedia.id}>
              <a
                href={`${socialMedia.profileURL}`}
                target="_blank"
                rel="noreferrer"
              >
                {socialMedia?.profileURL}
              </a>
              <br />
            </div>
          ))
        ) : (
          <p>No Social Media</p>
        )}
        {user?.socialMedia ? <br /> : null}
      </div>

      {/* Dislikes */}
      <div className="bg-slate-200 p-6 flex flex-col flex-wrap rounded-xl shadow-md col-span-1 gap-4">
        <h3 className="font-bold text-2xl text-left">Dislikes</h3>
        <div>
          {user?.dislikes?.length ? (
            user?.dislikes.map(dislike => (
              <Tag
                style="bg-red-200 text-red-700"
                key={dislike.id}
                text={dislike.name}
                removable={false}
              />
            ))
          ) : (
            <p>User has not provided any dislikes (yet!)</p>
          )}
        </div>
      </div>
    </div>
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

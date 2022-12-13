import { useTitle } from "../../hooks/useTitle.hook";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser.hook";
import "./profile.css";
import { useEffect } from "react";

const Profile = () => {
  useTitle("Profile");
  const params = useParams();

  useEffect(() => {
    // Fetch data from BE of the user id
    // If logged in user is the same id as the fetched user allow for editing
  }, [params.id]);

  const id = params.id;
  const isCurrentUser = id === useCurrentUser().id;
  console.log("Param Id: ", id);
  console.log("Current User Id: ", useCurrentUser().id);
  if (isCurrentUser) {
    console.log("This profile is the current user");
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1>First Name: {useCurrentUser().firstName}</h1>
        {/* Edit firstName */}
        <form className="form">
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="input"
          />
          <button type="submit">Submit</button>
        </form>
        <br />
        <h1>Last Name: {useCurrentUser().lastName}</h1>
        {/* Edit lastName */}
        <form className="form">
          <input type="text" name="lastName" id="lastName" className="input" />
          <button type="submit">Submit</button>
        </form>
        <br />
        <h2>Username: {useCurrentUser().username}</h2>
        {/* Edit username */}
        <form className="form">
          <input type="text" name="username" id="username" className="input" />
          <button type="submit">Submit</button>
        </form>
        <br />
        <img src={useCurrentUser().profileImage} alt="Profile Image" />
        {/* Edit profileImage */}
        <form className="form">
          <input
            type="text"
            name="profileImage"
            id="profileImage"
            className="input"
          />
          <button type="submit">Submit</button>
        </form>
        <br />
        <h3>Phone Number: {useCurrentUser().contactInfo.phoneNumer}</h3>
        <h3>Email: {useCurrentUser().contactInfo.email}</h3>
        <h3>
          Personal Website: {useCurrentUser().contactInfo.personalWebsite}
        </h3>
        <h3>Current Role: {useCurrentUser().contactInfo.currentRole}</h3>
        {/* Edit contactInfo */}
        <form className="form">
          <input
            type="text"
            name="phoneNumer"
            id="phoneNumer"
            className="input"
          />
          <input type="text" name="email" id="email" className="input" />
          <input
            type="text"
            name="personalWebsite"
            id="personalWebsite"
            className="input"
          />
          <input
            type="text"
            name="currentRole"
            id="currentRole"
            className="input"
          />
          <button type="submit">Submit</button>
        </form>
        <br />
        <h3>
          Social Media:{" "}
          {useCurrentUser().socialMedia.map(
            socialMedia => socialMedia.profileURL,
          )}
        </h3>
        {/* Edit socialMedia */}
        <form className="form">
          <input
            type="text"
            name="socialMedia"
            id="socialMedia"
            className="input"
          />
          <button type="submit">Submit</button>
        </form>
        <br />
        <h3>Likes: {useCurrentUser().likes.map(like => like.name)}</h3>
        {/* Edit likes */}
        <form className="form">
          <input type="text" name="likes" id="likes" className="input" />
          <button type="submit">Submit</button>
        </form>
        <br />
        <h3>
          Dislikes: {useCurrentUser().dislikes.map(dislike => dislike.name)}
        </h3>
        {/* Edit dislikes */}
        <form className="form">
          <input type="text" name="dislikes" id="dislikes" className="input" />
          <button type="submit">Submit</button>
        </form>
        <br />
        <h3>
          Favorited Users:{" "}
          {useCurrentUser().favoritedUsers.map(
            favoritedUser => favoritedUser.id,
          )}
        </h3>
        {/* Edit favoritedUsers */}
        <form className="form">
          <input
            type="text"
            name="favoritedUsers"
            id="favoritedUsers"
            className="input"
          />
          <button type="submit">Submit</button>
        </form>
        <br />
      </div>
    );
  } else {
    // get profile from backend
    console.log("This profile is not the current user");
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        {/* Profile Fields: username, firstName, lastName, profileImage, contactInfo{}, socialMedia[], likes[], dislikes[], favoritedUsers[] */}
        <h1>Name: </h1>
        {/* firstName + lastName */}
        <h2>Username: </h2>
        {/* Profile Image */}
        <img src="" alt="Profile Image" />
        {/* Contact Info */}
        <h3>Contact Info: </h3>
        {/* Social Media */}
        <h3>Social Media: </h3>
        {/* Likes */}
        <h3>Likes: </h3>
        {/* Dislikes */}
        <h3>Dislikes: </h3>
        {/* Favorited Users */}
        <h3>Favorited Users: </h3>
      </div>
    );
  }
  // If profile is not the current user's, just show fields
  // If profile is the current user's, show fields and edit button
};

export { Profile };

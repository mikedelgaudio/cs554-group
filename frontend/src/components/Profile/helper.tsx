import axios from "axios";
import { postRequest } from "../../utils/api.util";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faReddit,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const TOAST_ID = "SUCCESS_UPDATING_PROFILE";

export const handleSocialMedia = (url: string) => {
  const supportedSites = [
    { site: "Facebook", icon: faFacebook },
    { site: "Twitter", icon: faTwitter },
    { site: "LinkedIn", icon: faLinkedin },
    { site: "Instagram", icon: faInstagram },
    { site: "Reddit", icon: faReddit },
  ];
  const determinedSite = supportedSites.find(site =>
    url.includes(site.site.toLowerCase()),
  );
  return determinedSite ?? { site: url, icon: faCircleUser };
};
// Change username
export const changeUsername = async (currentUser: any, newUserName: string) => {
  try {
    if (currentUser) {
      await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          username: newUserName,
        },
        currentUser,
      );
      TOAST_SERVICE.success(TOAST_ID, "Successfully updated username", true);
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Change First Name
export const changeFirstName = async (
  currentUser: any,
  newFirstName: string,
) => {
  try {
    if (currentUser) {
      await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          firstName: newFirstName,
        },
        currentUser,
      );
      TOAST_SERVICE.success(TOAST_ID, "Successfully updated first name", true);
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Change Last Name
export const changeLastName = async (currentUser: any, newLastName: string) => {
  try {
    if (currentUser) {
      await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          lastName: newLastName,
        },
        currentUser,
      );
      TOAST_SERVICE.success(TOAST_ID, "Successfully updated last name", true);
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Change Profile Picture
export const changeProfilePicture = async (
  currentUser: any,
  newProfilePicture: string,
) => {
  try {
    if (currentUser) {
      await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          profileImage: newProfilePicture,
        },
        currentUser,
      );
      TOAST_SERVICE.success(
        TOAST_ID,
        "Successfully updated profile picture",
        true,
      );
    }
  } catch (e: any) {
    if (typeof e == 'string') {
      throw "Please enter a Valid Link"
    }else {
      console.log("WISH WASH WISH")
    throw (e);
    }  }
};

// change Resume
export const changeResume = async (currentUser: any, newResume: string) => {
  try {
    if (currentUser) {
      await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          resume: newResume,
        },
        currentUser,
      );
      TOAST_SERVICE.success(TOAST_ID, "Successfully updated resume", true);
    }
  } catch (e: any) {
    if(typeof e == 'string')
      throw "Cannot be duplicate value"
    else{
      throw e
    }
      
    console.log(e);
  }
};

// Change Phone Number
export const changePhoneNumber = async (
  currentUser: any,
  newPhoneNumber: string,
) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  user.data.contactInfo.phoneNumber = newPhoneNumber;
  try {
    if (currentUser) {
      await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          contactInfo: user.data.contactInfo,
        },
        currentUser,
      );
      TOAST_SERVICE.success(
        TOAST_ID,
        "Successfully updated phone number",
        true,
      );
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Change Email
// export const changeEmail = async (currentUser: any, newEmail: string) => {
//     const user = await axios.get(`${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`);
//     user.data.contactInfo.email = newEmail;
//     try {
//         if (currentUser) {
//             await postRequest(
//                 `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
//                 {
//                     contactInfo: user.data.contactInfo,
//                 },
//                 currentUser,
//             );
//         }
//     } catch (e: any) {
//         console.log(e);
//     }
// }

// Change Website
export const changeWebsite = async (currentUser: any, newWebsite: string) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  user.data.contactInfo.website = newWebsite;
  try {
    if (currentUser) {
      await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          contactInfo: user.data.contactInfo,
        },
        currentUser,
      );
      TOAST_SERVICE.success(
        TOAST_ID,
        "Successfully updated personal website",
        true,
      );
    }
  } catch (e: any) {
    console.log(e);
    if (typeof e == 'string') {
      throw "please enter a valid link"
    }
    else {
    throw (e);
    }
  }
};

// Change Occupation
export const changeOccupation = async (
  currentUser: any,
  newOccupation: string,
) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  user.data.contactInfo.occupation = newOccupation;
  try {
    if (currentUser) {
      await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          contactInfo: user.data.contactInfo,
        },
        currentUser,
      );
      TOAST_SERVICE.success(TOAST_ID, "Successfully updated occupation", true);
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Add Social Media
export const addSocialMedia = async (
  currentUser: any,
  socialMediaURL: string,
) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  for (let i = 0; i < user.data.socialMedia.length; i++) {
    if (user.data.socialMedia[i]["profileURL"] === socialMediaURL){
      throw "please select a unique Social Media"
  }
}
  user.data.socialMedia.push({ profileURL: socialMediaURL });
  try {
    if (currentUser) {
      const data = await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          socialMedia: user.data.socialMedia,
        },
        currentUser,
      );
      return data;
    }
  } catch (e: any) {
    console.log(e);
    if (typeof e == 'string') {
      throw "please enter a valid link"
    }
    else {
    throw (e);
    }
  }
};

// Delete Social Media
export const deleteSocialMedia = async (
  currentUser: any,
  socialMediaID: any,
) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  user.data.socialMedia = user.data.socialMedia.filter(
    (socialMedia: any) => socialMedia.id !== socialMediaID,
  );
  try {
    if (currentUser) {
      const data = await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          socialMedia: user.data.socialMedia,
        },
        currentUser,
      );
      return data;
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Add a Like
export const addLike = async (currentUser: any, like: string) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  console.log(user);
  for (let i = 0; i < user.data.likes.length; i++) {
    if (user.data.likes[i]["name"] === like){
      throw "please select a unique like"
  }
}
  user.data.likes.push({ name: like });
  try {
    if (currentUser) {
      const data = await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          likes: user.data.likes,
        },
        currentUser,
      );
      return data;
    }
  } catch (e: any) {
    console.log("HELPER LIKES I AM HERE")
    if(typeof e == 'string')
      throw "Cannot be duplicate value"
      else{
        throw e
      }
    console.log(e);
  }
};

// Delete a Like
export const deleteLike = async (currentUser: any, likeID: any) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  user.data.likes = user.data.likes.filter((like: any) => like.id !== likeID);
  try {
    if (currentUser) {
      const data = await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          likes: user.data.likes,
        },
        currentUser,
      );
      return data;
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Add a Dislike
export const addDislike = async (currentUser: any, dislike: string) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  console.log(dislike)
  for (let i = 0; i < user.data.dislikes.length; i++) {
    if (user.data.dislikes[i]["name"] === dislike){
      throw "please select a unique dislike"
  }
}
  user.data.dislikes.push({ name: dislike });
  try {
    if (currentUser) {
      const data = await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          dislikes: user.data.dislikes,
        },
        currentUser,
      );
      return data;
    }
  } catch (e: any) {
    if(typeof e == 'string')
    throw "Cannot be duplicate value"
    else{
      throw e
    }
    console.log(e);
  }
};

// Delete a Dislike
export const deleteDislike = async (currentUser: any, dislikeID: any) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  user.data.dislikes = user.data.dislikes.filter(
    (dislike: any) => dislike.id !== dislikeID,
  );
  try {
    if (currentUser) {
      const data = await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          dislikes: user.data.dislikes,
        },
        currentUser,
      );
      return data;
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Modify favorited users
export const modifyFavorites = async (
  currentUser: any,
  favoritedUserID: any,
) => {
  const user = await axios.get(
    `${import.meta.env?.VITE_API_URL}/users/profile/${currentUser.uid}`,
  );
  try {
    if (currentUser) {
      const data = await postRequest(
        `${import.meta.env?.VITE_API_URL}/users/${currentUser.uid}/editUser`,
        {
          favoritedUsers: [favoritedUserID],
        },
        currentUser,
      );
      return data;
    }
  } catch (e: any) {
    console.log(e);
  }
};

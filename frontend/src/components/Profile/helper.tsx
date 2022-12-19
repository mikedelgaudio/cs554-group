import axios from "axios";
import { postRequest } from "../../utils/api.util";

// Change username
export const changeUsername = async (currentUser: any, newUserName: string) => {
  try {
    if (currentUser) {
      await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
        {
          username: newUserName,
        },
        currentUser,
      );
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
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
        {
          firstName: newFirstName,
        },
        currentUser,
      );
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
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
        {
          lastName: newLastName,
        },
        currentUser,
      );
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
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
        {
          profileImage: newProfilePicture,
        },
        currentUser,
      );
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Change Phone Number
export const changePhoneNumber = async (
  currentUser: any,
  newPhoneNumber: string,
) => {
  const user = await axios.get(
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.contactInfo.phoneNumber = newPhoneNumber;
  try {
    if (currentUser) {
      await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
        {
          contactInfo: user.data.contactInfo,
        },
        currentUser,
      );
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Change Email
export const changeEmail = async (currentUser: any, newEmail: string) => {
  const user = await axios.get(
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.contactInfo.email = newEmail;
  try {
    if (currentUser) {
      await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
        {
          contactInfo: user.data.contactInfo,
        },
        currentUser,
      );
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Change Website
export const changeWebsite = async (currentUser: any, newWebsite: string) => {
  const user = await axios.get(
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.contactInfo.website = newWebsite;
  try {
    if (currentUser) {
      await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
        {
          contactInfo: user.data.contactInfo,
        },
        currentUser,
      );
    }
  } catch (e: any) {
    console.log(e);
  }
};

// Change Occupation
export const changeOccupation = async (
  currentUser: any,
  newOccupation: string,
) => {
  const user = await axios.get(
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.contactInfo.occupation = newOccupation;
  try {
    if (currentUser) {
      await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
        {
          contactInfo: user.data.contactInfo,
        },
        currentUser,
      );
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
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.socialMedia.push({ profileURL: socialMediaURL });
  try {
    if (currentUser) {
      const data = await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
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

// Delete Social Media
export const deleteSocialMedia = async (
  currentUser: any,
  socialMediaID: any,
) => {
  const user = await axios.get(
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.socialMedia = user.data.socialMedia.filter(
    (socialMedia: any) => socialMedia.id !== socialMediaID,
  );
  try {
    if (currentUser) {
      const data = await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
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
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.likes.push({ name: like });
  try {
    if (currentUser) {
      const data = await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
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

// Delete a Like
export const deleteLike = async (currentUser: any, likeID: any) => {
  const user = await axios.get(
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.likes = user.data.likes.filter((like: any) => like.id !== likeID);
  try {
    if (currentUser) {
      const data = await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
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
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.dislikes.push({ name: dislike });
  try {
    if (currentUser) {
      const data = await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
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

// Delete a Dislike
export const deleteDislike = async (currentUser: any, dislikeID: any) => {
  const user = await axios.get(
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  user.data.dislikes = user.data.dislikes.filter(
    (dislike: any) => dislike.id !== dislikeID,
  );
  try {
    if (currentUser) {
      const data = await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
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
    `http://localhost:3001/users/profile/${currentUser.uid}`,
  );
  try {
    if (currentUser) {
      const data = await postRequest(
        `http://localhost:3001/users/${currentUser.uid}/editUser`,
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

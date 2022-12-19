import axios from "axios";

// Change username
export const changeUsername = async (id: any, newUserName: string) => { 
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {username: newUserName});
};

// Change First Name
export const changeFirstName = async (id: any, newFirstName: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {firstName: newFirstName});
};

// Change Last Name
export const changeLastName = async (id: any, newLastName: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {lastName: newLastName});
};

// Change Profile Picture
export const changeProfilePicture = async (id: any, newProfilePicture: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {profileImage: newProfilePicture});
}

// Change Phone Number
export const changePhoneNumber = async (id: any, newPhoneNumber: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    user.data.contactInfo.phoneNumber = newPhoneNumber;
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {contactInfo: user.data.contactInfo});
}

// Change Email
export const changeEmail = async (id: any, newEmail: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    user.data.contactInfo.email = newEmail;
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {contactInfo: user.data.contactInfo});
}

// Change Website
export const changeWebsite = async (id: any, newWebsite: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    user.data.contactInfo.website = newWebsite;
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {contactInfo: user.data.contactInfo});
}

// Change Occupation
export const changeOccupation = async (id: any, newOccupation: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    user.data.contactInfo.occupation = newOccupation;
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {contactInfo: user.data.contactInfo});
}

// Add Social Media
export const addSocialMedia = async (id: any, socialMediaURL: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    user.data.socialMedia.push({profileURL: socialMediaURL});
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {socialMedia: user.data.socialMedia});
}

// Delete Social Media
export const deleteSocialMedia = async (profileID: any, socialMediaID: any) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${profileID}`);
    user.data.socialMedia.splice(socialMediaID, 1);
    await axios.post(`http://localhost:3001/users/${profileID}/editUser`, {socialMedia: user.data.socialMedia});
}

// Add a Like
export const addLike = async (id: any, like: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    user.data.likes.push({name: like});
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {likes: user.data.likes});
}

// Delete a Like
export const deleteLike = async (profileID: any, likeID: any) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${profileID}`);
    user.data.likes.splice(likeID, 1);
    await axios.post(`http://localhost:3001/users/${profileID}/editUser`, {likes: user.data.likes});
}

// Add a Dislike
export const addDislike = async (id: any, dislike: string) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    user.data.dislikes.push({name: dislike});
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {dislikes: user.data.dislikes});
}

// Delete a Dislike
export const deleteDislike = async (profileID: any, dislikeID: any) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${profileID}`);
    user.data.dislikes.splice(dislikeID, 1);
    await axios.post(`http://localhost:3001/users/${profileID}/editUser`, {dislikes: user.data.dislikes});
}

// Add a Favorited User
export const addFavoritedUser = async (id: any, favoritedUserID: any) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${id}`);
    user.data.favoritedUsers.push({id: favoritedUserID});
    await axios.post(`http://localhost:3001/users/${id}/editUser`, {favoritedUsers: user.data.favoritedUsers});
}

// Delete a Favorited User
export const deleteFavoritedUser = async (profileID: any, favoritedUserID: any) => {
    const user = await axios.get(`http://localhost:3001/users/profile/${profileID}`);
    user.data.favoritedUsers.splice(favoritedUserID, 1);
    await axios.post(`http://localhost:3001/users/${profileID}/editUser`, {favoritedUsers: user.data.favoritedUsers});
}
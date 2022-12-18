import axios from "axios";

// Change username
export const changeUsername = async (id: any, newUserName: string) => { 
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    await axios.post(`http://localhost:3001/${id}/editUser`, {username: newUserName});
};

// Change First Name
export const changeFirstName = async (id: any, newFirstName: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    await axios.post(`http://localhost:3001/${id}/editUser`, {firstName: newFirstName});
};

// Change Last Name
export const changeLastName = async (id: any, newLastName: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    await axios.post(`http://localhost:3001/${id}/editUser`, {lastName: newLastName});
};

// Change Profile Picture
export const changeProfilePicture = async (id: any, newProfilePicture: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    await axios.post(`http://localhost:3001/${id}/editUser`, {profileImage: newProfilePicture});
}

// Change Phone Number
export const changePhoneNumber = async (id: any, newPhoneNumber: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    user.data.contactInfo.phoneNumber = newPhoneNumber;
    await axios.post(`http://localhost:3001/${id}/editUser`, {contactInfo: user.data.contactInfo});
}

// Change Email
export const changeEmail = async (id: any, newEmail: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    user.data.contactInfo.email = newEmail;
    await axios.post(`http://localhost:3001/${id}/editUser`, {contactInfo: user.data.contactInfo});
}

// Change Website
export const changeWebsite = async (id: any, newWebsite: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    user.data.contactInfo.personalWebsite = newWebsite;
    await axios.post(`http://localhost:3001/${id}/editUser`, {contactInfo: user.data.contactInfo});
}

// Change Occupation
export const changeOccupation = async (id: any, newOccupation: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    user.data.contactInfo.currentRole = newOccupation;
    await axios.post(`http://localhost:3001/${id}/editUser`, {contactInfo: user.data.currentRole});
}

// Add Social Media
export const addSocialMedia = async (id: any, socialMediaURL: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    user.data.socialMedias.push({profileURL: socialMediaURL});
    await axios.post(`http://localhost:3001/${id}/editUser`, {socialMedias: user.data.socialMedias});
}

// Delete Social Media
export const deleteSocialMedia = async (profileID: any, socialMediaID: any) => {
    const user = await axios.get(`http://localhost:3001/profile/${profileID}`);
    user.data.socialMedias.splice(socialMediaID, 1);
    await axios.post(`http://localhost:3001/${profileID}/editUser`, {socialMedias: user.data.socialMedias});
}

// Add a Like
export const addLike = async (id: any, like: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    user.data.likes.push({name: like});
    await axios.post(`http://localhost:3001/${id}/editUser`, {likes: user.data.likes});
}

// Delete a Like
export const deleteLike = async (profileID: any, likeID: any) => {
    const user = await axios.get(`http://localhost:3001/profile/${profileID}`);
    user.data.likes.splice(likeID, 1);
    await axios.post(`http://localhost:3001/${profileID}/editUser`, {likes: user.data.likes});
}

// Add a Dislike
export const addDislike = async (id: any, dislike: string) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    user.data.dislikes.push({name: dislike});
    await axios.post(`http://localhost:3001/${id}/editUser`, {dislikes: user.data.dislikes});
}

// Delete a Dislike
export const deleteDislike = async (profileID: any, dislikeID: any) => {
    const user = await axios.get(`http://localhost:3001/profile/${profileID}`);
    user.data.dislikes.splice(dislikeID, 1);
    await axios.post(`http://localhost:3001/${profileID}/editUser`, {dislikes: user.data.dislikes});
}

// Add a Favorited User
export const addFavoritedUser = async (id: any, favoritedUserID: any) => {
    const user = await axios.get(`http://localhost:3001/profile/${id}`);
    user.data.favoritedUsers.push({id: favoritedUserID});
    await axios.post(`http://localhost:3001/${id}/editUser`, {favoritedUsers: user.data.favoritedUsers});
}

// Delete a Favorited User
export const deleteFavoritedUser = async (profileID: any, favoritedUserID: any) => {
    const user = await axios.get(`http://localhost:3001/profile/${profileID}`);
    user.data.favoritedUsers.splice(favoritedUserID, 1);
    await axios.post(`http://localhost:3001/${profileID}/editUser`, {favoritedUsers: user.data.favoritedUsers});
}
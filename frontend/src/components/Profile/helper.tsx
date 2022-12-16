import axios from "axios";

// Change username
export const changeUsername = async (id: any, newUserName: string) => { 
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.username = newUserName;
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Change First Name
export const changeFirstName = async (id: any, newFirstName: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.firstName = newFirstName;
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Change Last Name
export const changeLastName = async (id: any, newLastName: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.lastName = newLastName;
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Change Profile Picture
export const changeProfilePicture = async (id: any, newProfilePicture: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.profileImage = newProfilePicture;
    // Change url to 3001 when using backend -Sydney
    if (user.data.profileImage) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Change Phone Number
export const changePhoneNumber = async (id: any, newPhoneNumber: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.contactInfo.phoneNumber = newPhoneNumber;
    // Change url to 3001 when using backend -Sydney
    if (user.data.contactInfo.phoneNumber) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Change Email
export const changeEmail = async (id: any, newEmail: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.contactInfo.email = newEmail;
    // Change url to 3001 when using backend -Sydney
    if (user.data.contactInfo.email) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Change Website
export const changeWebsite = async (id: any, newWebsite: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.contactInfo.website = newWebsite;
    // Change url to 3001 when using backend -Sydney
    if (user.data.contactInfo.website) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Change Occupation
export const changeOccupation = async (id: any, newOccupation: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.occupation = newOccupation;
    // Change url to 3001 when using backend -Sydney
    if (user.data.occupation) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Add Social Media
export const addSocialMedia = async (id: any, socialMediaURL: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.socialMedia.push({profileURL: socialMediaURL});
    // Change url to 3001 when using backend -Sydney
    if (user.data.socialMedia) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Delete Social Media
export const deleteSocialMedia = async (profileID: any, socialMediaID: any) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${profileID}`);
    user.data.socialMedia.splice(socialMediaID, 1);
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${profileID}`, user.data);
}

// Add a Like
export const addLike = async (id: any, like: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.likes.push({name: like});
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Delete a Like
export const deleteLike = async (profileID: any, likeID: any) => {
    // Change url to 3001 when using backend -Sydney
    await axios.delete(`http://localhost:3000/users/likes/${likeID}`)
}

// Add a Dislike
export const addDislike = async (id: any, dislike: string) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.dislikes.push({name: dislike});
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Delete a Dislike
export const deleteDislike = async (profileID: any, dislikeID: any) => {
    // Change url to 3001 when using backend -Sydney
    await axios.delete(`http://localhost:3000/users/dislikes/${dislikeID}`)
}

// Add a Favorited User
export const addFavoritedUser = async (id: any, favoritedUserID: any) => {
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.favoritedUsers.push({id: favoritedUserID});
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Delete a Favorited User
export const deleteFavoritedUser = async (profileID: any, favoritedUserID: any) => {
    // Change url to 3001 when using backend -Sydney
    await axios.delete(`http://localhost:3000/users/favorited/${favoritedUserID}`)
}
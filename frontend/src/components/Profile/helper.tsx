import axios from "axios";

// Change username
export const changeUsername = async (id: any, newUserName: string) => { 
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.username = newUserName;
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Change First Name
export const changeFirstName = async (id: any, newFirstName: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.firstName = newFirstName;
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Change Last Name
export const changeLastName = async (id: any, newLastName: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.lastName = newLastName;
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Change Profile Picture
export const changeProfilePicture = async (id: any, newProfilePicture: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.profileImage = newProfilePicture;
    if (user.data.profileImage) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Change Phone Number
export const changePhoneNumber = async (id: any, newPhoneNumber: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.contactInfo.phoneNumber = newPhoneNumber;
    if (user.data.contactInfo.phoneNumber) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Change Email
export const changeEmail = async (id: any, newEmail: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.contactInfo.email = newEmail;
    if (user.data.contactInfo.email) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Change Website
export const changeWebsite = async (id: any, newWebsite: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.contactInfo.website = newWebsite;
    if (user.data.contactInfo.website) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Change Occupation
export const changeOccupation = async (id: any, newOccupation: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.occupation = newOccupation;
    if (user.data.occupation) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Add Social Media
export const addSocialMedia = async (id: any, socialMediaURL: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.socialMedia.push({profileURL: socialMediaURL});
    if (user.data.socialMedia) {
        await axios.put(`http://localhost:3000/users/${id}`, user.data);
    } else {
        await axios.post(`http://localhost:3000/users/${id}`, user.data);
    }
}

// Delete Social Media
export const deleteSocialMedia = async (profileID: any, socialMediaID: any) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    const user = await axios.get(`http://localhost:3000/users/${profileID}`);
    user.data.socialMedia.splice(socialMediaID, 1);
    await axios.put(`http://localhost:3000/users/${profileID}`, user.data);
}

// Add a Like
export const addLike = async (id: any, like: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data);
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.likes.push({name: like});
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Delete a Like
export const deleteLike = async (profileID: any, likeID: any) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // user.data.likes.splice(likeID, 1);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data)
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    await axios.delete(`http://localhost:3000/users/likes/${likeID}`)
}

// Add a Dislike
export const addDislike = async (id: any, dislike: string) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data)
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.dislikes.push({name: dislike});
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Delete a Dislike
export const deleteDislike = async (profileID: any, dislikeID: any) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // user.data.dislikes.splice(dislikeID, 1);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data)
    await axios.delete(`http://localhost:3000/users/dislikes/${dislikeID}`)
}

// Add a Favorited User
export const addFavoritedUser = async (id: any, favoritedUserID: any) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data)
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    user.data.favoritedUsers.push({id: favoritedUserID});
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Delete a Favorited User
export const deleteFavoritedUser = async (profileID: any, favoritedUserID: any) => {
    // const user = await axios.get(`http://localhost:3001/profile/${id}`);
    // user.data.favoritedUsers.splice(favoritedUserID, 1);
    // await axios.post(`http://localhost:3001/${id}/editUser`, user.data)
    await axios.delete(`http://localhost:3000/users/favorited/${favoritedUserID}`)
}
import axios from "axios";

// Function to change username in api
export const changeUsername = async (id: any, newUserName: string) => { 
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // change username
    user.data.username = newUserName;
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Function to change First Name in API
export const changeFirstName = async (id: any, newFirstName: string) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // change first name
    user.data.firstName = newFirstName;
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Function to change Last Name in API
export const changeLastName = async (id: any, newLastName: string) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // change last name
    user.data.lastName = newLastName;
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
};

// Function to change Profile Picture in API
export const changeProfilePicture = async (id: any, newProfilePicture: string) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // change profile picture
    user.data.profileImage = newProfilePicture;
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Function to change Contact Info in API
export const changeContactInfo = async (id: any, phonenumber: any, email: string, website: string, occupation: string) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // change contact info
    user.data.contactInfo.phoneNumber = phonenumber;
    user.data.contactInfo.email = email;
    user.data.contactInfo.website = website;
    user.data.contactInfo.occupation = occupation;
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Function to add another social media object
export const addSocialMedia = async (id: any, socialMediaURL: string) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // add social media object
    user.data.socialMedia.push({profileURL: socialMediaURL});
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Function to delete a social media object
export const deleteSocialMedia = async (profileID: any, socialMediaID: any) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${profileID}`);
    // delete social media object
    user.data.socialMedia.splice(socialMediaID, 1);
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${profileID}`, user.data);
}

// Function to add a Like Object
export const addLike = async (id: any, like: string) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // add like object
    user.data.likes.push({name: like});
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Function to delete a Like Object
export const deleteLike = async (profileID: any, likeID: any) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${profileID}`);
    // delete like object
    user.data.likes.splice(likeID, 1);
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${profileID}`, user.data);
}

// Function to add a Dislike Object
export const addDislike = async (id: any, dislike: string) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // add dislike object
    user.data.dislikes.push({name: dislike});
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Function to delete a Dislike Object
export const deleteDislike = async (profileID: any, dislikeID: any) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${profileID}`);
    // delete dislike object
    user.data.dislikes.splice(dislikeID, 1);
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${profileID}`, user.data);
}

// Function to add a Favorited User
export const addFavoritedUser = async (id: any, favoritedUserID: any) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${id}`);
    // add favorited user
    user.data.favoritedUsers.push({id: favoritedUserID});
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${id}`, user.data);
}

// Function to delete a favorited user
export const deleteFavoritedUser = async (profileID: any, favoritedUserID: any) => {
    // find user in api by id
    // Change url to 3001 when using backend -Sydney
    const user = await axios.get(`http://localhost:3000/users/${profileID}`);
    // delete favorited user
    user.data.favoritedUsers.splice(favoritedUserID, 1);
    // update user in api
    // Change url to 3001 when using backend -Sydney
    await axios.put(`http://localhost:3000/users/${profileID}`, user.data);
}


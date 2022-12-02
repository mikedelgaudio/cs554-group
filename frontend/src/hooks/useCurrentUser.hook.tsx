import { useEffect } from "react";

export function useCurrentUser() {
    // Has Error
    useEffect(() => {
        const id = localStorage.getItem("id");
        const username = localStorage.getItem("username");
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");
        const profileImage = localStorage.getItem("profileImage");
        const contactInfo = localStorage.getItem("contactInfo");
        const socialMedia = localStorage.getItem("socialMedia");
        const likes = localStorage.getItem("likes");
        const dislikes = localStorage.getItem("dislikes");
        const favoritedUsers = localStorage.getItem("favoritedUsers");
        const currentUser = {
            id,
            username,
            firstName,
            lastName,
            profileImage,
            contactInfo,
            socialMedia,
            likes,
            dislikes,
            favoritedUsers
        }
        return () => {
            return currentUser;
        };
    }, []);
}
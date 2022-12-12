import { useSelector } from "react-redux";
import { store } from "../redux/store";

// Trying to get user from state -Sydney
// export const useCurrentUser = () => {
//     const currentUser = useSelector((state: typeof store) => state);
//     return currentUser;
// };

export function useCurrentUser() {
    const user = useSelector((state: typeof store) => state);
    // return user;
    const currentUser = {
        id: "1", // user.id
        username: "test", // user.username
        firstName: "test", // user.firstName
        lastName: "test", // user.lastName
        profileImage: "https://picsum.photos/200/300", // user.profileImage
        contactInfo: {
            phoneNumer: "test", // user.contactInfo.phoneNumer
            email: "test", // user.contactInfo.email
            personalWebsite: "test", // user.contactInfo.personalWebsite
            currentRole: "test" // user.contactInfo.currentRole
        },
        socialMedia: [
            {
                id: "1", // user.socialMedia.id
                profileURL: "test" // user.socialMedia.profileURL
            }
        ],
        likes: [
            {
                id: "1", // user.likes.id
                name: "test" // user.likes.name
            }
        ],
        dislikes: [
            {
                id: "1", // user.dislikes.id
                name: "test" // user.dislikes.name
            }
        ],
        favoritedUsers: [
            {
                id: "1", // user.favoritedUsers.id
            }
        ]
    };
    return currentUser;
}
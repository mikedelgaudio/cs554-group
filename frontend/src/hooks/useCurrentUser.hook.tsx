import { useEffect } from "react";

export function useCurrentUser() {
    // useEffect(() => {
        // Get current user from redux
        const currentUser = {
            id: "1",
            username: "test",
            firstName: "test",
            lastName: "test",
            profileImage: "https://picsum.photos/200/300",
            contactInfo: {
                phoneNumer: "test",
                email: "test",
                personalWebsite: "test",
                currentRole: "test"
            },
            socialMedia: [
                {
                    id: "1",
                    profileURL: "test"
                }
            ],
            likes: [
                {
                    id: "1",
                    name: "test"
                }
            ],
            dislikes: [
                {
                    id: "1",
                    name: "test"
                }
            ],
            favoritedUsers: [
                {
                    id: "1",
                }
            ]
        };
        return currentUser;
    // }, []);
}
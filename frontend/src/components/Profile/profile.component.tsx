import { useTitle } from "../../hooks/useTitle.hook";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../hooks/useCurrentUser.hook";


const Profile = () => {
    useTitle("Profile");
    // profile id = id param
    const { id } = useParams();
    // if profile id  = current user id
    // const isCurrentUser = id === useCurrentUser().id;
    const isCurrentUser = false;
    if (isCurrentUser) {
        // const profile = useSelector((state: RootState) => state.profile);
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h1>Profile Dummy Text</h1>
            </div>
        )
    }
    else {
        // get profile from backend
        return (
            <div className="flex flex-col items-center justify-center w-full h-full">
                {/* Profile Fields: username, firstName, lastName, profileImage, contactInfo{}, socialMedia[], likes[], dislikes[], favoritedUsers[] */}
                <h1>Name: </h1>
                {/* firstName + lastName */}
                <h2>Username: </h2>
                {/* Profile Image */}
                <img src="" alt="Profile Image" />
                {/* Contact Info */}
                <h3>Contact Info: </h3>
                {/* Social Media */}
                <h3>Social Media: </h3>
                {/* Likes */}
                <h3>Likes: </h3>
                {/* Dislikes */}
                <h3>Dislikes: </h3>
                {/* Favorited Users */}
                <h3>Favorited Users: </h3>
            </div>
        )
    }
    // If profile is not the current user's, just show fields
    // If profile is the current user's, show fields and edit button
}

export { Profile };
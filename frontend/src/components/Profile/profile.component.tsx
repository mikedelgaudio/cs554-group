import { useTitle } from "../../hooks/useTitle.hook";

const Profile = () => {
    useTitle("Profile");
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h1>Profile Dummy Text</h1>
        </div>
    )
}

export { Profile };
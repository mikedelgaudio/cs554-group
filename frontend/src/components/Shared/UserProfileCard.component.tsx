import axios from "axios";
import { useEffect, useState } from "react";
import noImg from "../../assets/noImg.jpg";
import {
  SocialMediaItem,
  User,
  UserDislikeItem,
  UserLikeItem,
} from "../../models/user.backend.model";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { Loading } from "./Loading.component";
import { postRequest } from "../../utils/api.util";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { Link } from "react-router-dom";

const UserProfileCard = ({
  id,
  isFavorited,
  userFavorites,
}: {
  id: string;
  isFavorited: boolean;
  userFavorites?: string[];
}) => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [favorited, setFavorited] = useState<boolean>(isFavorited);

  const { currentUser } = useFirebaseAuth();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // TODO Update with actual backend URL
        const { data } = await axios.get(
          `http://localhost:3001/users/profile/${id}`,
        );
        setUser(data);
      } catch (e: any) {
        const TOAST_ID = "ERROR_LOADING_PROFILE_CARD";

        if (e.response?.status === 404) {
          TOAST_SERVICE.error(
            TOAST_ID,
            `Did not find user with user ID: ${id}`,
            true,
          );
          return;
        }
        TOAST_SERVICE.error(
          TOAST_ID,
          `Unexpected error loading user with ID: ${id}`,
          true,
        );
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleFavoriteToggle = async () => {
    try {
      let updatedFavoriteList;

      if (favorited) {
        updatedFavoriteList = userFavorites?.filter(userFid => {
          userFid === id;
        });
      } else {
        userFavorites?.push(id);
        updatedFavoriteList = userFavorites;
      }

      // TODO Update correct URLdata
      if (currentUser) {
        await postRequest(
          `http://localhost:3001/users/${currentUser.uid}/editUser`,
          {
            favoritedUsers: updatedFavoriteList,
          },
          currentUser,
        );
        console.log("Am I reached");

        setFavorited(prev => (prev = !prev));
      }
    } catch (e) {
      console.log(e);
      const TOAST_ID = "FAILED_TO_FAVORITE_USER_TOGGLE";
      TOAST_SERVICE.error(TOAST_ID, "Failed to update user favorites", true);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-slate-200 p-6 flex rounded-xl shadow-md gap-6 flex-col md:flex-row">
          <Link to={`/profile/${id}`}>
            <img
              className="max-w-none w-40 h-40 lg:w-[16rem] lg:h-[16rem] rounded-2xl"
              height={256}
              width={256}
              loading="lazy"
              src={user?.profileImage || noImg}
              alt={`${user?.firstName ?? "N/A"}'s profile`}
            />
          </Link>
          <div className="flex flex-col w-full gap-6">
            {/* <!--Header--> */}

            <div className="flex items-center justify-between  border-b-2 border-slate-600 pb-4">
              <Link to={`/profile/${id}`}>
                <div className="leading-3">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {user?.firstName ?? "N/A"} {user?.lastName ?? "N/A"}
                  </h2>
                  <p>{user?.contactInfo?.occupation ?? "No occupation"}</p>
                </div>
              </Link>
              {/* Heart Icon */}
              <div>
                <svg id="heart" height="0" width="0">
                  <defs>
                    <clipPath id="svgPath">
                      <path d="M20,35.09,4.55,19.64a8.5,8.5,0,0,1-.13-12l.13-.13a8.72,8.72,0,0,1,12.14,0L20,10.79l3.3-3.3a8.09,8.09,0,0,1,5.83-2.58,8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.13,12l-.13.13Z" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="heart-container">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    className="heart-stroke"
                  >
                    <path d="M20,35.07,4.55,19.62a8.5,8.5,0,0,1-.12-12l.12-.12a8.72,8.72,0,0,1,12.14,0L20,10.77l3.3-3.3A8.09,8.09,0,0,1,29.13,4.9a8.89,8.89,0,0,1,6.31,2.58,8.5,8.5,0,0,1,.12,12l-.12.12ZM10.64,7.13A6.44,6.44,0,0,0,6.07,18.19L20,32.06,33.94,18.12A6.44,6.44,0,0,0,34,9l0,0a6.44,6.44,0,0,0-4.77-1.85A6,6,0,0,0,24.83,9L20,13.78,15.21,9A6.44,6.44,0,0,0,10.64,7.13Z" />
                  </svg>

                  <button
                    className={`${favorited ? "heart-on" : ""} heart-clip`}
                    onClick={() => handleFavoriteToggle()}
                    aria-label={`${
                      favorited ? "Unfavorite" : "Favorite"
                    } user: ${user?.firstName} ${user?.lastName}`}
                  ></button>
                </div>
              </div>
            </div>

            {/* Body? */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <div>
                <h3 className="font-semibold text-lg">Social Media</h3>
                <ul>
                  {user?.socialMedia?.map((item: SocialMediaItem) => {
                    return <li key={item?.id}>{item?.profileURL}</li>;
                  })}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Likes</h3>
                <ul>
                  {user?.likes?.map((item: UserLikeItem) => {
                    return <li key={item?.id}>{item?.name}</li>;
                  })}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Dislikes</h3>
                <ul>
                  {user?.dislikes?.map((item: UserDislikeItem) => {
                    return <li key={item?.id}>{item?.name}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { UserProfileCard };

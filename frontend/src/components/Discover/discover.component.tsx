import axios from "axios";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { useTitle } from "../../hooks/useTitle.hook";
import { User } from "../../models/user.backend.model";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { Loading } from "../Shared/Loading.component";
import { PageLayout } from "../Shared/PageLayout.component";
import { UserProfileCard } from "../Shared/UserProfileCard.component";

const Discover = () => {
  useTitle("Discover - DuckedIn");
  const { currentUser } = useFirebaseAuth();
  const [users, setUsers] = useState<User[]>();
  const [loggedInUser, setLoggedInUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const allUsersData = await axios.get("http://localhost:3001/users");

        // Filter current user
        const filteredUsers = allUsersData.data.filter(
          (user: User) => user.firebaseUid !== currentUser?.uid,
        );

        setUsers(filteredUsers);

        const loggedInUserData = await axios.get(
          `http://localhost:3001/users/profile/${currentUser?.uid}`,
        );

        setLoggedInUser(loggedInUserData.data);
      } catch (e: any) {
        console.log(e);
        const TOAST_ID = "ERROR_LOADING_PROFILES";

        TOAST_SERVICE.error(TOAST_ID, `Unexpected error loading users`, true);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  const layout = () => {
    if (loading) {
      <Loading />;
    } else {
      if (users?.length === 0) {
        return <p>No other users are found...</p>;
      } else {
        return users?.map((user: User) => {
          const favorited = loggedInUser?.favoritedUsers?.find(
            (favId: string) => favId === user?.firebaseUid,
          );
          console.log(user);
          return (
            <UserProfileCard
              key={user?._id}
              id={user?.firebaseUid}
              isFavorited={!!favorited ?? false}
              userFavorites={loggedInUser?.favoritedUsers}
            />
          );
        });
      }
    }
  };

  return (
    <PageLayout header="Discover">
      <div className="flex flex-col gap-6">{layout()}</div>
    </PageLayout>
  );
};

export { Discover };

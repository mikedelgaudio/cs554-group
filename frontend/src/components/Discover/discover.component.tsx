import axios from "axios";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { useTitle } from "../../hooks/useTitle.hook";
import { user } from "../../models/user.backend.model";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { Loading } from "../Shared/Loading.component";
import { PageLayout } from "../Shared/PageLayout.component";
import { UserProfileCard } from "../Shared/UserProfileCard.component";

const Discover = () => {
  useTitle("Discover - DuckedIn");
  const { currentUser } = useFirebaseAuth();
  const [users, setUsers] = useState<user[]>();
  const [loggedInUser, setLoggedInUser] = useState<user>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const allUsersData = await axios.get("http://localhost:3001/users");
        setUsers(allUsersData.data);

        const loggedInUserData = await axios.get(
          `http://localhost:3001/users/profile/${currentUser?.uid}`,
        );

        setLoggedInUser(loggedInUserData.data);

        console.log(allUsersData, loggedInUserData);
      } catch (e: any) {
        const TOAST_ID = "ERROR_LOADING_PROFILES";

        TOAST_SERVICE.error(TOAST_ID, `Unexpected error loading users`, true);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <PageLayout header="Discover">
      <div className="flex flex-col gap-6">
        {loading ? (
          <Loading />
        ) : (
          users?.map((user: user) => {
            const favorited = loggedInUser?.favoritedUsers?.find(
              (favId: string) => favId === user?._id,
            );
            return (
              <UserProfileCard
                key={user?._id}
                id={user?.firebaseUid}
                isFavorited={!!favorited ?? false}
              />
            );
          })
        )}
      </div>
    </PageLayout>
  );
};

export { Discover };

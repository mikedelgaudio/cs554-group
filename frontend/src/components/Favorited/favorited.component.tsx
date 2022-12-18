import axios from "axios";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { useTitle } from "../../hooks/useTitle.hook";
import { user } from "../../models/user.backend.model";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { Loading } from "../Shared/Loading.component";
import { PageLayout } from "../Shared/PageLayout.component";
import { UserProfileCard } from "../Shared/UserProfileCard.component";
import { getRequest } from "../../utils/api.util";

const Favorited = () => {
  useTitle("Favorited - DuckedIn");
  const { currentUser } = useFirebaseAuth();
  const [users, setUsers] = useState<user[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // TODO Update with actual backend URL /users/favorited
        const allUsersData = await getRequest(
          `http://localhost:3001/users/favorited/${currentUser?.uid}`,
          currentUser ? currentUser : undefined,
        );

        // Filter current user
        const filteredUsers = allUsersData.data.filter(
          (user: user) => user.firebaseUid !== currentUser?.uid,
        );

        setUsers(filteredUsers);
      } catch (e: any) {
        const TOAST_ID = "ERROR_LOADING_PROFILES";

        TOAST_SERVICE.error(TOAST_ID, `Unexpected error loading users`, true);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <PageLayout header="Favorited">
      <div className="flex flex-col gap-6">
        {loading ? (
          <Loading />
        ) : (
          users?.map((user: user) => {
            return (
              <UserProfileCard
                key={user?._id}
                id={user?.firebaseUid}
                isFavorited={true}
              />
            );
          })
        )}
      </div>
    </PageLayout>
  );
};

export { Favorited };

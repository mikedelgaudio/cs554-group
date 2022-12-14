import { useEffect, useState } from "react";
import { useFirebaseAuth } from "../../firebase/firebase.context";
import { useTitle } from "../../hooks/useTitle.hook";
import { User } from "../../models/user.backend.model";
import { getRequest } from "../../utils/api.util";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { Loading } from "../Shared/Loading.component";
import { PageLayout } from "../Shared/PageLayout.component";
import { UserProfileCard } from "../Shared/UserProfileCard.component";

const Favorited = () => {
  useTitle("Favorited - DuckedIn");
  const { currentUser } = useFirebaseAuth();
  const [users, setUsers] = useState<User[]>();
  const [removing, setRemoving] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // TODO Update with actual backend URL /users/favorited
        const allUsersData = await getRequest(
          `${import.meta.env?.VITE_API_URL}/users/favorited/${
            currentUser?.uid
          }`,
          currentUser ? currentUser : undefined,
        );
        // Filter current user
        const filteredUsers =
          allUsersData.filter(
            (user: User) => user.firebaseUid !== currentUser?.uid,
          ) ?? [];
        console.log("test ", filteredUsers);
        setUsers(filteredUsers);
      } catch (e: any) {
        const TOAST_ID = "ERROR_LOADING_PROFILES";

        TOAST_SERVICE.error(TOAST_ID, `Unexpected error loading users`, true);
      }
      setLoading(false);
    }

    fetchData();
  }, [removing]);

  const layout = () => {
    if (loading) {
      <Loading />;
    } else {
      if (users?.length === 0) {
        return <p>No favorited users are found...</p>;
      } else {
        return users?.map((user: User) => {
          console.log("hello ", user);
          return (
            <UserProfileCard
              key={user?._id}
              id={user?.firebaseUid}
              isFavorited={true}
              update={setRemoving}
            />
          );
        });
      }
    }
  };

  return (
    <PageLayout header="Favorited">
      <div className="flex flex-col gap-6">{layout()}</div>
    </PageLayout>
  );
};

export { Favorited };

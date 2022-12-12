import axios from "axios";
import { useEffect, useState } from "react";
import { useTitle } from "../../hooks/useTitle.hook";
import { User } from "../../models/user.model";
import { TOAST_SERVICE } from "../../utils/toast.util";
import { Loading } from "../Shared/Loading.component";
import { UserProfileCard } from "../Shared/UserProfileCard.component";

const Discover = () => {
  useTitle("Discover");

  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // TODO Update with actual backend URL
        const { data } = await axios.get("http://localhost:3000/users");
        setUsers(data);
      } catch (e: any) {
        const TOAST_ID = "ERROR_LOADING_PROFILES";

        TOAST_SERVICE.error(TOAST_ID, `Unexpected error loading users`, true);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div id="home" className="relative py-6 bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b-2 pb-6 mb-6 border-slate-500 md:gap-0 md:flex-row md:justify-between md:items-center">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl sm:leading-tight lg:text-5xl lg:leading-tight">
            Discover
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {loading ? (
            <Loading />
          ) : (
            users?.map((user: User) => {
              return <UserProfileCard key={user?.id} id={user?.id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export { Discover };

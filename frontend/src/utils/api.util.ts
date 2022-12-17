import axios from "axios";
import { getIdToken, User } from "firebase/auth";

export const getRequest = async (url: string, user: User) => {
  if (!url) throw "No URL was provided";

  try {
    if (!user) {
      throw "No user is currently signed in";
    }

    const userToken = await user.getIdToken();

    const { data } = await axios.get(url, {
      headers: {
        AuthToken: userToken,
      },
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

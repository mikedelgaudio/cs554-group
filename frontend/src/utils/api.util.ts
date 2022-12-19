import axios from "axios";
import { User } from "firebase/auth";

export const getRequest = async (url: string, user?: User) => {
  if (!url) throw "No URL was provided";

  try {
    if (!user) {
      // If we're not signed in, assume just browsing...
      const { data } = await axios.get(url);
      return data;
    }

    const userToken = await user.getIdToken();

    if (!userToken) {
      throw "Failed to retrieve user token.";
    }

    const { data } = await axios.get(url, {
      headers: {
        token: userToken,
      },
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const postRequest = async (url: string, body: any, user?: User) => {
  if (!url) throw "No URL was provided";

  try {
    if (!user) {
      console.log("Not logged in!");
      // If we're not signed in, assume just browsing...
      throw "Cannot post if not logged in.";
    }
    console.log("Hello");

    const userToken = await user.getIdToken();
    console.log(userToken);
    if (!userToken) {
      throw "Failed to retrieve user token.";
    }

    const { data } = await axios.post(url, body, {
      headers: {
        token: userToken,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (e) {
    console.log(e);
  }
};

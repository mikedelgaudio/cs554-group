import axios from "axios";
import { User } from "firebase/auth";

export const getRequest = async (url: string, user?: User) => {
  if (!url) throw "No URL was provided";

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
};

export const postRequest = async (url: string, body: any, user?: User) => {
  let userToken;
  if (!url) throw "No URL was provided";

  if (user) {
    userToken = await user.getIdToken();
    if (!userToken) {
      throw "Failed to retrieve user token.";
    }
  }

  const { data } = await axios.post(url, body, {
    headers: {
      ...(userToken && { token: userToken }),
      "Content-Type": "application/json",
    },
  });

  return data;
};

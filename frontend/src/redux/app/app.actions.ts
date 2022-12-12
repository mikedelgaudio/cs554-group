import * as types from "./app.types";

export const userFetch = () => {
  return {
    type: types.USER_FETCH,
    payload: {
      fetched: true,
    },
  };
};

export const userFetchSuccess = () => {
  return {
    type: types.USER_FETCH_SUCCESS,
    payload: {
      fetchedError: false,
    },
  };
};

export const userFetchFail = () => {
  return {
    type: types.USER_FETCH_FAIL,
    payload: {
      fetchedError: true,
    },
  };
};

export const toggleUserFavorite = (favoritedUserId: string) => {
  return {
    type: types.TOGGLE_USER_FAVORITE,
    payload: {
      id: favoritedUserId,
    },
  };
};

export const addUserLike = (name: string) => {
  return {
    type: types.ADD_USER_LIKE,
    payload: {
      name,
    },
  };
};

export const deleteUserLike = (likeId: string) => {
  return {
    type: types.DELETE_USER_LIKE,
    payload: {
      likeId,
    },
  };
};

export const addUserDislike = (name: string) => {
  return {
    type: types.ADD_USER_DISLIKE,
    payload: {
      name,
    },
  };
};

export const deleteUserDislike = (dislikeId: string) => {
  return {
    type: types.DELETE_USER_DISLIKE,
    payload: {
      dislikeId,
    },
  };
};

export const addUserSocialMedia = (profileUrl: string) => {
  return {
    type: types.ADD_USER_SOCIAL_MEDIA,
    payload: {
      profileUrl,
    },
  };
};

export const deleteUserSocialMedia = (socialMediaId: string) => {
  return {
    type: types.DELETE_USER_SOCIAL_MEDIA,
    payload: {
      socialMediaId,
    },
  };
};

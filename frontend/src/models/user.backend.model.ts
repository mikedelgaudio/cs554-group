export interface contactInfo {
  phoneNumber: string;
  email: string;
  personalWebsite: string;
  currentRole: string;
}

export interface socialMedia {
  _id: string;
  profileUrl: string;
}
export interface like {
  _id: string;
  like: string;
}
export interface dislike {
  _id: string;
  dislike: string;
}

export interface user {
  _id: any;
  firebaseUid: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  contactInfo: contactInfo;
  socialMedias: Array<socialMedia>;
  likes: Array<like>;
  dislikes: Array<dislike>;
  favoritedUsers: Array<string>;
}

export interface usersI {
  users: Array<user>;
}

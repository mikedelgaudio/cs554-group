export interface SocialMediaItem {
  id: string;
  profileURL: string;
}

export interface UserLikeItem {
  id: string;
  name: string;
}

export interface UserDislikeItem {
  id: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  contactInfo: {
    phoneNumber: string;
    email: string;
    website?: string;
    occupation?: string;
  };
  socialMedia?: SocialMediaItem[];
  likes?: UserLikeItem[];
  dislikes?: UserDislikeItem[];
  favoritedUsers?: string[];
}

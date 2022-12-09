interface contactInfo {
    phoneNumber: string;
    email: string;
    personalWebsite: string;
    currentRole: string;
}


interface socialMedia {
    _id: string;
    profileUrl: string;
}
interface like {
    _id: string;
    like: string;
}
interface dislike {
    _id: string;
    dislike: string;
}


interface user {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    profileImage: string;
    contactInfo: contactInfo;
    socialMedias: Array<socialMedia>;
    likes: Array<like>;
    dislikes: Array<dislike>;
    favoritedUsers: Array<string>;
};

interface users {
    users: Array<user>;
}



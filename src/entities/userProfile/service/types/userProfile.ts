export type UserProfile = {
  aboutMe: string;
  contacts: UserProfileContacts;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: {
    small: string;
    large: string;
  };
};
export type UserProfileContacts = {
  facebook: string;
  website: string;
  vk: string;
  twitter: string;
  instagram: string;
  youtube: string;
  github: string;
  mainLink: string;
};

export type ResponseType<T = {}> = {
  data: T;
  messages: string[];
  resultCode: number;
};

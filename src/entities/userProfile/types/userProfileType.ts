export type UserProfile = {
  userId: number;
  fullName: string;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  photos: {
    small: string;
    large: string;
  };
  contacts: UserSocialContacts;
};

export type UserSocialContacts = {
  facebook?: string | null;
  website?: string | null;
  vk?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  github?: string | null;
  mainLink?: string | null;
};

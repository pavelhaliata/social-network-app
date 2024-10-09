import { UserSocialContacts } from "../../userProfile/types/userProfileType.ts";

export type SocialMedia =
  | "facebook"
  | "website"
  | "vk"
  | "twitter"
  | "instagram"
  | "youtube"
  | "github"
  | "mainLink";

export type EditUserProfile = {
  fullName: string;
  aboutMe: string;
  lookingForAJobDescription: string;
  contacts: UserSocialContacts;
};

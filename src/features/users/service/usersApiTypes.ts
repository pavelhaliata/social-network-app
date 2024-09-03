export type UsersResponse = {
  items: UserInfo[];
  totalCount: number;
  error: string;
};

export type UsersRequest = {
  currentPage?: number;
  pageSize?: number;
  search?: string;
  followed?: boolean | string;
};

export type UserInfo = {
  name: string;
  id: number;
  photos: {
    small: undefined;
    large: undefined;
  };
  status: null;
  followed: boolean;
};

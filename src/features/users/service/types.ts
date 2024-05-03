export type UsersResponse = {
  items: UserType[];
  totalCount: number;
  error: string;
};

export type UsersRequest = {
  currentPage?: number;
  pageSize?: number;
  search?: string;
  followed?: boolean;
};

export type UserType = {
  name: string;
  id: number;
  photos: {
    small: null;
    large: undefined;
  };
  status: null;
  followed: boolean;
};

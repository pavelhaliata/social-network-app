import { useNavigate, useParams } from "react-router-dom";
import {
  useGetUserProfileQuery,
  useGetUserStatusQuery,
} from "../service/userProfileApi.ts";
import { Flex } from "antd";
import { useEffect } from "react";

type Props = {};

export const UserProfile = ({}: Props) => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useGetUserProfileQuery(Number(userId));
  const { data: userStatus } = useGetUserStatusQuery(Number(userId));
  console.log(user);
  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  return (
    <Flex gap={50}>
      <div>
        <img
          src={user?.photos.large}
          alt="user logo"
          width={200}
          height={200}
          style={{ maxWidth: 200, width: "100%" }}
        />
      </div>
      <div>
        <div>
          <span style={{ fontWeight: 600 }}>Status: </span>
          <span>{userStatus}</span>
        </div>
        <div>
          <span style={{ fontWeight: 600 }}>Full Name: </span>
          <span>{user?.fullName}</span>
        </div>
        <a href={user?.contacts.github} target="_blank">
          GitHub
        </a>
      </div>
    </Flex>
  );
};

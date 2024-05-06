import { useNavigate, useParams } from "react-router-dom";
import { useGetUserProfileQuery } from "../service/userProfileApi.ts";
import { Card, Flex } from "antd";
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
  useEffect(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  return (
    <Flex justify="center">
      <Card title={user?.fullName} style={{ maxWidth: 550, width: "100%" }}>
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
          <div>{user?.aboutMe}</div>
          <div>{user?.lookingForAJobDescription}</div>
          <a href={user?.contacts.github} target="_blank">
            GitHub
          </a>
          <div>{user?.contacts.mainLink}</div>
        </div>
      </Card>
    </Flex>
  );
};

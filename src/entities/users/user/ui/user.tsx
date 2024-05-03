import React from "react";
import { UserType } from "../../../../features/users/service/types.ts";
import { Card, Flex, Typography } from "antd";

type Props = {
  user: UserType;
  isLoading: boolean;
};
const { Title } = Typography;

const cardStyle: React.CSSProperties = {
  width: 420,
};

const imgStyle: React.CSSProperties = {
  display: "block",
  width: 160,
};

export const User = ({ user, isLoading }: Props) => {
  return (
    <Card
      loading={isLoading}
      key={user.id}
      hoverable
      style={cardStyle}
      styles={{ body: { padding: 0, overflow: "hidden" } }}
    >
      <Flex justify="space-between">
        <img alt="avatar" src={user.photos.large} style={imgStyle} />
        <Flex
          vertical
          align="flex-end"
          justify="space-between"
          style={{ padding: 32 }}
        >
          <Title level={4}>{user.name}</Title>
          <Title level={5}>{user.status}</Title>
        </Flex>
      </Flex>
    </Card>
  );
};

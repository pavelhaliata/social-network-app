import { Button } from "antd";
import { useGetUsersQuery } from "../service/usersApi.ts";

import React, { useState } from "react";

export const Users = React.memo(() => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [friends, setFriends] = useState<boolean>(false);

  const { data = [], isLoading } = useGetUsersQuery({ currentPage, friends });

  return (
    <div>
      <h1>users:</h1>
      {JSON.stringify(data, null, 2)}
      <Button
        type="primary"
        loading={isLoading}
        onClick={() => {
          setCurrentPage((prevState) => prevState + 1);
        }}
      >
        next page
      </Button>
      <br />
      <Button
        type="primary"
        onClick={() => {
          setFriends((prevState) => !prevState), setCurrentPage(1);
        }}
      >
        only friends
      </Button>
    </div>
  );
});

import React, { ChangeEvent, useState } from "react";
import { useGetUsersQuery } from "../api/usersApi.ts";
import { Button, Flex, Input, Pagination, Select } from "antd";
import { UserCard } from "../../../entities/userProfile";
import { useSearchParams } from "react-router-dom";

export const Users = React.memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("count")) || 10;
  const search = searchParams.get("term") || "";
  const followed =
    searchParams.get("friend") === "true"
      ? true
      : searchParams.get("friend") === "false"
      ? false
      : undefined; // TODO: исправить тип

  const [inputValue, setInputValue] = useState<string>(search);

  const { data, isLoading } = useGetUsersQuery({
    currentPage,
    pageSize,
    search,
    followed,
  });

  const totalCount = data?.totalCount;
  const users = data?.items;

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const searchUsersHandler = () => {
    setSearchParams({
      page: String(currentPage),
      count: String(pageSize),
      term: inputValue,
      friend: followed !== null ? String(followed) : "",
    });
  };

  const pageChangeHandler = (page: number, pageSize: number) => {
    setSearchParams({
      page: String(page),
      count: String(pageSize),
      term: inputValue,
      friend: followed !== null ? String(followed) : "",
    });
  };

  const followChangeHandler = (value: boolean | null) => {
    setSearchParams({
      page: String(currentPage),
      count: String(pageSize),
      term: inputValue,
      friend: value !== null ? String(value) : "",
    });
  };

  return (
    <div>
      <Flex gap={10} className="mb-10">
        <form className="flex gap-2.5 w-full">
          <Input
            variant="filled"
            placeholder="Search users"
            value={inputValue}
            onChange={onChangeHandler}
          />
          <Button
            type="primary"
            onClick={searchUsersHandler}
            className="max-w-[200px] w-full"
          >
            Search
          </Button>
        </form>
        <Select
          defaultValue={followed}
          className="max-w-[120px] w-full"
          loading={isLoading}
          onChange={followChangeHandler}
          options={[
            { value: "", label: "All" },
            { value: true, label: "Follow" },
            { value: false, label: "Unfollow" },
          ]}
        />
      </Flex>
      <div className="max-w-full text-center mb-10">
        <Pagination
          total={totalCount}
          showSizeChanger
          showQuickJumper
          pageSize={pageSize}
          current={currentPage}
          showTotal={(total) => `Total ${total} users`}
          onChange={pageChangeHandler}
        />
      </div>

      <Flex wrap="wrap" gap="small" align="center" justify="center">
        {users?.map((user) => (
          <UserCard key={user.id} user={user} isLoading={isLoading} />
        ))}
      </Flex>
    </div>
  );
});

import React, { ChangeEvent, useState } from "react";
import { useGetUsersQuery } from "../service/usersApi.ts";
import { Button, Flex, Input, Pagination, Select } from "antd";
import { User } from "../../../entities/users";

export const Users = React.memo(() => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [followed, setFollowed] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState(10);
  const [inputValue, setInputValue] = useState<string>("");
  const [search, setTerm] = useState("");

  const { data, isLoading } = useGetUsersQuery({
    currentPage,
    followed,
    pageSize,
    search,
  });
  const totalCount = data?.totalCount;
  const users = data?.items;
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const searchUsersHandler = () => {
    if (inputValue) {
      setTerm(inputValue);
      setInputValue("");
    } else {
      alert("please enter the name");
    }
  };

  return (
    <div>
      <Flex gap={10} style={{ marginBottom: 40 }}>
        <form
          style={{
            display: "flex",
            gap: 10,
            width: "100%",
          }}
        >
          <Input
            width={900}
            variant="filled"
            placeholder="Serch users"
            value={inputValue}
            onChange={onChangeHandler}
          />
          <Button
            style={{ width: 200 }}
            type="primary"
            onClick={searchUsersHandler}
          >
            Search
          </Button>
        </form>
        <Select
          defaultValue={followed}
          style={{ width: 120 }}
          loading={isLoading}
          onChange={(value) => {
            setFollowed(value);
          }}
          options={[
            { value: "", label: "All" },
            { value: true, label: "Follow" },
            {
              value: false,
              label: "UnFollow",
            },
          ]}
        />
      </Flex>
      <div style={{ maxWidth: "100%", textAlign: "center", marginBottom: 40 }}>
        <Pagination
          total={totalCount}
          showSizeChanger
          showQuickJumper
          pageSize={pageSize}
          defaultCurrent={1}
          current={currentPage}
          showTotal={(total) => `Total ${total} users`}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>

      <Flex wrap="wrap" gap="small" align="center" justify="center">
        {users?.map((user) => (
          <User key={user.id} user={user} isLoading={isLoading} />
        ))}
      </Flex>
    </div>
  );
});

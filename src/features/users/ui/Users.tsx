import React, { ChangeEvent, useState } from "react";
import { useGetUsersQuery } from "../service/usersApi.ts";
import { Button, Flex, Input, Pagination, Select } from "antd";
import { UserCard } from "../../../entities/users";
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
      : "";

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

  const handlePageChange = (page: number, pageSize: number) => {
    setSearchParams({
      page: String(page),
      count: String(pageSize),
      term: inputValue,
      friend: followed !== null ? String(followed) : "",
    });
  };

  const handleFollowChange = (value: boolean | null) => {
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
            style={{ maxWidth: 200, width: "100%" }}
            type="primary"
            onClick={searchUsersHandler}
          >
            Search
          </Button>
        </form>
        <Select
          defaultValue={followed}
          className="max-w-[120px] w-full"
          loading={isLoading}
          onChange={handleFollowChange}
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
          onChange={handlePageChange}
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

// import React, { ChangeEvent, useState } from "react";
// import { useGetUsersQuery } from "../service/usersApi.ts";
// import { Button, Flex, Input, Pagination, Select } from "antd";
// import { UserCard } from "../../../entities/users";
//
// export const Users = React.memo(() => {
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [followed, setFollowed] = useState<boolean>(true);
//   const [pageSize, setPageSize] = useState(10);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [search, setTerm] = useState("");
//
//   const { data, isLoading } = useGetUsersQuery({
//     currentPage,
//     followed,
//     pageSize,
//     search,
//   });
//   const totalCount = data?.totalCount;
//   const users = data?.items;
//   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value);
//   };
//   const searchUsersHandler = () => {
//     if (inputValue) {
//       setTerm(inputValue);
//       // setInputValue("");
//     } else {
//       alert("please enter the name");
//     }
//   };
//
//   return (
//     <div>
//       <Flex gap={10} className="mb-10">
//         <form className="flex gap-2.5 w-full">
//           <Input
//             variant="filled"
//             placeholder="Serch users"
//             value={inputValue}
//             onChange={onChangeHandler}
//           />
//           <Button
//             style={{ maxWidth: 200, width: "100%" }}
//             type="primary"
//             onClick={searchUsersHandler}
//           >
//             Search
//           </Button>
//         </form>
//         <Select
//           defaultValue={followed}
//           className="max-w-[120px] w-full"
//           loading={isLoading}
//           onChange={(value) => {
//             setFollowed(value);
//           }}
//           options={[
//             { value: "", label: "All" },
//             { value: true, label: "Follow" },
//             {
//               value: false,
//               label: "UnFollow",
//             },
//           ]}
//         />
//       </Flex>
//       <div className="max-w-full text-center mb-10">
//         <Pagination
//           total={totalCount}
//           showSizeChanger
//           showQuickJumper
//           pageSize={pageSize}
//           defaultCurrent={1}
//           current={currentPage}
//           showTotal={(total) => `Total ${total} users`}
//           onChange={(page, pageSize) => {
//             setCurrentPage(page);
//             setPageSize(pageSize);
//           }}
//         />
//       </div>
//
//       <Flex wrap="wrap" gap="small" align="center" justify="center">
//         {users?.map((user) => (
//           <UserCard key={user.id} user={user} isLoading={isLoading} />
//         ))}
//       </Flex>
//     </div>
//   );
// });

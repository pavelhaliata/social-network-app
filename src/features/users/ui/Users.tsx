import {useGetUsersQuery} from "../service/users.ts";
import React, {useState} from "react";

export const Users = React.memo(() => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [friends, setFriends] = useState<boolean>(false)

    const {data = []} = useGetUsersQuery({currentPage, friends})
    console.log(data)

    return (
        <div>
            <h1>users:</h1>
            {JSON.stringify(data, null, 2)}
            <button onClick={()=>{setCurrentPage((prevState)=>(prevState+1))}}>next page</button>
            <button onClick={()=>{setFriends((prevState)=>(!prevState)), setCurrentPage(1)}}>only friends</button>
        </div>
    );
});


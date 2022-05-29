import React from "react";
import Spinner from "../Shared/Spinner/Spinner";
import UserRow from "./UserRow";
import { useQuery } from "react-query";
const MakeAdmin = () => {
  const url = `http://localhost:5001/user`;

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <h2 className="text-3xl text-center capitalize ">
        total users: {users.length}
      </h2>
      {users.map((user) => (
        <UserRow key={user._id} user={user} refetch={refetch} />
      ))}
    </div>
  );
};

export default MakeAdmin;

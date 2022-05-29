import React from "react";
import { toast } from "react-toastify";

const UserRow = ({ user, refetch }) => {
  const email = user.email;

  const makeAdmin = () => {
    const url = `https://intense-sierra-47612.herokuapp.com/user/admin/${email}`;
    fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success(`Successfully made an admin`);
        }
      });
  };
  return (
    <div key={user._id} className="card-container">
      <div className="card-left">
        <h3 className="text-2xl ">
          <span className="text-blue-400 font-semibold capitalize">user: </span>
          {user.email}
        </h3>
      </div>
      <div className="card-right">
        <>
          {user.role !== "admin" && (
            <button onClick={makeAdmin} class="btn btn-sm btn-success">
              Make Admin
            </button>
          )}
        </>
      </div>
    </div>
  );
};

export default UserRow;

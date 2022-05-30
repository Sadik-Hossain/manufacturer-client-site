import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Spinner from "../Shared/Spinner/Spinner";

const MyProfile = () => {
  const [user, error] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    fetch(`https://intense-sierra-47612.herokuapp.com/user/${user.email}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Spinner />;
  }
  const handlSubmit = (e) => {
    e.preventDefault();
    const UserDetail = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: e.target.address.value,
      education: e.target.education.value,
      phone: e.target.phone.value,
      link: e.target.link.value,
    };
    console.log(UserDetail);
    const proceed = window.confirm("are you sure?");
    if (proceed) {
      setLoading(true);
      const url = `https://intense-sierra-47612.herokuapp.com/user/${user.email}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(UserDetail),
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(
            `https://intense-sierra-47612.herokuapp.com/user/${user.email}`,
            {
              method: "GET",
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              setLoading(false);
            });
        });

      toast.success("profile updated");
      e.target.reset();
    } else {
      toast.warning("updating canceled");
    }
  };
  return (
    <div>
      <div
        style={{ border: "2px solid #000" }}
        class="card max-w-md mx-auto bg-base-100 shadow-xl"
      >
        <div class="card-body">
          <h2 class="text-2xl font-semibold text-center">Profile Info</h2>
          <p>
            <span className="font-semibold">Name:</span> {user.displayName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Education: </span>
            {data?.education}
          </p>
          <p>
            <span className="font-semibold">Location: </span>
            {data?.address}
          </p>
          <p>
            <span className="font-semibold">Link: </span>
            {data?.link}
          </p>
          <p>
            <span className="font-semibold">phone: </span>
            {data?.phone}
          </p>
        </div>
      </div>
      <div style={{ border: "2px solid" }} className="register-form">
        <form onSubmit={handlSubmit}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <label>Name</label>
            <input type="text" name="name" value={user?.displayName} disabled />
            <label>Email</label>
            <input type="email" name="email" value={user?.email} disabled />
            <label>your address</label>
            <input
              type="text"
              name="address"
              required
              placeholder="your address"
            />
            <label>Education </label>

            <input type="text" name="education" placeholder="education"></input>
            <label>Phone </label>

            <input type="tel" name="phone" placeholder="your phone"></input>
            <label>LinkedIn Link </label>

            <input type="url" name="link" placeholder="linkedin "></input>
          </div>
          <div className="flex">
            <input
              type="submit"
              className="btn  w-20  mx-auto my-5"
              value="update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;

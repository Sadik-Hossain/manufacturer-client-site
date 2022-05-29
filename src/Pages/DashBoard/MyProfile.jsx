import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const MyProfile = () => {
  const [user, error] = useAuthState(auth);
  const handlSubmit = (e) => {
    e.preventDefault();

    const UserReview = {
      name: e.target.name.value,
      email: e.target.email.value,
      address: e.target.address.value,
      education: e.target.education.value,
      link: e.target.link.value,
    };
    console.log(UserReview);
    toast.success("profile updated");
  };
  return (
    <div>
      <h1 className="text-3xl mt-8 text-center capitalize">my profile</h1>
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

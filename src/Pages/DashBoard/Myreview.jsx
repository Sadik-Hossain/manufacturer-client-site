import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Myreview = () => {
  const [user, error] = useAuthState(auth);
  const handlSubmit = (e) => {
    e.preventDefault();

    const UserReview = {
      name: e.target.name.value,
      email: e.target.email.value,
      review: e.target.review.value,
      ratings: e.target.ratings.value,
    };
    console.log(UserReview);
  };
  return (
    <div>
      <h1 className="text-3xl text-center capitalize">my review</h1>
      <div className="register-form">
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
            <label>Ratings (out of 5)</label>
            <input
              type="number"
              name="ratings"
              min="1"
              max="5"
              required
              placeholder="your ratings for the products"
            />
            <label>Say something </label>

            <textarea
              name="review"
              rows="7"
              placeholder="say something"
              style={{ border: "2px solid" }}
              required
            ></textarea>
          </div>
          <div className="flex">
            <input
              type="submit"
              className="btn btn-warning  w-20  mx-auto my-5"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Myreview;

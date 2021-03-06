import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const Myreview = () => {
  const [user, error] = useAuthState(auth);
  const handlSubmit = (e) => {
    e.preventDefault();

    const UserReview = {
      name: e.target.name.value,
      email: e.target.email.value,
      product: e.target.product.value,
      review: e.target.review.value,
      ratings: e.target.ratings.value,
    };
    console.log(UserReview);
    fetch(`https://intense-sierra-47612.herokuapp.com/reviews`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UserReview),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    toast.success("Thanks for review ");
    e.target.reset();
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
            <label>Product</label>
            <input type="text" name="product" required />
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

import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Testimonial from "./Testimonial";
import "./Home.css";
import { toast } from "react-toastify";
import Spinner from "../Shared/Spinner/Spinner";
import Parts from "../Parts/Parts";
import BuisnessSummary from "./BuisnessSummary";
import { MdGrade } from "react-icons/md";

const Home = () => {
  const [items, setItems] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("https://intense-sierra-47612.herokuapp.com/parts")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("https://intense-sierra-47612.herokuapp.com/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonial(data);
      });
  }, []);
  useEffect(() => {
    fetch("https://intense-sierra-47612.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  if (loading) {
    return <Spinner />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    toast("Thank you for subscribing");
  };
  return (
    <div>
      {/* 
      //* ---------- Banner ------------
      */}
      <Banner />
      {/*  //* ------- parts card section-------
       */}
      <h1 className="text-3xl text-center font-semibold mt-5">
        Computer Parts
      </h1>
      <div className="inventory-section">
        {items.map((item) => (
          <Parts key={item._id} item={item}></Parts>
        ))}
      </div>
      {/* //* -------- Buisness summary --------
       */}
      <div style={{ margin: "5rem 0" }}>
        <h1 className="text-3xl font-bold text-center ">
          Our Buisness Summary
        </h1>
        <BuisnessSummary />
      </div>
      {/* //* --------- product review ---------
       */}
      <h1 className="text-3xl text-center font-semibold">
        <div class="divider"></div>
        Reviews from our Users
      </h1>
      <div
        style={{ padding: "0 3rem" }}
        className="featured-section inventory-section"
      >
        {reviews.map((r) => (
          <div
            style={{
              border: "2px solid  ",
              padding: "1.5rem",
              borderRadius: ".5rem",
              background: "#FFF",
              color: "black",
              boxShadow: "  .5rem .8rem  rgba(0, 0, 0, 1)",
              margin: "10rem 0",
            }}
            key={r._id}
          >
            <p>
              <span className="font-semibold"> Name: </span> {r.name}
            </p>
            <p>
              <span className="font-semibold"> Product: </span> {r.product}
            </p>
            <p className="flex items-center">
              <span className="font-semibold"> ratings: </span> {r.ratings}
              <span>
                <MdGrade style={{ color: "gold" }} />
              </span>
            </p>
            <p>
              <span className="font-semibold">comment:</span> {r.review}
            </p>
          </div>
        ))}
      </div>

      {/* //* ---------- bonus section ------------
       */}
      {/* //* testimonial */}
      <div class="divider"></div>
      <h1 className="text-3xl font-bold text-center ">
        See What Our Client Say About Us
      </h1>
      <div
        style={{ padding: "0 3rem" }}
        className="featured-section inventory-section"
      >
        {testimonial.map((t) => (
          <Testimonial key={t._id} t={t}></Testimonial>
        ))}
      </div>
      {/* //* newletter */}
      <div
        style={{
          boxShadow: " 1rem 1rem 0px rgba(0, 0, 0, 1)",
          border: "2px solid #000",
          width: "65%",
        }}
        className=" register-form"
      >
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl text-center font-semibold mb-3">
            Subscribe to our daily newletter!!
          </h1>
          <input type="email" placeholder="your email" />
          <input
            className="font-semibold"
            style={{
              background: "#476c75",

              color: "white",
            }}
            type="submit"
            value="keep me in touch"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;

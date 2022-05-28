import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Testimonial from "./Testimonial";
import "./Home.css";
import { toast } from "react-toastify";
import Spinner from "../Shared/Spinner/Spinner";
import Parts from "../Parts/Parts";
const Home = () => {
  const [items, setItems] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5001/parts")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    fetch("testimonials.json")
      .then((res) => res.json())
      .then((data) => {
        setTestimonial(data);
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

      <div className="inventory-section">
        {items.map((item) => (
          <Parts key={item._id} item={item}></Parts>
        ))}
      </div>
      {/* //* -------- Buisness summary --------
       */}

      {/* //* --------- product review ---------
       */}

      {/* //* ---------- bonus section ------------
       */}
      {/* //* testimonial */}
      <h1
        style={{
          textAlign: "center",
          margin: "5rem 0",
        }}
      >
        See What Our Client Say About Us
      </h1>
      <div className="featured-section inventory-section">
        {testimonial.map((t) => (
          <Testimonial key={t._id} t={t}></Testimonial>
        ))}
      </div>
      {/* //* newletter */}
      <div
        style={{
          boxShadow: " 1rem 1rem 0px rgba(0, 0, 0, 1)",
          border: "2px solid #000",
        }}
        className=" register-form"
      >
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>
            Subscribe to our daily newletter!!
          </h1>
          <input type="email" placeholder="your email" />
          <input
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

import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Testimonial from "./Testimonial";
import "./Home.css";
import { toast } from "react-toastify";
const Home = () => {
  const [testimonial, setTestimonial] = useState([]);
  useEffect(() => {
    fetch("testimonials.json")
      .then((res) => res.json())
      .then((data) => {
        setTestimonial(data);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    toast("Thank you for subscribing");
  };
  return (
    <div>
      <h1>This is Home</h1>
      {/* 
      //* ---------- Banner ------------
      */}
      <Banner />
      {/*  //* ------- parts card section-------
       */}

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
      <div className="newletter-section register-form">
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center" }}>
            Subscribe to our daily newletter!!
          </h1>
          <input type="email" placeholder="your email" />
          <input
            style={{ background: "#476c75", color: "white" }}
            type="submit"
            value="keep me in touch"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;

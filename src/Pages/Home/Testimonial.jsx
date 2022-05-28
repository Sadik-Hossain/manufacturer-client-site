import React from "react";

const Testimonial = ({ t }) => {
  return (
    <div
      style={{
        border: "2px solid  ",
        padding: "1.5rem",
        borderRadius: ".5rem",
        background: "#FFC7A0",
        color: "black",
        boxShadow: "  .5rem .8rem  rgba(0, 0, 0, 1)",
        margin: "10rem 0",
      }}
    >
      <img
        style={{
          border: "2px solid #2F4858 ",
          borderRadius: "50%",
          width: "64px",
        }}
        src={t.img}
        alt=""
      />
      <h1>{t.name}</h1>
      <h3>company: {t.company}</h3>
      <p>{t.about}</p>
    </div>
  );
};

export default Testimonial;

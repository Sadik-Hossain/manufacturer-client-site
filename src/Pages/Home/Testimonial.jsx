import React from "react";

const Testimonial = ({ t }) => {
  return (
    <div
      style={{
        border: "2px solid #2F4858 ",
        padding: "1.5rem",
        borderRadius: "1.5rem",
        background: "#FFC7A0",
        color: "black",
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

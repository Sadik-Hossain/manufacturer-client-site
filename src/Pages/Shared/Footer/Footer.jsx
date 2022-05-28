import React from "react";
import "./Footer.css";
const Footer = () => {
  const urlPlayStore = `https://i.ibb.co/yyQ4t6c/google-play.png`;
  const urlAppStore = `https://i.ibb.co/tmQ6hnh/app-store.png`;
  return (
    <div className="footer-container">
      <h1 style={{ color: "#fefedf" }}>Computer Zone</h1>
      <p>
        <small>
          copyright
          <span dangerouslySetInnerHTML={{ __html: "&copy;" }}></span>
          {new Date().getFullYear()}
        </small>
        <br />
        <small>All rights reserved</small>
      </p>
      <div>
        <a href="#">
          <img style={{ marginRight: "1rem" }} src={urlPlayStore} alt="" />
        </a>
        <a href="#">
          <img src={urlAppStore} alt="" />
        </a>
      </div>
    </div>
  );
};

export default Footer;

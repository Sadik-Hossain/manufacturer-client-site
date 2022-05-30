import React from "react";

const Banner = () => {
  const url = `https://www.osstuff.com/wp-content/uploads/2018/10/New-Refurbished-Banner.jpg`;
  return (
    <div>
      <img style={{ width: "100%" }} src={url} alt="" />
    </div>
  );
};

export default Banner;

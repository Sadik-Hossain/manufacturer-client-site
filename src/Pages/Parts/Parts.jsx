import React from "react";
import { useNavigate } from "react-router-dom";

const Parts = ({ item }) => {
  const { _id, name, img, description, price, minQty, available } = item;
  const navigate = useNavigate();
  const navigateToInventoryDetail = (id) => {
    navigate(`/parts/${id}`);
  };
  return (
    <div
      style={{
        background: "#fff",
        padding: "1rem 2rem",
        border: "2px solid #000",
      }}
    >
      <img src={img} alt="" />
      <h1>{name}</h1>
      <p>{description}</p>
      <p>available: {available}</p>

      <p>price per unit: ${price}</p>
      <button
        onClick={() => navigateToInventoryDetail(_id)}
        className="primary-btn"
      >
        Place Orders
      </button>
    </div>
  );
};

export default Parts;

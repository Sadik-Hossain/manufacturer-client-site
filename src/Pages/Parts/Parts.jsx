import React from "react";
import { useNavigate } from "react-router-dom";

const Parts = ({ item }) => {
  const { _id, name, img, description, price, minQty, available } = item;
  const navigate = useNavigate();
  const navigateToInventoryDetail = (id) => {
    navigate(`/purchase/${id}`);
  };
  return (
    <div
      style={{
        width: "90%",
        background: "#fff",
        padding: "1rem 2rem",
        border: "2px solid #000",
        borderRadius: "1rem",
        boxShadow: " 1rem 1rem 0px rgba(0, 0, 0, 1)",
        marginTop: "3rem",
      }}
    >
      <img src={img} alt="" />
      <h1 className="text-2xl font-bold">{name}</h1>
      <p>{description}</p>
      <p>
        <span className="font-bold">available:</span> {available}
      </p>

      <p>
        <span className="font-bold">price per unit:</span> ${price}
      </p>
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

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../Shared/Spinner/Spinner";
import "./PartsDetails.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";

const InventoryDetails = () => {
  const { itemId } = useParams();
  const [user, error] = useAuthState(auth);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);

  const [loading1, setLoading1] = useState(false);
  const { _id, name, img, description, price, available, minQty } = detail;
  const url = `https://intense-sierra-47612.herokuapp.com/parts/${itemId}`;

  useEffect(() => {
    setLoading1(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDetail(data);
        setLoading1(false);
      });
  }, []);
  if (loading1) {
    return <Spinner />;
  }

  //* ============ quantity update & send order to db ==========
  const handleAdd = (e) => {
    e.preventDefault();

    const username = e.target.name.value;
    const email = e.target.email.value;
    const address = e.target.address.value;
    const quantity = e.target.quantity.value;
    const amount = Number(price) * Number(quantity);
    const newAvailable = Number(available) - Number(quantity);

    // * order data
    const orderData = {
      product: name,
      productId: _id,
      img: img,
      quantity: quantity,
      pricePerUnit: price,
      cost: amount,
      username: username,
      email: email,
      address: address,
    };

    const data = {
      newAvailable,
    };

    const url = `https://intense-sierra-47612.herokuapp.com/parts/${itemId}`;
    //* send data to the server

    if (quantity >= 1) {
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("success", data);
          e.target.reset();
          // //* load updated data
          setLoading(true);
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              setDetail(data);
              setLoading(false);
            });
        });
      toast.success("Order success");
      fetch(`https://intense-sierra-47612.herokuapp.com/order`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  return (
    <div>
      <div className="detail-card">
        <div style={{ flexGrow: "2" }}>
          <img style={{ width: "50%", height: "auto" }} src={img} alt="" />
        </div>
        <div style={{ padding: "0 1rem" }}>
          <h2>{name}</h2>
          <p className="detail-text">item id: {itemId}</p>
          <p className="detail-text">price: ${price}</p>
          <p className="detail-text">minimum quantity to order: {minQty}</p>
          <p className="detail-text">
            available : {loading ? "updating..." : available}
          </p>
          <p className="detail-text">
            description : <small>{description}</small>
          </p>
        </div>
      </div>

      {/* 
      //* ============ order form ==================
      */}
      <div className="register-form">
        <form onSubmit={handleAdd}>
          <label>Name</label>
          <input type="text" name="name" value={user?.displayName} disabled />
          <label>Email</label>
          <input type="email" name="email" value={user?.email} disabled />
          <label>Address</label>
          <input type="text" name="address" placeholder="your address" />
          <label>quantity</label>
          <input
            type="number"
            name="quantity"
            pattern="^[0-9]"
            required
            max={available}
            min={minQty}
          />

          <input type="submit" value="Order" placeholder="quantity" />
        </form>
      </div>
    </div>
  );
};

export default InventoryDetails;

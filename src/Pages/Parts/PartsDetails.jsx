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
  const [d, setD] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const { name, img, description, price, available, minQty } = detail;
  const url = `http://localhost:5001/parts/${itemId}`;

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

  //* =========== deliver funcion =====================
  const handleDeliver = (e) => {
    e.preventDefault();
    const number = Number(e.target.number.value);
    console.log(number);
    //* send data to the server
    // fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("success", data);
    //     //* load updated data
    //     setLoading(true);
    //     fetch(url)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setDetail(data);
    //         setLoading(false);
    //       });
    //   });
  };

  //* =============== restock function ================
  const handleAdd = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const number = e.target.number.value;

    console.log(name, email, number);
    //* send data to the server
    // fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("success", data);
    //     e.target.reset();
    //     //* load updated data
    //     setLoading(true);
    //     fetch(url)
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setDetail(data);
    //         setLoading(false);
    //       });
    //   });
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
          {/* <p className="detail-text">
            description : <small>{description}</small>
          </p> */}
        </div>
      </div>
      {/* 
      //* ============= deliver service =======================
      */}
      {/* <form onSubmit={handleDeliver}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <input type="number" name="number" pattern="^[0-9]" min="1" />
          <input
            type="submit"
            value="order"
            style={{
              display: "block",
              //   background: "#000",
              //   color: "white",
              padding: " 1rem",
            }}
          ></input>
        </div>
      </form> */}
      {/* 
      //* ============ restock form ==================
      */}
      <div className="register-form">
        <form onSubmit={handleAdd}>
          <input type="text" name="name" value={user?.displayName} disabled />

          <input type="email" name="email" value={user?.email} disabled />
          <input type="text" name="address" placeholder="your address" />
          <input
            type="number"
            name="number"
            pattern="^[0-9]"
            max={available}
            min={minQty}
          />
          <input
            style={{ background: "#000", color: "white" }}
            type="submit"
            value="Order"
            placeholder="quantity"
          />
        </form>
      </div>
    </div>
  );
};

export default InventoryDetails;

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Spinner from "../Shared/Spinner/Spinner";
import "./MyOrder.css";

const MyOrder = () => {
  const [user, uLoading] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const email = user.email;
    const url = `http://localhost:5001/order?email=${email}`;
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data);
        setLoading(false);
      });
  }, [user]);
  if (uLoading || loading) {
    return <Spinner />;
  }
  // const handlePayment = (id, email) => {

  // };
  return (
    <div>
      <h1 className="text-3xl text-center">My items: {items.length}</h1>
      {items.map((item) => (
        <div key={item._id} className="card-container">
          <div className="card-left">
            <img
              style={{ width: "64px", height: "64px" }}
              src={item.img}
              alt=""
            />
            <h3>product name: {item.product}</h3>
            <h4>quantity: {item?.quantity}</h4>
          </div>
          <div className="card-right">
            <>
              {item.paid ? (
                <p
                  style={{
                    color: "#28a745 ",
                    fontWeight: "bold",
                  }}

                  // onClick={() => handlePayment(item._id, item.email)}
                >
                  Paid
                </p>
              ) : (
                <>
                  <button
                    className="danger-btn"
                    // onClick={() => handlePayment(item._id, item.email)}
                  >
                    Pay
                  </button>
                  <button
                    className="danger-btn"
                    // onClick={() => handlePayment(item._id, item.email)}
                  >
                    cancel
                  </button>
                </>
              )}
            </>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;

import React, { useEffect, useState } from "react";
import Spinner from "../Shared/Spinner/Spinner";
import auth from "../../firebase.init";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const url = `https://intense-sierra-47612.herokuapp.com/order`;
    setLoading(true);
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setOrders(data);
        setLoading(false);
      });
  }, []);
  console.log(orders);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="text-center text-3xl">All orders: {orders.length}</h1>
      {orders.map((order) => (
        <div key={order._id} className="card-container">
          <div className="card-left">
            <img
              style={{ width: "64px", height: "64px" }}
              src={order.img}
              alt=""
            />
            <div className="text-center ">
              <h3 className="font-bold text-xl capitalize">
                product name: {order?.product}
              </h3>
              <h4 className="font-bold capitalize">
                Purchaser: {order?.username}
              </h4>
              <h4 className=" font-bold capitalize">email: {order?.email}</h4>
              <h4 className="text-xl capitalize">
                quantity: {order?.quantity} pcs
              </h4>
              <h4 className=" capitalize">
                price per unit: ${order?.pricePerUnit}
              </h4>
              <h4 className=" capitalize">cost: ${order?.cost}</h4>
            </div>
          </div>
          <div>
            <>
              {order?.cost && order?.paid ? (
                <>
                  <p
                    style={{
                      color: "#28a745 ",
                      fontWeight: "bold",
                    }}
                  >
                    Paid
                  </p>

                  <p>
                    TRXid:{" "}
                    <span className="text-success">{order?.transactionId}</span>
                  </p>
                </>
              ) : (
                <>
                  <Link to={`/dashboard/payment/${order._id}`}>
                    <button className="btn btn-success">pay</button>
                  </Link>
                  <button
                    className="danger-btn"
                    onClick={() => handleDelete(order._id, order.email)}
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

export default AllOrder;

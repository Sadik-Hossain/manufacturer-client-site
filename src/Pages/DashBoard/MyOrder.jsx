import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Spinner from "../Shared/Spinner/Spinner";
import "./MyOrder.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const MyOrder = () => {
  const [user, uLoading] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const email = user.email;

    setLoading(true);
    fetch(`https://intense-sierra-47612.herokuapp.com/myorder?email=${email}`, {
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
  }, [user]);
  console.log(orders);
  if (uLoading || loading) {
    return <Spinner />;
  }
  const handleDelete = (id, email) => {
    console.log(id, email);
    const proceed = window.confirm("are you sure?");
    if (proceed) {
      toast.success("delete suceess");
      setLoading(true);
      fetch(`https://intense-sierra-47612.herokuapp.com/order/${id}`, {
        method: "DELETE",
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
          //* refetching
          fetch(
            `https://intense-sierra-47612.herokuapp.com/myorder?email=${email}`,
            {
              method: "GET",
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
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
        });
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center">My orders: {orders.length}</h1>
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
              <h4 className="text-xl capitalize">
                quantity: {order?.quantity} pcs
              </h4>
              <h4 className="text-xl capitalize">
                price per unit: ${order?.pricePerUnit}
              </h4>
              <h4 className="text-xl capitalize">cost: ${order?.cost}</h4>
            </div>
          </div>
          <div className="card-right">
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
                    Transaction id:{""}
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

export default MyOrder;

import React, { useEffect, useState } from "react";
import Spinner from "../Shared/Spinner/Spinner";
import auth from "../../firebase.init";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const url = `http://localhost:5001/order`;
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
      <h1>All orders: {orders.length}</h1>
    </div>
  );
};

export default AllOrder;

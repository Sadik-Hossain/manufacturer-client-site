import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Spinner from "../Shared/Spinner/Spinner";
import "./MyOrder.css";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const [user, uLoading] = useAuthState(auth);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const email = user.email;
    const url = `http://localhost:5001/order?email=${email}`;
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
        setItems(data);
        setLoading(false);
      });
  }, [user]);
  console.log(items);
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
            <div className="text-center ">
              <h3 className="font-bold text-xl capitalize">
                product name: {item?.product}
              </h3>
              <h4 className="text-xl capitalize">
                quantity: {item?.quantity} pcs
              </h4>
              <h4 className="text-xl capitalize">
                price per unit: ${item?.pricePerUnit}
              </h4>
              <h4 className="text-xl capitalize">cost: ${item?.cost}</h4>
            </div>
          </div>
          <div className="card-right">
            <>
              {item?.cost && item?.paid ? (
                <>
                  <p
                    style={{
                      color: "#28a745 ",
                      fontWeight: "bold",
                    }}

                    // onClick={() => handlePayment(item._id, item.email)}
                  >
                    Paid
                  </p>
                  <p>
                    Transaction id:{""}
                    <span className="text-success">{item?.transactionId}</span>
                  </p>
                </>
              ) : (
                <>
                  <Link to={`/dashboard/payment/${item._id}`}>
                    <button className="btn btn-success">pay</button>
                  </Link>
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

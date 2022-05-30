import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Shared/Spinner/Spinner";
const ManageProduct = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5001/parts")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Spinner />;
  }
  const handledelete = (id) => {
    const proceed = window.confirm("are you sure?");
    if (proceed) {
      console.log(id);
      toast.success("item deleted");
      fetch(`http://localhost:5001/parts/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLoading(true);
          fetch(`http://localhost:5001/parts`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setItems(data);
              setLoading(false);
            });
        });
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center">total product: {items.length}</h1>
      {items.map((item) => (
        <div key={item._id} className="card-container">
          <div className="card-left">
            <img
              style={{ width: "64px", height: "64px" }}
              src={item.img}
              alt=""
            />
            <h3>{item.name}</h3>
          </div>
          <div className="card-right">
            <button
              className="btn btn-error"
              onClick={() => handledelete(item._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProduct;

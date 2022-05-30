import React from "react";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
const AddProduct = () => {
  const [user] = useAuthState(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const url = `https://intense-sierra-47612.herokuapp.com/parts`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    reset();
    toast("Item Added Successfully");
  };
  return (
    <div>
      <div className="register-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 
        //* item name
        */}
          <h1 className="text-2xl font-semibold text-center capitalize">
            add new Parts
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label className="detail-text">Parts Name</label>
            <label style={{ color: "red" }}>
              {errors.name?.type === "required" && (
                <small>{errors.name.message}</small>
              )}
            </label>
          </div>
          <input
            type="text"
            placeholder="name"
            {...register("name", {
              required: {
                value: true,
                message: "item name required",
              },
            })}
          />
          <label className="detail-text">Description</label>
          <input
            type="text"
            placeholder="description"
            {...register("description", {})}
          />
          {/* 
//*=================== minimum qty ==================
*/}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label className="detail-text">minimum quantity to order</label>
            <label style={{ color: "red" }}>
              {errors.minQty?.type === "required" && (
                <small>{errors.minQty.message}</small>
              )}
            </label>
          </div>
          <input
            type="number"
            placeholder="quantity"
            {...register("minQty", {
              required: {
                value: true,
                message: "quantity required",
              },
              min: { value: 50, message: "please input a positive number" },
            })}
          />

          {/* 
//*=================== Price ==================
*/}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label className="detail-text">Price per unit</label>
            <label style={{ color: "red" }}>
              {errors.price?.type === "required" && (
                <small>{errors.price.message}</small>
              )}
              {errors.price?.type === "min" && (
                <small>{errors.price.message}</small>
              )}
            </label>
          </div>
          <input
            type="number"
            placeholder="price"
            {...register("price", {
              required: {
                value: true,
                message: "price required",
              },
              min: { value: 1, message: "please input a positive number" },
            })}
          />
          {/* 
//*=================== Available ==================
*/}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label className="detail-text">Available quantity</label>
            <label style={{ color: "red" }}>
              {errors.quantity?.type === "required" && (
                <small>{errors.quantity.message}</small>
              )}
              {errors.quantity?.type === "min" && (
                <small>{errors.quantity.message}</small>
              )}
            </label>
          </div>
          <input
            type="number"
            placeholder="quantity"
            {...register("available", {
              required: {
                value: true,
                message: "quantity required",
              },
              min: { value: 50, message: "please input a positive number" },
            })}
          />
          {/* 
//*=================== img url==================
*/}
          <label className="detail-text">Item Image URL</label>
          <input type="url" placeholder="photo url" {...register("img", {})} />

          <input
            style={{
              background: "#000",
              color: "white",
              height: "3rem",
              marginTop: "2rem",
            }}
            type="submit"
            value="Add Item"
          />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

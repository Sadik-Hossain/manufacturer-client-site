import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Spinner from "../Shared/Spinner/Spinner";
import CheckoutForm from "./CheckOutForm";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51L3jwfBGlv4kdDdlVpHYBG5ctuHCANZXiMzlyrXKirXAt4rd4a2vltdcY9qO97oF5562ltLLusrrbqszlM7sF5Ro00WSlpEBN9"
  );
  const { id } = useParams();
  const url = `http://localhost:5001/order/${id}`;
  const { data: orders, isLoading } = useQuery(["booking", id], () =>
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div class="card  w-50 mx-auto text-center max-w-md my-12 bg-base-100 shadow-xl border-2">
        <div class="card-body">
          <p className="text-success font-bold">Hello, {orders.username}</p>
          <h2 class="text-2xl font-semibold text-center">
            Please pay for {orders.product}
          </h2>
          <p className="font-semibold">
            Item Quantity: <span>{orders.quantity}pcs</span>
          </p>
          <p className="font-semibold">
            Price Per Unit: $<span>{orders.pricePerUnit}</span>
          </p>
          <p className="font-semibold">Please pay: ${orders.cost}</p>
        </div>
      </div>
      <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
        <div class="card-body">
          {/* 
          payment card form
          */}
          <Elements stripe={stripePromise}>
            {/* //* price er info lagbe, tai propsm decci */}
            <CheckoutForm orders={orders} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import React from "react";
// import { useQuery } from "react-query";
// import { useParams } from "react-router-dom";
// import Spinner from "../Shared/Spinner/Spinner";
// import CheckoutForm from "./CheckoutForm";

// const stripePromise = loadStripe(
//   "pk_test_51L3jwfBGlv4kdDdlVpHYBG5ctuHCANZXiMzlyrXKirXAt4rd4a2vltdcY9qO97oF5562ltLLusrrbqszlM7sF5Ro00WSlpEBN9"
// );

// const Payment = () => {
//   const { id } = useParams();
//   const url = `https://secret-dusk-46242.herokuapp.com/booking/${id}`;

//   const { data: appointment, isLoading } = useQuery(["booking", id], () =>
//     fetch(url, {
//       method: "GET",
//       headers: {
//         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//     }).then((res) => res.json())
//   );

//   if (isLoading) {
//     return <Spinner></Spinner>;
//   }

//   return (
//     <div>
//       <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
//         <div class="card-body">
//           <p className="text-success font-bold">
//             Hello, {appointment.patientName}
//           </p>
//           <h2 class="card-title">Please Pay for {appointment.treatment}</h2>
//           <p>
//             Your Appointment:{" "}
//             <span className="text-orange-700">{appointment.date}</span> at{" "}
//             {appointment.slot}
//           </p>
//           <p>Please pay: ${appointment.price}</p>
//         </div>
//       </div>
//       <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
//         <div class="card-body">
//           <Elements stripe={stripePromise}>
//             <CheckoutForm appointment={appointment} />
//           </Elements>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Payment;

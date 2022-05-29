import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const [user] = useAuthState(auth);

  return (
    <div class="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content ">
        {/* <!-- Page content here --> */}
        <h2 className="text-4xl text-purple-500">welcome to your Dashboard</h2>
        <Outlet></Outlet>
      </div>
      <div class="drawer-side">
        <label for="dashboard-sidebar" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          {/* 
          //* ------------- non admin routes ----------------
          */}
          <li>
            <Link to="/dashboard">My Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/order">My order</Link>
          </li>
          <li>
            <Link to="/dashboard/review">My review</Link>
          </li>
          {/* 
//* ------------------- ADMIN Routes ------------------------
*/}
          <>
            <li>
              <Link to="/dashboard/allorder">Manage All Order</Link>
            </li>
            <li>
              <Link to="/dashboard/addproduct">Add a product</Link>
            </li>
            <li>
              <Link to="/dashboard/manageproduct">Manage product</Link>
            </li>
            <li>
              <Link to="/dashboard/makeadmin">Make Admin</Link>
            </li>
          </>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

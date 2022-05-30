import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import { MdHdrStrong } from "react-icons/md";
const Navbar = () => {
  const [user] = useAuthState(auth);

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>

      {user && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      <li>
        {user ? (
          <button className="btn btn-ghost" onClick={logout}>
            Sign Out
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </>
  );
  return (
    <div style={{ background: "#92EAFF" }} className="navbar ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">Computer Zone</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <label
          tabIndex="1"
          for="dashboard-sidebar"
          className="btn btn-ghost lg:hidden"
        >
          <MdHdrStrong />
        </label>
      </div>
    </div>
  );
};

export default Navbar;

// import React from "react";
// import { signOut } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link } from "react-router-dom";
// import auth from "../../../firebase.init";
// import "./Header.css";
// import { toast } from "react-toastify";
// const Header = () => {
//   const [user, loading, error] = useAuthState(auth);
//   const logout = () => {
//     signOut(auth);
//     localStorage.removeItem("accessToken");
//     toast("Logged Out Successfully");
//   };
//   return (
//     <nav
//       style={{
//         display: "flex",
//         justifyContent: "space-around",
//         alignItems: "center",
//         background: "#2F4858",
//         padding: "1rem 0",
//       }}
//     >
//       <Link className="link" to="home">
//         Home
//       </Link>
//       <Link className="link" to="blogs">
//         Blogs
//       </Link>
//       {user && (
//         <Link className="link" to="dashboard">
//           Dashboard
//         </Link>
//       )}

//       {user ? (
//         //* logout method
//         <button className="login" onClick={logout}>
//           Logout
//         </button>
//       ) : (
//         //* login redirect
//         <Link className="link" to="/login">
//           Login
//         </Link>
//       )}
//     </nav>
//   );
// };

// export default Header;

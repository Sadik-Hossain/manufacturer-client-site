import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Blogs from "./Pages/Blogs/Blogs";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Login/SignUp";
import NotFound from "./Pages/NotFound/NotFound";
import Footer from "./Pages/Shared/Footer/Footer";
import Header from "./Pages/Shared/Header/Header";
import "react-toastify/dist/ReactToastify.css";
import PartsDetails from "./Pages/Parts/PartsDetails";
import RequireAuth from "./Pages/Login/RequireAuth";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Myreview from "./Pages/DashBoard/Myreview";

import "./App.css";
import MyOrder from "./Pages/DashBoard/MyOrder";
import MyProfile from "./Pages/DashBoard/MyProfile";
import AllOrder from "./Pages/DashBoard/AllOrder";
import MakeAdmin from "./Pages/DashBoard/MakeAdmin";
import AddProduct from "./Pages/DashBoard/AddProduct";
import ManageProduct from "./Pages/DashBoard/ManageProduct";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashBoard></DashBoard>
            </RequireAuth>
          }
        >
          {/* nested route */}
          <Route index element={<MyProfile />}></Route>
          <Route path="review" element={<Myreview />}></Route>
          <Route path="order" element={<MyOrder />}></Route>
          <Route path="makeadmin" element={<MakeAdmin />}></Route>
          <Route path="addproduct" element={<AddProduct />}></Route>
          <Route path="manageproduct" element={<ManageProduct />}></Route>

          <Route path="allorder" element={<AllOrder />}></Route>
        </Route>
        <Route
          path="/purchase/:itemId"
          element={
            <RequireAuth>
              <PartsDetails />
            </RequireAuth>
          }
        ></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default App;

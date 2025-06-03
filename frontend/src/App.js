import React, { useState } from "react";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Collection from "./components/collection/Collection";
import ProductDetail from "./components/productdetail/ProductDetail";
import Login from "./pages/login/Login";
import Blogs from "./components/Blogs/Blogs";
import BlogDetails from "./components/Blogs/BlogDetails";
import { ToastContainer } from "react-toastify";
import ProductGrid from "./components/product/ProductGrid";
import WishList from "./pages/wishlist/WishList";
import Varify from "./pages/varify/Varify";
import MyOrders from "./pages/myOrders/MyOrders";


const App = () => {
  const [showLogin, setShowLogin] = useState(false);



  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
   
      <div className="app-nav">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/wishlist" element={<WishList/>} />
          <Route path="/verify" element={<Varify/>} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>

      <div className="app">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/arrival" element={<ProductGrid/>} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/collection/:filterType/:filterValue"
            element={<Collection />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
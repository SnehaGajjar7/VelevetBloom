import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";
import { RiFlowerFill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { GiFlowerTwirl } from "react-icons/gi";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import NotificationBubble from "../../components/notification/Notification";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, collections, url } =
    useContext(CartContext);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const handleAddMoreLove = () => {
    navigate("/", { replace: false });
    setTimeout(() => {
      const section = document.getElementById("product-grid");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // slight delay to ensure page renders
  };

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      <div className="cart-container">
        {Object.values(cartItems).some((qty) => qty > 0) ? (
          <div className="cart-content">
            {/* Left side: Cart items */}
            <div className="cart-items-section">
              <h2 className="cart-title">Your Shopping Cart</h2>
              <div className="cart-header">
                <span>Item</span>
                <span>Title</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
                <span>Remove</span>
              </div>
              <hr />
              {collections.map((item) => {
                if (cartItems[item.id] > 0) {
                  return (
                    <div key={item.id} className="cart-item-row">
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={`${url}/uploads/${item.image}`}
                          alt={item.name}
                          className="cart-item-img"
                        />
                      </Link>
                      <span>{item.name}</span>
                      <span>₹ {item.price}</span>
                      <span>{cartItems[item.id]}</span>
                      <span>₹ {item.price * cartItems[item.id]}</span>
                      <span
                        className="remove-btn"
                        onClick={() => {
                          removeFromCart(item.id);
                          setAlert({ message: "This flower took a step back" });
                          setTimeout(() => setAlert(null), 3000);
                        }}
                      >
                        <RiDeleteBin5Fill />
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Right side: Totals */}
            <div className="cart-summary-section">
              <h3 className="cart-title">Cart Totals</h3>
              <div className="summary-row">
                <p>Subtotal</p>
                <p>₹ {getTotalCartAmount()}</p>
              </div>
              <div className="summary-row">
                <p>Delivery Fee</p>
                <p>₹ {getTotalCartAmount() === 0 ? 0 : 25}</p>
              </div>
              <hr />
              <div className="summary-row total">
                <p>Total</p>
                <p>
                  ₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 25}
                </p>
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-img">
              <img src="https://img.freepik.com/premium-photo/graceful-timeless-3d-florist-women-serene-enduring-characters-classic-traditional-floral-designs-isolated-white-background_856795-1715.jpg" />
            </div>

            <div className="empty-cart-msg">
              <p>
                <strong>
                  Uh-oh! Your cart has trust issues now{" "}
                  <FaRegFaceSadTear color="rgb(63, 145, 38)" /> Add a few items?{" "}
                  <RiFlowerFill color="#b03a5b" />
                </strong>
              </p>
              <p>
                It’s been waiting patiently, but it’s starting to feel a little
                lonely and neglected.
              </p>
              <p>
                Why not add a few beautiful items to brighten its day?{" "}
                <GiFlowerTwirl color="#f3a5b1" />
              </p>
              <p>
                Treat yourself to something special—you deserve it!{" "}
                <FaShoppingCart color="#b03a5b" />
              </p>
              <button className="continue-btn" onClick={handleAddMoreLove}>
                Add More Love
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DeliveryOptions from '../../components/productdetail/DeliveryOptions'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, collections, cartItems, url } =
    useContext(CartContext);
    const navigate = useNavigate()
    const [delivery, setDelivery] = useState({
      selectedDay: "",
      selectedDate: "",
      deliveryType: "",
      fixedSlot: "",
    });
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    contact: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
  
    // Validate delivery info
    if (!delivery.selectedDay || !delivery.deliveryType) {
      alert("Please select delivery day and delivery type");
      return;
    }
    if (delivery.deliveryType === "fixed" && !delivery.fixedSlot) {
      alert("Please select a time slot for fixed delivery");
      return;
    }
  
    let orderItems = [];
    collections.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // clone item to avoid mutation
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 25,
      userName: `${data.firstName} ${data.lastName}`,
      userEmail: data.email,
      userPhone: data.contact,
      delivery: delivery,  // pass delivery info here
    };
  
    if (!data.firstName || !data.email || !data.street || !data.contact) {
      alert("Please fill all required fields");
      return;
    }
    if (getTotalCartAmount() === 0) {
      alert("Cart is empty");
      return;
    }
  
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        alert("Error placing order: " + response.data.message);
      }
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(error);
    }
  };
  
  
  useEffect(() => {
   if(!token){
    navigate("/cart")
   }else if(getTotalCartAmount()===0){
    navigate("/cart")
   }
  }, [token])
  

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
          <input
            name="pincode"
            onChange={onChangeHandler}
            value={data.pincode}
            type="number"
            placeholder="Pincode"
          />
        </div>
        <input
          name="contact"
          onChange={onChangeHandler}
          value={data.contact}
          type="number"
          placeholder="Contact Number"
        />
        <DeliveryOptions onDeliveryChange={setDelivery} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2 className="title">Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 25}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>
                ₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 25}
              </p>
            </div>
          </div>

          <button type="submit">Pay Here</button>
        </div>
      </div>
    </form>
  );
};


export default PlaceOrder;

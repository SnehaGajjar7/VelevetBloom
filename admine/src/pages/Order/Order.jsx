import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FcShipped } from "react-icons/fc";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("error to fetch orders");
      console.log("failed");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <FcShipped fontSize="40px" />
              <div>
                <p className="order-item-flower">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + " , ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.pincode}
                  </p>
                </div>
                {order.delivery && (
                  <div className="order-item-delivery">
                    <p>
                      <strong>Delivery Day:</strong>{" "}
                      {order.delivery.selectedDay === "today"
                        ? "Today"
                        : order.delivery.selectedDay === "tomorrow"
                        ? "Tomorrow"
                        : order.delivery.selectedDate ||
                          "Not Specified"}
                    </p>
                    <p>
                      <strong>Type:</strong>{" "}
                      {order.delivery.deliveryType}
                    </p>
                    {order.delivery.deliveryType === "fixed" && (
                      <p>
                        <strong>Time Slot:</strong>{" "}
                        {order.delivery.fixedSlot}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <p>Total Items: {order.items.length}</p>
              <p>₹ {order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Ready to Be Arranged">
                  Ready to Be Arranged
                </option>
                <option value="Florist at Work">Florist at Work</option>
                <option value="Florals Are Coming!">
                  {" "}
                  Florals Are Coming!
                </option>
                <option value="Delivered with Care">Delivered with Care</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;

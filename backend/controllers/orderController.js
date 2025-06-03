import axios from "axios";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";

const CASHFREE_APP_ID = process.env.CF_APP_ID; // from Cashfree dashboard
const CASHFREE_SECRET_KEY = process.env.CF_SECRET_KEY; // from Cashfree dashboard
const frontend_url = "http://localhost:3000";

const placeOrder = async (req, res) => {
  try {
    const userId = req.userId; // from authMiddleware
    const { items, amount, address, delivery } = req.body;

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      delivery,
      payment: false,
    });

    await newOrder.save();

    // Clear user's cart
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    
    const body = {
      order_id: newOrder._id.toString(),
      order_amount: req.body.amount.toString(),
      order_currency: "INR",
      customer_details: {
        customer_id: user._id.toString(),
        customer_name: user.name,
        customer_email: user.email,
      },
      return_url: `${frontend_url}/verify?orderId=${newOrder._id}&success=true`,
    };
    

    // Call Cashfree order creation API (sandbox URL)
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      body,
      {
        headers: {
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "Content-Type": "application/json",
          "x-api-version": "2022-01-01",
        },
      }
    );

    const { payment_link } = response.data;

    if (payment_link) {
      // Send payment link to frontend to redirect user
      res.json({ success: true, session_url: payment_link });
    } else {
      res.json({ success: false, message: "Payment link not generated" });
    }
  } catch (error) {
    console.error("Cashfree API Error:", error.response?.data || error.message);
    return res.json({
      success: false,
      message: "Payment failed",
      details: error.response?.data,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId } = req.body;

  try {
    const response = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${orderId}`,
      {
        headers: {
          "x-client-id": CASHFREE_APP_ID,
          "x-client-secret": CASHFREE_SECRET_KEY,
          "x-api-version": "2022-01-01",
          "Content-Type": "application/json",
        },
      }
    );

    const orderStatus = response.data.order_status;
    console.log("Cashfree order status:", orderStatus);

    if (orderStatus === "PAID") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error(
      "Cashfree Verify Error:",
      error.response?.data || error.message
    );
    res.json({ success: false, message: "Something went wrong" });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "failed to fetch order" });
  }
};

const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "failed to update status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

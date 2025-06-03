import React, { useContext, useState } from "react";
import "./Contact.css";
import axios from "axios";
import NotificationBubble from "../notification/Notification";
import { CartContext } from "../../context/CartContext";

const Contact = () => {
  const {url} = useContext(CartContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    image: null,
    rating: 0,
  });

  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("message", formData.message);
      if (formData.image) {
        data.append("image", formData.image);
      }
      data.append("rating", formData.rating);


      await axios.post(`${url}/api/contact`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setAlert({ message: "Message sent successfully" });
      setFormData({
        name: "",
        email: "",
        message: "",
        image: null,
      });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setAlert({ message: "Failed to send message" });
    }
  };

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      <div className="contact">
        <div className="contact-container">
          <h2>We Value Your Feedback</h2>
          <p>
            Help Velvet Bloom grow by sharing your thoughts! Whether it’s a kind
            word, a suggestion, or a snapshot of the bouquet you received — we’d
            love to hear from you. Your feedback helps us blossom better every
            day.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  image: e.target.files[0],
                }))
              }
            />
            <div className="rating-section">
              <label>Rate Your Experience:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        rating: star,
                      }))
                    }
                    className={formData.rating >= star ? "filled" : ""}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <button
              type="submit"
              onClick={() => {
                setAlert({ message: "Message sent successfully" });
                setTimeout(() => setAlert(null), 3000);
              }}
            >
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <h4>
              For more information or inquiries, feel free to reach out to us:
            </h4>
            <p>
              <strong>Email:</strong> hello@velvetbloom.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (234) 567-8901
            </p>
            <p>
              <strong>Location:</strong> 123 Blossom Avenue, Garden City
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

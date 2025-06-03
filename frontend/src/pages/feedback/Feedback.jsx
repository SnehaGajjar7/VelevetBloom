import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import "./Feedback.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { CartContext } from "../../context/CartContext";

const Feedback = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);
  const {url} = useContext(CartContext)

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${url}/api/contact`);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => resetTimeout();
  }, [current, messages.length]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const prevSlide = () => {
    resetTimeout();
    setCurrent((prev) => (prev === 0 ? messages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    resetTimeout();
    setCurrent((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <p>Loading messages...</p>;

  if (messages.length === 0) return <p>No feedback yet.</p>;

  const getIndex = (index) => {
    const len = messages.length;
    return (index + len) % len;
  };

  return (
    <div className="feedback-container">
      <h2>Happy Customers</h2>

      <button
        className="feedback-arrow left"
        onClick={prevSlide}
        aria-label="Previous"
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <button
        className="feedback-arrow right"
        onClick={nextSlide}
        aria-label="Next"
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </button>

      <div className="cards-wrapper">
        {[-1, 0, 1].map((offset) => {
          const index = getIndex(current + offset);
          const msg = messages[index];

          if (offset === 0) {
            return (
              <div
                key={`${msg._id}-${offset}`}
                className="feedback-card center"
              >
                <div className="feedback-header">
                  {msg.imagePath && (
                    <img
                      src={`https://velvet-bloom.onrender.com/${msg.imagePath}`}
                      alt="User"
                      className="feedback-avatar"
                    />
                  )}
                  <p className="feedback-name">- {msg.name}</p>
                </div>
                <div className="feedback-meta">
                  <p className="feedback-date">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                  <div className="feedback-rating">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={i < msg.rating ? "star filled" : "star"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="feedback-message">“{msg.message}”</p>
              </div>
            );
          }

          return (
            <div
              key={`${msg._id}-${offset}`}
              className={`feedback-card side ${
                offset === -1 ? "left" : "right"
              }`}
            >
              <div className="feedback-header">
                {msg.imagePath && (
                  <img
                    src={`https://velvet-bloom.onrender.com/${msg.imagePath}`}
                    alt="User"
                    className="feedback-avatar"
                  />
                )}
                <p className="feedback-name">- {msg.name}</p>
              </div>
              <div className="feedback-meta">
                <p className="feedback-date">
                  {new Date(msg.createdAt).toLocaleString()}
                </p>
                <div className="feedback-rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={i < msg.rating ? "star filled" : "star"}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="feedback-message">“{msg.message}”</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feedback;

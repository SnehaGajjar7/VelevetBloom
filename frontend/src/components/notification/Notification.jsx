// components/NotificationBubble.js
import React from "react";
import './Notification.css';

const NotificationBubble = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="notification-bubble">
      <span>{message}</span>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};

export default NotificationBubble;


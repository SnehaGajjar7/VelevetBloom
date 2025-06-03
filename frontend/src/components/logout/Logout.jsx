import React, { useState } from "react";
import "./Logout.css";

const LogoutModal = ({ onConfirm, onCancel }) => {
  const [hovered, setHovered] = useState(""); // "confirm" | "cancel" | ""

  return (
    <div className="modal-overlay">
      <div
        className={`modal ${
          hovered === "confirm"
            ? "hovered-confirm"
            : hovered === "cancel"
            ? "hovered-cancel"
            : ""
        }`}
      >
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to log out?</p>
        <div className="modal-buttons">
          <button
            onClick={onConfirm}
            onMouseEnter={() => setHovered("confirm")}
            onMouseLeave={() => setHovered("")}
          >
            Yes, Logout
          </button>
          <button
            onClick={onCancel}
            onMouseEnter={() => setHovered("cancel")}
            onMouseLeave={() => setHovered("")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;

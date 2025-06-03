import React, { useState, useEffect } from "react";
import "./DeliveryOptions.css";

const DeliveryOptions = ({ onDeliveryChange }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [fixedSlot, setFixedSlot] = useState("");
  const [currentHour, setCurrentHour] = useState(null);

  const fixedSlots = [
    "6 AM - 8 AM",
    "8 AM - 10 AM",
    "10 AM - 12 PM",
    "2 PM - 4 PM",
  ];
  useEffect(() => {
    onDeliveryChange({
      selectedDay,
      selectedDate,
      deliveryType,
      fixedSlot,
    });
  }, [selectedDay, selectedDate, deliveryType, fixedSlot]);

  useEffect(() => {
    const now = new Date();
    setCurrentHour(now.getHours());
  }, []);

  const getTodayDateString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const disableStandardAndFixed =
    selectedDay === "today" && currentHour !== null && currentHour >= 18;

  const handleSelectDay = (day) => {
    setSelectedDay(day);
    setDeliveryType("");
    setFixedSlot("");
    if (day === "today") setSelectedDate("");
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setDeliveryType("");
    setFixedSlot("");
  };

  return (
    <>
    
      <div className="delivery-container">
        <h2 className="title">Delivery Options</h2>

        {/* Day Selection */}
        <div className="section">
          <label className="section-label">Select Day</label>
          <div className="button-group">
            <button
              className={selectedDay === "today" ? "active" : ""}
              onClick={() => handleSelectDay("today")}
            >
              Today
            </button>
            <button
              className={selectedDay === "date" ? "active" : ""}
              onClick={() => handleSelectDay("date")}
            >
              Select Date
            </button>
          </div>
          {selectedDay === "date" && (
            <input
              type="date"
              value={selectedDate}
              min={getTodayDateString()}
              onChange={handleDateChange}
              className="date-input"
            />
          )}
        </div>

        {/* Delivery Type */}
        {(selectedDay === "today" ||
          (selectedDay === "date" && selectedDate)) && (
          <div className="section">
            <label className="section-label">Select Delivery Type</label>
            <div className="button-group">
              <button
                className={deliveryType === "standard" ? "active" : ""}
                onClick={() => setDeliveryType("standard")}
                disabled={disableStandardAndFixed}
                title={
                  disableStandardAndFixed ? "Not available after 6 PM" : ""
                }
              >
                Standard (9 AM - 6 PM)
              </button>
              <button
                className={deliveryType === "fixed" ? "active" : ""}
                onClick={() => setDeliveryType("fixed")}
                disabled={disableStandardAndFixed}
                title={
                  disableStandardAndFixed ? "Not available after 6 PM" : ""
                }
              >
                Fixed Slot
              </button>
              <button
                className={deliveryType === "midnight" ? "active" : ""}
                onClick={() => setDeliveryType("midnight")}
              >
                Midnight (11 PM - 12 AM)
              </button>
            </div>

            {deliveryType === "fixed" && (
              <div className="dropdown-group">
                <label>Select Time Slot:</label>
                <select
                  value={fixedSlot}
                  onChange={(e) => setFixedSlot(e.target.value)}
                >
                  <option value="">--Select--</option>
                  {fixedSlots.map((slot, index) => (
                    <option key={index} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Summary */}
        <div className="summary">
          <h4>Summary</h4>
          <p>
            Day:{" "}
            <strong>
              {selectedDay === "today" ? "Today" : selectedDate || "N/A"}
            </strong>
          </p>
          <p>
            Delivery Type: <strong>{deliveryType || "N/A"}</strong>
          </p>
          {deliveryType === "fixed" && (
            <p>
              Slot: <strong>{fixedSlot || "N/A"}</strong>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DeliveryOptions;
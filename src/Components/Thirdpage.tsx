import React, { useState, useEffect } from "react";
import "./Thirdpage.css";

type SlotStatus = "available" | "booked" | "disabled" | "maintenance";

type Slot = {
  time: string;
  status: SlotStatus;
};

function Thirdpage() {
  const [slots, setSlots] = useState<Slot[]>([
    { time: "12 AM", status: "maintenance" },
    { time: "1 AM", status: "available" },
    { time: "2 AM", status: "available" },
    { time: "3 AM", status: "available" },
    { time: "4 AM", status: "available" },
    { time: "5 AM", status: "available" },
    { time: "6 AM", status: "available" },
    { time: "7 AM", status: "available" },
    { time: "8 AM", status: "available" },
    { time: "9 AM", status: "available" },
    { time: "10 AM", status: "available" },
    { time: "11 AM", status: "available" },
    { time: "12 PM", status: "available" },
    { time: "1 PM", status: "available" },
    { time: "2 PM", status: "available" },
    { time: "3 PM", status: "available" },
    { time: "4 PM", status: "available" },
    { time: "5 PM", status: "available" },
    { time: "6 PM", status: "available" },
    { time: "7 PM", status: "available" },
    { time: "8 PM", status: "available" },
    { time: "9 PM", status: "available" },
    { time: "10 PM", status: "available" },
    { time: "11 PM", status: "available" },
  ]);

  // Get selected date from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const selectedDateParam = urlParams.get("date");
  const selectedSlotParam = urlParams.get("slot");

  const [selectedDate, setSelectedDate] = useState<string>(
    selectedDateParam || new Date().toISOString().slice(0, 10)
  );
  console.log("Selected date:", selectedDate);
  console.log("Selected slot:", selectedSlotParam);

  // Helper: parse time strings to Date objects
  const parseTime = (timeStr: string, date: Date) => {
    const [hourStr, meridian] = timeStr.trim().split(" ");
    let hour = parseInt(hourStr, 10);
    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;
    const result = new Date(date);
    result.setHours(hour, 0, 0, 0);
    return result;
  };

 useEffect(() => {
  const updateSlotStatuses = () => {
    const now = new Date();
    const selectedDateObj = new Date(selectedDate);
    const isToday = selectedDateObj.toDateString() === now.toDateString();

    setSlots((prevSlots) =>
      prevSlots.map((slot) => {
        const startTime = parseTime(slot.time, selectedDateObj);

        // Never override maintenance or booked slots
        if (slot.status === "maintenance" || slot.status === "booked") {
          return slot;
        }

        // Calculate end time of slot (30 minutes after start)
        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);

        if (isToday && now >= endTime) {
          return { ...slot, status: "disabled" };
        }

        // For future dates, ensure slots are available (not disabled)
        if (!isToday && slot.status === "disabled") {
          return { ...slot, status: "available" };
        }

        return slot;
      })
    );
  };

  updateSlotStatuses();
  const interval = setInterval(updateSlotStatuses, 60 * 1000);
  return () => clearInterval(interval);
}, [selectedDate]);

  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSlotClick = (index: number) => {
    const clickedSlot = slots[index];
    if (clickedSlot.status !== "available") return;

    setSelectedSlots((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  const handleBookClick = () => {
    if (selectedSlots.length > 0) {
      setShowPopup(true);
    }
  };

  const handleConfirm = () => {
    setShowPopup(false);
    setShowSuccessPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleFinalConfirm = () => {
    const updatedSlots = slots.map((slot, i) =>
      selectedSlots.includes(i)
        ? { ...slot, status: "booked" as SlotStatus }
        : slot
    );
    setSlots(updatedSlots);
    setSelectedSlots([]);
    setShowSuccessPopup(false);
  };

  const sortedSlots = selectedSlots.slice().sort((a, b) => a - b);
  const fromTime = sortedSlots.length ? slots[sortedSlots[0]].time : "";
  const lastIndex = sortedSlots[sortedSlots.length - 1];
  const toTime =
    sortedSlots.length && lastIndex + 1 < slots.length
      ? slots[lastIndex + 1].time
      : slots[lastIndex]?.time || "";

  const amount = sortedSlots.length * 600;

  const bookingInfo = {
    date: selectedDate.split("-").reverse().join("/"),
    name: "AAAAA",
    phone: "1234567890",
    time: `${fromTime} - ${toTime}`,
    price: amount,
  };

  return (
    <div className="main">
      <div className="wrapper">
        <div className="inner-last">
          <div className="inner-inner">
            {slots.map((slot, index) => (
              <div
                key={index}
                className={`slot ${slot.status} ${
                  selectedSlots.includes(index) ? "selected" : ""
                }`}
                onClick={() => handleSlotClick(index)}
              >
                {slot.time}
              </div>
            ))}
          </div>
        </div>

        <div className="legend">
          <div className="legend-item">
            <div
              className="slot"
              style={{ backgroundColor: "#0e1a2b", border: "none" }}
            />{" "}
            Available
          </div>
          <div className="legend-item">
            <div className="slot booked" style={{ border: "2px solid red" }} />{" "}
            Booked
          </div>
          <div className="legend-item">
            <div
              className="slot disabled"
              style={{ backgroundColor: "grey", border: "none" }}
            />{" "}
            Disabled
          </div>
          <div className="legend-item">
            <div
              className="slot maintenance"
              style={{ backgroundColor: "red", border: "none" }}
            />{" "}
            Under Maintenance
          </div>
          <div className="legend-item">
            <div
              className="slot selected"
              style={{ border: "2px solid #00ff00" }}
            />{" "}
            Selected
          </div>
        </div>
        <div className="buttons buttons-outside">
          <button className="cancel-btn" onClick={() => setSelectedSlots([])}>
            Cancel
          </button>
          <button
            className="book-btn"
            disabled={selectedSlots.length === 0}
            onClick={handleBookClick}
          >
            Book
          </button>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Confirmation</h2>
              <div className="popup-row">
                <span>From :</span>
                <div className="time-display">{fromTime}</div>
                <span>To :</span>
                <div className="time-display">{toTime}</div>
              </div>
              <div className="popup-row2">
                <span>Amount In Total:</span>
                <div className="amount-box">₹{amount}/-</div>
              </div>
              <p className="note">🔴 Note: This Booking Can’t be Canceled</p>
              <div className="popup-buttons">
                <button className="popup-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="popup-confirm" onClick={handleConfirm}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className="popup-overlay">
            <div className="success-popup">
              <div className="tick">&#10004;</div>
              <h2>Thanks for your booking</h2>
              <h3>Your Slot is Ready!</h3>
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Phone No.</th>
                    <th>Time</th>
                    <th>Price in ₹</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{bookingInfo.date}</td>
                    <td>{bookingInfo.name}</td>
                    <td>{bookingInfo.phone}</td>
                    <td>{bookingInfo.time}</td>
                    <td>{bookingInfo.price}</td>
                  </tr>
                </tbody>
              </table>

              <button className="final-confirm" onClick={handleFinalConfirm}>
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Thirdpage;

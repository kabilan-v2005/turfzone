// ... (keep all imports and initial setup same)
import React, { useState, useEffect, useRef } from "react";
import "./Thirdpage.css";

type SlotStatus = "available" | "booked" | "disabled" | "maintenance";

type Slot = {
  time: string;
  status: SlotStatus;
};

type Props = {
  selectedDate: Date;
};

const defaultSlots: Slot[] = [
  { time: "12 AM", status: "available" },
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
  { time: "12 AM (Next Day)", status: "available" },
];

const Thirdpage: React.FC<Props> = ({ selectedDate }) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [slotDataByDate, setSlotDataByDate] = useState<Record<string, Slot[]>>({});
  const [startSlotIndex, setStartSlotIndex] = useState<number | null>(null);
  const [endSlotIndex, setEndSlotIndex] = useState<number | null>(null);
  const [showEndTimePopup, setShowEndTimePopup] = useState(false);

  const fromTime = startSlotIndex !== null ? slots[startSlotIndex].time.replace(" (Next Day)", "") : "";
  const toTime = endSlotIndex !== null ? slots[endSlotIndex].time.replace(" (Next Day)", "") : "";

  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const parseTime = (timeStr: string, date: Date) => {
    const isNextDay = timeStr.includes("Next Day");
    const [hourStr, meridian] = timeStr.replace(" (Next Day)", "").trim().split(" ");
    let hour = parseInt(hourStr, 10);
    if (meridian === "PM" && hour !== 12) hour += 12;
    if (meridian === "AM" && hour === 12) hour = 0;

    const result = new Date(date);
    if (isNextDay) result.setDate(result.getDate() + 1);
    result.setHours(hour, 0, 0, 0);
    return result;
  };

  useEffect(() => {
    const dateKey = selectedDate.toDateString();
    if (!slotDataByDate[dateKey]) {
      const initializedSlots = defaultSlots.map((slot) => ({ ...slot }));
      setSlotDataByDate((prev) => ({ ...prev, [dateKey]: initializedSlots }));
      setSlots(initializedSlots);
    } else {
      setSlots(slotDataByDate[dateKey]);
    }
    setSelectedSlots([]);
    setTimeout(() => {
      if (slotRefs.current[0]) {
        slotRefs.current[0].scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, [selectedDate]);

  useEffect(() => {
    const updateSlotStatuses = () => {
      const now = new Date();
      const isToday = selectedDate.toDateString() === now.toDateString();
      setSlots((prevSlots) =>
        prevSlots.map((slot) => {
          const startTime = parseTime(slot.time, selectedDate);
          if (slot.status === "maintenance" || slot.status === "booked") return slot;
          const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
          if (isToday && now >= endTime) return { ...slot, status: "disabled" };
          return { ...slot, status: "available" };
        })
      );
    };
    updateSlotStatuses();
    const interval = setInterval(updateSlotStatuses, 60000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  const handleSlotClick = (index: number) => {
    const clickedSlot = slots[index];
    if (clickedSlot.status !== "available") return;
    setStartSlotIndex(index);
    setShowEndTimePopup(true);
  };

  const handleBookClick = () => selectedSlots.length > 0 && setShowPopup(true);
  const handleCancel = () => setShowPopup(false);
  const handleConfirm = () => {
    setShowPopup(false);
    setShowSuccessPopup(true);
  };

  const handleFinalConfirm = () => {
    const updatedSlots = slots.map((slot, i) =>
      selectedSlots.includes(i) ? { ...slot, status: "booked" as SlotStatus } : slot
    );
    const dateKey = selectedDate.toDateString();
    setSlotDataByDate((prev) => ({ ...prev, [dateKey]: updatedSlots }));
    setSlots(updatedSlots);
    setSelectedSlots([]);
    setShowSuccessPopup(false);
  };

  const sorted = [...selectedSlots].sort((a, b) => a - b);
  const bookingInfo = {
    date: selectedDate.toLocaleDateString("en-GB"),
    name: "AAAAA",
    phone: "1234567890",
    time: `${fromTime} - ${toTime}`,
    price: sorted.length * 600,
  };

  return (
    <div className="main">
      <div className="wrapper">
        <div className="inner-inner">
          {slots.filter((slot) => slot.time !== "12 AM (Next Day)").map((slot, index) => (
            <div
              key={index}
              ref={(el) => { slotRefs.current[index] = el; }}
              className={`slot ${slot.status} ${selectedSlots.includes(index) ? "selected" : ""}`}
              onClick={() => handleSlotClick(index)}
            >
              {slot.status === "maintenance" ? "Under Maintenance" : slot.time}
            </div>
          ))}
        </div>

        <div className="buttons buttons-outside">
          <button className="cancel-btn" onClick={() => setSelectedSlots([])}>Cancel</button>
          <button className="book-btn" disabled={!selectedSlots.length} onClick={handleBookClick}>Book</button>
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
                <div className="amount-box">₹{bookingInfo.price}/-</div>
              </div>
              <p className="note">🔴 Note: This Booking Can’t be Canceled</p>
              <div className="popup-buttons">
                <button className="popup-cancel" onClick={handleCancel}>Cancel</button>
                <button className="popup-confirm" onClick={handleConfirm}>Confirm</button>
              </div>
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <div className="popup-overlay">
            <div className="success-popup">
              <div className="tick">✓</div>
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
              <button className="final-confirm" onClick={handleFinalConfirm}>Confirm</button>
            </div>
          </div>
        )}

        {showEndTimePopup && startSlotIndex !== null && (
          <div className="slide-overlay" onClick={() => setShowEndTimePopup(false)}>
            <div className="slide-popup" onClick={(e) => e.stopPropagation()}>
              <h2>Select End Time</h2>
              <div className="end-time-options">
                     {(() => {
  const start = startSlotIndex + 1;
  const endOptions = [];
  let count = 0;
  let canContinue = true;

  for (let i = start; i < slots.length && canContinue; i++) {
    const slot = slots[i];

    endOptions.push(
      <div
        key={i}
        className={`end-time-option ${slot.status !== "available" ? "unavailable" : ""}`}
        onClick={() => {
          if (slot.status !== "available") return;
          const selected = [];
          for (let j = startSlotIndex; j < i; j++) {
            selected.push(j);
          }
          setSelectedSlots(selected);
          setEndSlotIndex(i);
          setShowEndTimePopup(false);
        }}
      >
        {slot.status === "maintenance"
          ? "Under Maintenance"
          : slot.time.replace(" (Next Day)", "")}
      </div>
    );

    count++;
    // Always show first 4, then stop if not available
    if (count >= 4 && slot.status !== "available") {
      canContinue = false;
    }
  }

  return endOptions;
})()}

              </div>
              <button className="popup-cancel" onClick={() => setShowEndTimePopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Thirdpage;

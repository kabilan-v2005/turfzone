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
  const [slotDataByDate, setSlotDataByDate] = useState<Record<string, Slot[]>>(
    {}
  );
  const [startSlotIndex, setStartSlotIndex] = useState<number | null>(null);
  const [endSlotIndex, setEndSlotIndex] = useState<number | null>(null);
  const [showEndTimePopup, setShowEndTimePopup] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const fromTime =
    startSlotIndex !== null
      ? slots[startSlotIndex].time.replace(" (Next Day)", "")
      : "";
  const toTime =
    endSlotIndex !== null
      ? slots[endSlotIndex].time.replace(" (Next Day)", "")
      : "";
  const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

  const parseTime = (timeStr: string, date: Date) => {
    const isNextDay = timeStr.includes("Next Day");
    const [hourStr, meridian] = timeStr
      .replace(" (Next Day)", "")
      .trim()
      .split(" ");
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
        slotRefs.current[0].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
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
          
            return slot;
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

    // Reset OTP popup state when starting a new booking
    setShowOtpPopup(false);

    setStartSlotIndex(index);
    setShowEndTimePopup(true);
  };

  // const handleConfirm = () => {
  //   setShowPopup(false);
  //   setShowSuccessPopup(true);
  // };
  const handleConfirm = () => {
    setShowPopup(false);
    setShowSuccessPopup(true);

    // Automatically confirm the slot after showing success popup
    setTimeout(() => {
      handleFinalConfirm();
    }, 2000); // optional delay to show the success screen for 2 seconds
  };

  const handleFinalConfirm = () => {
    const updatedSlots = slots.map((slot, i) =>
      selectedSlots.includes(i)
        ? { ...slot, status: "booked" as SlotStatus }
        : slot
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

  // Calculate total hours based on selected slots (each slot is 1 hour here, adjust if needed)
  const totalHours = sorted.length;

  return (
    <div className="main">
      <div className="wrapper">
        <div className="inner-inner">
          {slots
            .filter((slot) => slot.time !== "12 AM (Next Day)")
            .map((slot, index) => (
              <div
                key={index}
                ref={(el) => {
                  slotRefs.current[index] = el;
                }}
                className={`slot ${slot.status} ${
                  selectedSlots.includes(index) ? "selected" : ""
                }`}
                onClick={() => handleSlotClick(index)}
              >
                {slot.status === "maintenance"
                  ? "Under Maintenance"
                  : slot.time}
              </div>
            ))}
        </div>

        {showPopup && !showOtpPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Confirmation</h2>
              <div className="popup-row">
                <div className="popup-col">
                  <span>From :</span>
                  <div className="time-display">{fromTime}</div>
                </div>
                <div className="popup-col">
                  <span>To :</span>
                  <div className="time-display">{toTime}</div>
                </div>
              </div>

              <div className="popup-row2">
                <span> Total Hours:</span>
                <div className="amount-box">{totalHours} hrs</div>
              </div>
              <div className="popup-row2">
                <span>Amount In Total:</span>
                <div className="amount-box">₹{bookingInfo.price}/-</div>
              </div>
              <p className="note">🔴 Note: This Booking Can’t be Canceled</p>
              <div className="popup-buttons">
                <button
                  className="popup-cancel"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="popup-confirm"
                  onClick={() => setShowOtpPopup(true)}
                >
                  Get OTP
                </button>
              </div>
            </div>
          </div>
        )}
        {showPopup && showOtpPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h2>Confirmation</h2>
              <div className="popup-row">
                <div className="popup-col">
                  <span>From :</span>
                  <div className="time-display">{fromTime}</div>
                </div>
                <div className="popup-col">
                  <span>To :</span>
                  <div className="time-display">{toTime}</div>
                </div>
              </div>
              <div className="popup-row2">
                <span> Total Hours:</span>
                <div className="amount-box">{totalHours} hrs</div>
              </div>
              <div className="popup-row2">
                <span>Amount In Total:</span>
                <div className="amount-box">₹{bookingInfo.price}/-</div>
              </div>
              <div className="popup-row3">
                <span>Enter OTP :</span>
                <input
                  type="text"
                  className="otp-input"
                  placeholder="Enter OTP"
                  maxLength={6}
                />
              </div>
              <p className="note">🔴 Note: This Booking Can’t be Canceled</p>
              <div className="popup-buttons">
                <button
                  className="popup-cancel"
                  onClick={() => {
                    setShowOtpPopup(false);
                    setShowPopup(false);
                  }}
                >
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
            <div className="success-popup" onClick={(e) => e.stopPropagation()}>
              <div className="tick">✓</div>
              <div className="success-message">
                <p>Thanks for your booking</p>
                <p>Your Slot is Confirmed!</p>
              </div>
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Phone No.</th>
                    <th>Time</th>
                    <th>Price (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{bookingInfo.date}</td>
                    <td>{bookingInfo.phone}</td>
                    <td>{bookingInfo.time}</td>
                    <td>{bookingInfo.price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showEndTimePopup && startSlotIndex !== null && (
          <div
            className="slide-overlay"
            onClick={() => setShowEndTimePopup(false)}
          >
            <div className="slide-popup" onClick={(e) => e.stopPropagation()}>
              <div>
                <h2>Select End Time</h2>
                <div className="end-time-options">
                  {(() => {
                    const start = startSlotIndex + 1;
                    const endOptions = [];
                    let availableCount = 0;
                    let nonAvailableShown = false;

                    for (let i = start; i < slots.length; i++) {
                      const slot = slots[i];
                      if (slot.status === "available") {
                        if (availableCount < 4) {
                          endOptions.push(
                            <div
                              key={i}
                              className="end-time-option"
                              onClick={() => {
                                const selected = [];
                                for (let j = startSlotIndex; j < i; j++) {
                                  selected.push(j);
                                }
                                setSelectedSlots(selected);
                                setEndSlotIndex(i);
                                setShowEndTimePopup(false);
                                setShowPopup(true); // immediately trigger popup
                              }}
                            >
                              {slot.time.replace(" (Next Day)", "")}
                            </div>
                          );
                          availableCount++;
                        } else {
                          break;
                        }
                      } else if (!nonAvailableShown) {
                        endOptions.push(
                          <div
                            key={i}
                            className="end-time-option non-available"
                            onClick={() => {
                              const selected = [];
                              for (let j = startSlotIndex; j < i; j++) {
                                selected.push(j);
                              }
                              setSelectedSlots(selected);
                              setEndSlotIndex(i);
                              setShowEndTimePopup(false);
                              setShowPopup(true); // immediately trigger popup
                            }}
                          >
                            {slot.status === "maintenance"
                              ? "Under Maintenance"
                              : slot.time.replace(" (Next Day)", "")}
                          </div>
                        );
                        nonAvailableShown = true;
                        break;
                      }
                    }

                    return endOptions;
                  })()}
                </div>

                <button
                  className="popup-cancel"
                  onClick={() => setShowEndTimePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Thirdpage;

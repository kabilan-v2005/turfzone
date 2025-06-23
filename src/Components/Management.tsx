import { useEffect, useState } from "react";
import { useRef as reactUseRef } from "react";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Secondpage = ({
  onScrollToThirdPage,
}: {
  onScrollToThirdPage: (date: Date) => void;
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState(today);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);

  const nextWeek = () =>
    setSelectedDate(
      (prev) => new Date(prev.getTime() + 7 * 24 * 60 * 60 * 1000)
    );

  const prevWeek = () => {
    const newDate = new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (newDate >= today) {
      setSelectedDate(newDate);
    }
  };

  const getWeekDates = () => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  useEffect(() => {
    setClickedDate(today);
  }, []);

  const formatDate = (date: Date) => `${date.getDate()}`;
  const isPastDate = (date: Date) => date < today;

  const handleDateClick = (date: Date) => {
    if (isPastDate(date)) return;
    setClickedDate(date);
    onScrollToThirdPage(date);
  };

  const weekDates = getWeekDates();
  const [slots] = useState<Slot[]>(defaultSlots);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);
  const slotRefs = reactUseRef<(HTMLDivElement | null)[]>([]);

  const handleSlotClick = (index: number) => {
    setSelectedSlots((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="main-container">
      <h2 className="heading">&larr; Management</h2>

      <div className="calendar-nav">
        <button onClick={prevWeek} className="calendar-btn">&#x276E;</button>
        <h2 className="calendar-month">
          {selectedDate.toLocaleString("default", { month: "long" })} {selectedDate.getFullYear()}
        </h2>
        <button onClick={nextWeek} className="calendar-btn">&#x276F;</button>
      </div>

      <div className="week-scroll">
        <div className="weekdays">
          {weekDates.map((date, index) => {
            const isPast = isPastDate(date);
            const isSelected = clickedDate?.toDateString() === date.toDateString();

            return (
              <div
                key={index}
                className={`day ${isSelected ? "selected" : ""} ${isPast ? "disabled" : ""}`}
                onClick={() => handleDateClick(date)}
              >
                <span>{formatDate(date)}</span>
                <span>{weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1]}</span>
              </div>
            );
          })}
        </div>
      </div>

      <h1 className="slot-title">Time Slots</h1>

      <div className="slot-grid">
        {slots.map((slot, index) => (
          <div
            key={index}
            ref={(el) => {
              slotRefs.current[index] = el;
            }}
            onClick={() => handleSlotClick(index)}
            className={`slot-box ${slot.status} ${
              selectedSlots.includes(index) ? "selected" : ""
            }`}
          >
            {slot.status === "maintenance" ? (
              "Under Maintenance"
            ) : (
              <>
                <div>{slot.time.split(" to ")[0]}</div>
                <div className="slot-to">to</div>
                <div>{slot.time.split(" to ")[1]}</div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Internal Styles */}
      <style>{`
        .main-container {
          padding: 32px;
          font-family: sans-serif;
        }

        .heading {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .calendar-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .calendar-month {
          font-size: 22px;
          margin: 0;
        }

        .calendar-btn {
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .week-scroll {
          overflow-x: auto;
          margin-top: 24px;
        }

        .weekdays {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .day {
          border: 1px solid #ccc;
          padding: 16px 12px;
          min-width: 80px;
          text-align: center;
          border-radius: 10px;
          cursor: pointer;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          font-weight: 600;
        }

        .day.selected {
          background-color: #28a745;
          color: #fff;
          border-bottom: 3px solid #000;
        }

        .day.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .slot-title {
          text-align: center;
          margin-top: 32px;
          font-size: 20px;
        }

        .slot-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
          margin-top: 20px;
          justify-items: center;
        }

        .slot-box {
          width: 100%;
          max-width: 130px;
          min-height: 100px;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          text-align: center;
          font-weight: 600;
          font-size: 15px;
          line-height: 1.3;
          cursor: pointer;
        }

        .slot-box.selected {
          background-color: #e6f7ff;
          border: 2px solid #007bff;
          color: #007bff;
        }

        .slot-box.maintenance {
          background-color: #ffe5e5;
          border: 2px solid #cc0000;
          color: #cc0000;
          cursor: not-allowed;
        }

        .slot-box.disabled {
          background-color: #f2f2f2;
          color: #999;
          cursor: not-allowed;
        }

        .slot-to {
          font-size: 11px;
          font-weight: 500;
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
};

export default Secondpage;

// Types
type SlotStatus = "available" | "booked" | "disabled" | "maintenance";

type Slot = {
  time: string;
  status: SlotStatus;
};

// Only 6 AM to 11 PM (6AM-7AM to 11PM-12AM), total 18 slots (6x3)
const defaultSlots: Slot[] = [
  { time: "6 AM to 7 AM", status: "disabled" },
  { time: "7 AM to 8 AM", status: "available" },
  { time: "8 AM to 9 AM", status: "available" },
  { time: "9 AM to 10 AM", status: "available" },
  { time: "10 AM to 11 AM", status: "available" },
  { time: "11 AM to 12 PM", status: "available" },
  { time: "12 PM to 1 PM", status: "available" },
  { time: "1 PM to 2 PM", status: "available" },
  { time: "2 PM to 3 PM", status: "available" },
  { time: "3 PM to 4 PM", status: "available" },
  { time: "4 PM to 5 PM", status: "available" },
  { time: "5 PM to 6 PM", status: "available" },
  { time: "6 PM to 7 PM", status: "available" },
  { time: "7 PM to 8 PM", status: "available" },
  { time: "8 PM to 9 PM", status: "available" },
  { time: "9 PM to 10 PM", status: "available" },
  { time: "10 PM to 11 PM", status: "available" },
  { time: "11 PM to 12 AM", status: "available" },
];

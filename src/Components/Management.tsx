import React, { useState } from 'react';

const Management: React.FC = () => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(3);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [notifyUsers, setNotifyUsers] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const days = [
    { date: 15, day: 'Mon' },
    { date: 16, day: 'Tue' },
    { date: 17, day: 'Wed' },
    { date: 18, day: 'Thu' },
    { date: 19, day: 'Fri' },
    { date: 20, day: 'Sat' },
    { date: 21, day: 'Sun' },
  ];

  const timeSlots = [
    '6 AM to 7 AM', '7 AM to 8 AM', '8 AM to 9 AM', '9 AM to 10 AM', '10 AM to 11 AM', '11 AM to 12 PM',
    '12 PM to 1 PM', '1 PM to 2 PM', '2 PM to 3 PM', '3 PM to 4 PM', '4 PM to 5 PM', '5 PM to 6 PM',
    '6 PM to 7 PM', '7 PM to 8 PM', '8 PM to 9 PM', '9 PM to 10 PM', '10 PM to 11 PM', '11 PM to 12 AM'
  ];

  const disabledSlot = '6 AM to 7 AM';

  const toggleSlot = (slot: string) => {
    if (slot === disabledSlot) return;
    setSelectedSlots(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSlots([]);
    } else {
      setSelectedSlots(timeSlots.filter(slot => slot !== disabledSlot));
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className="management-container">
      <h2 className="title">← Management</h2>

      <div className="month-header">
        <button className="nav-arrow">❮</button>
        <h3>January 2025</h3>
        <button className="nav-arrow">❯</button>
      </div>

      <div className="day-selector">
        {days.map((day, index) => (
          <button
            key={index}
            className={`day-button ${index === selectedDateIndex ? 'selected' : ''}`}
            onClick={() => setSelectedDateIndex(index)}
          >
            <span>{day.date}</span>
            <span>{day.day}</span>
          </button>
        ))}
      </div>

      <h3 className="slot-title">Time Slots</h3>

      <div className="select-all-row">
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        <label>Select all</label>
      </div>

      <div className="time-slot-grid">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`slot ${selectedSlots.includes(slot) ? 'active' : ''} ${slot === disabledSlot ? 'disabled' : ''}`}
            onClick={() => toggleSlot(slot)}
          >
            {slot.split(' ').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </button>
        ))}
      </div>

      <div className="action-row">
        <button className="cancel-btn">Cancel</button>
        <div className="notify-checkbox">
          <input type="checkbox" checked={notifyUsers} onChange={() => setNotifyUsers(!notifyUsers)} />
          <label>Notify all users</label>
        </div>
        <button className="submit-btn">Mark as Maintenance</button>
      </div>

      <style>{`
        .management-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 30px;
          font-family: sans-serif;
        }

        .title {
          font-size: 26px;
          font-weight: 700;
        }

        .month-header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin: 20px 0;
        }

        .nav-arrow {
          font-size: 24px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .day-selector {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .day-button {
          width: 70px;
          height: 70px;
          background: #fff;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
          border-radius: 8px;
          font-weight: bold;
          text-align: center;
          cursor: pointer;
        }

        .day-button.selected {
          background: #27ae60;
          color: white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.25);
        }

        .slot-title {
          text-align: center;
          margin-top: 30px;
          font-size: 20px;
          font-weight: bold;
        }

        .select-all-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
          padding-left: 10px;
          font-size: 14px;
        }

        .time-slot-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  // gap: 5px;
  margin: 20px 0;
  justify-content: center;
}


       .slot {
  width: 80px;
  height: 80px;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 12px;
  padding: 10px;
  line-height: 1.2;
  text-wrap: wrap;
}


        .slot.active {
          background: #27ae60;
          color: white;
        }

        .slot.disabled {
          background: #e0e0e0;
          color: gray;
          pointer-events: none;
        }

        .action-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .cancel-btn {
          padding: 10px 20px;
          background: white;
          color: #27ae60;
          border: 2px solid #27ae60;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        .submit-btn {
          padding: 10px 20px;
          background: #27ae60;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        .notify-checkbox {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 768px) {
          .time-slot-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .day-button {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default Management;

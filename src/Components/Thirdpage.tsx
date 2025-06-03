import React, { useState, useEffect, useRef } from "react";

interface ManagementProps {
  onMaintenanceUpdate?: (maintenanceData: { [date: string]: string[] }) => void;
}

const Management: React.FC<ManagementProps> = ({ onMaintenanceUpdate }) => {
  const today = new Date();

  // Generate date range: 30 days before today, today, 30 days after
  const dateRange = Array.from({ length: 61 }).map((_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 30 + i);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return {
      date,
      label: {
        date: date.getDate(),
        day: dayNames[date.getDay()],
      },
    };
  });

  const todayIndex = 30;
  const [selectedDateIndex, setSelectedDateIndex] = useState(todayIndex);
  const [slotSelections, setSlotSelections] = useState<Record<number, string[]>>({});
  const [maintenanceDates, setMaintenanceDates] = useState<Record<string, string[]>>({});
  const [notifyUsers, setNotifyUsers] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const timeSlots = [
    "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM",
    "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
    "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
  ];

  const selectedSlots = slotSelections[selectedDateIndex] || [];
  const currentDateObj = dateRange[selectedDateIndex].date;
  const formattedCurrentDate = currentDateObj.toISOString().split("T")[0];
  const maintenanceSlots = maintenanceDates[formattedCurrentDate] || [];

  const containerRef = useRef<HTMLDivElement>(null);
  const currentDateRef = useRef<HTMLButtonElement>(null);

  // Scroll current date button into view on mount
  useEffect(() => {
    if (containerRef.current && currentDateRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const buttonRect = currentDateRef.current.getBoundingClientRect();

      const offset =
        buttonRect.left -
        containerRect.left -
        containerRef.current.clientWidth / 2 +
        buttonRect.width / 2;

      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    // Update selectAll checkbox based on selected slots
    const allSelected = timeSlots.every((slot) => selectedSlots.includes(slot));
    setSelectAll(allSelected);
  }, [selectedSlots]);

  const toggleSlot = (slot: string) => {
    const updatedSlots = selectedSlots.includes(slot)
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];

    setSlotSelections((prev) => ({ ...prev, [selectedDateIndex]: updatedSlots }));
  };

  const handleSelectAll = () => {
    setSlotSelections((prev) => ({
      ...prev,
      [selectedDateIndex]: selectAll ? [] : [...timeSlots],
    }));
    setSelectAll(!selectAll);
  };

  const handleCancel = () => {
    setSlotSelections((prev) => ({ ...prev, [selectedDateIndex]: [] }));
    setNotifyUsers(false);
  };

  const handleSubmit = () => {
    if (selectedSlots.length === 0) {
      alert("Please select some slots to mark as maintenance.");
      return;
    }

    const dateObj = dateRange[selectedDateIndex].date;
    const formattedDate = dateObj.toISOString().split("T")[0];

    const updatedMaintenance = {
      ...maintenanceDates,
      [formattedDate]: selectedSlots,
    };

    setSubmitting(true);
    setTimeout(() => {
      setMaintenanceDates(updatedMaintenance);
      onMaintenanceUpdate?.(updatedMaintenance);
      setSubmitting(false);
      alert(`Maintenance slots updated for ${formattedDate}!`);
    }, 1000);
  };

  return (
    <div
      className="management-container"
      style={{ maxWidth: 1600, margin: "0 auto", padding: 16 }}
    >
      <h2 style={{ marginBottom: 16 }}>← Management</h2>

      {/* Date selector */}
      <div
        ref={containerRef}
        className="day-selector"
        style={{ display: "flex", overflowX: "auto", gap: 8, paddingBottom: 10 }}
      >
        {dateRange.map((day, index) => (
          <button
            key={index}
            ref={index === todayIndex ? currentDateRef : null}
            onClick={() => setSelectedDateIndex(index)}
            style={{
              minWidth: 60,
              padding: "8px 10px",
              borderRadius: 6,
              border: index === selectedDateIndex ? "2px solid #007bff" : "1px solid #ccc",
              backgroundColor: index === todayIndex ? "#f0f8ff" : "#fff",
              cursor: "pointer",
            }}
          >
            <div>{day.label.date}</div>
            <div>{day.label.day}</div>
          </button>
        ))}
      </div>

      {/* Time slots header and select all */}
      <h3 style={{ margin: "16px 0 8px" }}>Time Slots</h3>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAll}
          id="selectAll"
          style={{ marginRight: 8 }}
        />
        <label htmlFor="selectAll">Select all</label>
      </div>

      {/* Time slots grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {timeSlots.map((slot) => {
          const isSelected = selectedSlots.includes(slot);
          const isMaintained = maintenanceSlots.includes(slot);

          // Slot colors: Blue if selected but not maintained, red if maintained
          let backgroundColor = "#fff";
          let border = "1px solid #ccc";

          if (isMaintained) {
            backgroundColor = "#ffe5e5"; // light red background
            border = "2px solid #f08080"; // red border
          } else if (isSelected) {
            backgroundColor = "#cce5ff"; // light blue background
            border = "2px solid #007bff"; // blue border
          }

          return (
            <button
              key={slot}
              onClick={() => toggleSlot(slot)}
              style={{
                padding: "6px 4px",
                borderRadius: 4,
                backgroundColor,
                border,
                fontSize: 12,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              {slot}
            </button>
          );
        })}
      </div>

      {/* Buttons and notify checkbox */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={handleCancel}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 4,
            flex: 1,
          }}
        >
          Cancel
        </button>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <input
            type="checkbox"
            checked={notifyUsers}
            onChange={() => setNotifyUsers(!notifyUsers)}
            id="notify"
            style={{ marginRight: 8 }}
          />
          <label htmlFor="notify">Notify all users</label>
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            backgroundColor: submitting ? "#6c757d" : "#007bff",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 4,
            flex: 1.5,
          }}
        >
          {submitting ? "Submitting..." : "Mark as Maintenance"}
        </button>
      </div>
    </div>
  );
};

export default Management;

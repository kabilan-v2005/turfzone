import React, { useState, useEffect } from "react";

interface ManagementProps {
  onMaintenanceUpdate?: (maintenanceData: { [date: string]: string[] }) => void;
}

const Management: React.FC<ManagementProps> = ({ onMaintenanceUpdate }) => {
  const today = new Date();

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

  useEffect(() => {
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

  const getDateStyle = (index: number, date: Date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const isSelected = index === selectedDateIndex;
    const isToday = index === todayIndex;
    const isMaintenance = maintenanceDates.hasOwnProperty(formattedDate);

    let bgColor = "#fff";
    if (isSelected) bgColor = "#e7f1ff";
    if (isMaintenance) bgColor = "#ffe5e5";
    if (isSelected && isMaintenance) bgColor = "#ffdddd";
    const border = isSelected ? "2px solid #007bff" : "1px solid #ccc";

    return { backgroundColor: bgColor, border };
  };

  return (
    <div className="management-container" style={{ maxWidth: 600, margin: "0 auto", padding: 16 }}>
      <h2 style={{ marginBottom: 16 }}>← Management</h2>

      <div className="day-selector" style={{ display: "flex", overflowX: "auto", gap: 8, paddingBottom: 10 }}>
        {dateRange.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDateIndex(index)}
            style={{
              minWidth: 60,
              padding: "8px 10px",
              borderRadius: 6,
              ...getDateStyle(index, day.date),
              cursor: "pointer",
            }}
          >
            <div>{day.label.date}</div>
            <div>{day.label.day}</div>
          </button>
        ))}
      </div>

      <h3 style={{ margin: "16px 0 8px" }}>Time Slots</h3>

      <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
        <input type="checkbox" checked={selectAll} onChange={handleSelectAll} id="selectAll" style={{ marginRight: 8 }} />
        <label htmlFor="selectAll">Select all</label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        {timeSlots.map((slot) => {
          const isActive = selectedSlots.includes(slot);
          return (
            <button
              key={slot}
              onClick={() => toggleSlot(slot)}
              style={{
                padding: "6px 4px",
                borderRadius: 4,
                border: isActive ? "2px solid #007bff" : "1px solid #ccc",
                backgroundColor: isActive ? "#cce5ff" : "#fff",
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

      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
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

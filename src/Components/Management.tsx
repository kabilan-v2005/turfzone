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

  const currentDateObj = dateRange[selectedDateIndex].date;
  const formattedDate = currentDateObj.toISOString().split("T")[0];
  const savedMaintenanceSlots = maintenanceDates[formattedDate] || [];

  useEffect(() => {
    const allSelected = timeSlots.every((slot) => selectedSlots.includes(slot));
    setSelectAll(allSelected);
  }, [selectedSlots]);

  const toggleSlot = (slot: string) => {
    const isAlreadySelected = selectedSlots.includes(slot);
    const isSavedMaintenance = savedMaintenanceSlots.includes(slot);

    if (isAlreadySelected && isSavedMaintenance) {
      const confirmRemove = window.confirm(
        `This slot (${slot}) is already marked as maintenance. Do you want to remove it?`
      );
      if (!confirmRemove) return;
    }

    const updatedSlots = isAlreadySelected
      ? selectedSlots.filter((s) => s !== slot)
      : [...selectedSlots, slot];

    setSlotSelections((prev) => ({
      ...prev,
      [selectedDateIndex]: updatedSlots,
    }));
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

  const getDateStyle = (index: number) => {
    const isSelected = index === selectedDateIndex;
    return {
      backgroundColor: isSelected ? "#e7f1ff" : "#fff",
      border: isSelected ? "2px solid #007bff" : "1px solid #ccc",
    };
  };

  return (
    <div style={{ width: "100%", maxWidth: "1000px", margin: "0 auto", padding: "16px" }}>
      <h2 style={{ marginBottom: 16 }}>← Management</h2>

      {/* Date Picker */}
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "8px",
          paddingBottom: "12px",
        }}
      >
        {dateRange.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDateIndex(index)}
            style={{
              minWidth: "60px",
              padding: "8px 10px",
              borderRadius: "6px",
              cursor: "pointer",
              ...getDateStyle(index),
            }}
          >
            <div>{day.label.date}</div>
            <div style={{ fontSize: 12 }}>{day.label.day}</div>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <h3 style={{ margin: "16px 0 8px" }}>Time Slots</h3>

      <div style={{ marginBottom: 12 }}>
        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            style={{ marginRight: 8 }}
          />
          Select all
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {timeSlots.map((slot) => {
          const isActive = selectedSlots.includes(slot);
          return (
            <button
              key={slot}
              onClick={() => toggleSlot(slot)}
              style={{
                padding: "8px 4px",
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

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={handleCancel}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 4,
            flex: "1 1 100px",
          }}
        >
          Cancel
        </button>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            flex: "2 1 200px",
          }}
        >
          <input
            type="checkbox"
            checked={notifyUsers}
            onChange={() => setNotifyUsers(!notifyUsers)}
          />
          Notify all users
        </label>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            backgroundColor: submitting ? "#6c757d" : "#007bff",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 4,
            flex: "2 1 200px",
          }}
        >
          {submitting ? "Submitting..." : "Mark as Maintenance"}
        </button>
      </div>
    </div>
  );
};

export default Management;

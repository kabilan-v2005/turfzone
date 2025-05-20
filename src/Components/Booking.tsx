import back from "../assets/back.svg";
import print from "../assets/print.svg";

const Booking = () => {
  return (
    <>
      <div>
        <button className="back">
          <img src={back} alt="back" className="back" />
          Booking
        </button>
        <div className="booking-content">
          <div></div>
          <div className="date">
            <img src={back} alt="back" className="back-icon" />
            Today
            <img src={back} alt="next" className="next-icon" />
          </div>
          <button className="expert-button">
            <img src={print} alt="print" className="print-icon" />
            Export table
          </button>
        </div>

        {/* Booking Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Name</th>
                <th>Phone No.</th>
                <th>Time</th>
                <th>Price in ₹</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "01",
                  "25/05/2024",
                  "AAAAA",
                  "1234567890",
                  "6:00 PM - 8:00 PM",
                  "600",
                  "Booked",
                ],
                [
                  "02",
                  "22/11/2023",
                  "BBBBB",
                  "7171282922",
                  "6:00 PM - 8:00 PM",
                  "600",
                  "Booked",
                ],
                [
                  "03",
                  "11/07/2024",
                  "CCCCC",
                  "0987655433",
                  "6:00 PM - 8:00 PM",
                  "600",
                  "Booked",
                ],
                [
                  "04",
                  "25/01/2024",
                  "DDDDD",
                  "1983764452",
                  "6:00 PM - 8:00 PM",
                  "600",
                  "Booked",
                ],
                [
                  "05",
                  "15/05/2024",
                  "EEEEE",
                  "0937378944",
                  "6:00 PM - 8:00 PM",
                  "600",
                  "Booked",
                ],
                [
                  "06",
                  "06/05/2023",
                  "FFFFF",
                  "1234567878",
                  "6:00 AM - 8:00 AM",
                  "600",
                  "Booked",
                ],
              ].map(([no, date, name, phone, time, price, status]) => (
                <tr key={no}>
                  <td>{no}</td>
                  <td>{date}</td>
                  <td>{name}</td>
                  <td>{phone}</td>
                  <td>{time}</td>
                  <td>{price}</td>
                  <td className="status">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .back {
          width: 200px;
          height: 61px;
          background: transparent;
          border: none;
          font-weight: 700;
          font-size: 40px;
          display: flex;
          align-items: center;
        }
        .back:hover {
          color:rgb(118, 123, 123);
          cursor: pointer;
        }
        .date {
          width: 200px;
          height: 61px;
          background: transparent;
          border: none;
          font-weight: 700;
          font-size: 40px;
          display: flex;
          align-items: center;
        }
        .back {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        .back-icon {
          width: 30px;
          height: 30px;
          margin-right: 40px;
        }
        .next-icon {
          width: 30px;
          height: 30px;
          margin-left: 40px;
          transform: rotate(180deg);
        }
        .booking-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .expert-button {
          width: 180px;
          height: 40px;
          background: black;
          color: white;
          border-radius: 5px;
          font-size: 20px;
          font-weight: 700;
          padding: 0 10px;
          
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .print-icon {
          width: 30px;
          height: 30px;
        }
        .table-container {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px; /* 10px vertical spacing between rows */
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: center;
}

th {
  background-color: #006400;
  color: white;
  border: 3px solid white;
}

td {
  background-color: #D6D6D6;
  border-right: 3px solid black; /* Add black line between columns */
}

/* Remove the black line from the last td in each row */
td:last-child {
  border-right: none;
}

/* Optional: visually group row with rounded corners and soft shadow */
tr {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

td.status {
  color: black;
  font-weight: bold;
}
/* Responsive for medium screens */
        @media (max-width: 768px) {
          .back {
            width: 160px;
            height: 50px;
            font-size: 28px;
          }
          .back-icon {
            width: 24px;
            height: 24px;
          }
        }
        /* Responsive for small screens */
        @media (max-width: 480px) {
          .back {
            width: 140px;
            height: 44px;
            font-size: 22px;
          }
          .back-icon {
            width: 20px;
            height: 20px;
          }
          table {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default Booking;

import back from "../assets/back.svg";
const Booking = () => {
  return (
    <>
      <div>
        <button className="back">
          <img
            src={back}
            alt="back"
            className="back-icon"
          />
          Booking
        </button>
        <div className="booking-content">
            <button className="expert-button">Add new booking</button>
          <button className="expert-button">Export table</button>
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

        .back-icon {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }

        /* Responsive for medium screens (tablets) */
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

        /* Responsive for small screens (mobile) */
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
        }
        .booking-content{
          display: flex;

          width:770px;
          hight: 60px;
          align-items: center;
          justify-content: right;
          
          }
        .expert-button {
          width: 180px;
          height: 40px;
            background: black;
            color: white;
        }
      `}</style>
    </>
  );
}

export default Booking;

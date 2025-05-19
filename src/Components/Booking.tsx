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
            <img src={back} alt="back" className="next-icon" />
          </div>
          <button className="expert-button">
            <img src={print} alt="print" className="print-icon" />
            Export table
          </button>
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
        .date{
         width: 200px;
          height: 61px;
          background: transparent;
          border: none;
          font-weight: 700;
          font-size: 40px;
          display: flex;
          align-items: center;
          }
          .back{
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
            padding:0;
          margin: 0;
            align-items: center;
            justify-content: space-between;
            display: flex;
        }
        .print-icon {
         width: 30px;
          height: 30px;
          margin-right: 0px;
          align-items: center;

          }
      `}</style>
    </>
  );
};

export default Booking;

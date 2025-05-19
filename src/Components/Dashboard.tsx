function Dashboard() {
  return (
    <>
      <div>
        <button className="back">Dashboard</button>
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


        /* Responsive for medium screens (tablets) */
        @media (max-width: 768px) {
          .back {
            width: 160px;
            height: 50px;
            font-size: 28px;
          }

         
        }

        /* Responsive for small screens (mobile) */
        @media (max-width: 480px) {
          .back {
            width: 140px;
            height: 44px;
            font-size: 22px;
          }

        
        }
      `}</style>
    </>
  );
}

export default Dashboard;

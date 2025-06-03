import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hedder from "./Components/Hedder";
import Hero from "./Components/Hero";
import Login from "./Login/Login";
import Secondpage from "./Components/Secondpage";
import Thirdpage from "./Components/Thirdpage";
import Layout from "./layout";
import Dashboard from "./Components/Dashboard";
import Booking from "./Components/Booking";
import Management from "./Components/Management";
import UserDetail from "./Components/UserDetail";
import { useRef, useEffect, useState } from "react";

function App() {
  const secondPageRef = useRef<HTMLDivElement>(null);
  const thirdPageRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [shouldScrollToThirdPage, setShouldScrollToThirdPage] = useState(false);

  const hasMounted = useRef(false);

  const scrollToSecondPage = () => {
    secondPageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToThirdPage = (date: Date) => {
    setSelectedDate(date);
    setShouldScrollToThirdPage(true);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (shouldScrollToThirdPage) {
      const timer = setTimeout(() => {
        thirdPageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);

      return () => {
        clearTimeout(timer);
        setShouldScrollToThirdPage(false);
      };
    }
  }, [selectedDate, shouldScrollToThirdPage]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hedder />
              <Hero onScrollClick={scrollToSecondPage} />
              <div ref={secondPageRef}>
                <Secondpage onScrollToThirdPage={scrollToThirdPage} />
              </div>
              <div ref={thirdPageRef}>
                <Thirdpage selectedDate={selectedDate} />
              </div>
            </>
          }
        />

        <Route path="/login" element={<Login />} />

        {/* ADMIN LAYOUT */}
        <Route path="/admin" element={<Layout />}>
          <Route index path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/booking" element={<Booking />} />
          <Route path="/admin/management" element={<Management />} />
          <Route path="/admin/userdetail" element={<UserDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

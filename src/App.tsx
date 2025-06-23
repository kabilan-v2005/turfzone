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
import User from "./Components/User";
import { useRef, useEffect, useState } from "react";

function App() {
  const secondPageRef = useRef<HTMLDivElement>(null);
  const thirdPageRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [shouldScrollToThirdPage, setShouldScrollToThirdPage] = useState(false);

  const userTriggeredScroll = useRef(false); // ✅ Track if user action triggered scroll

  // ✅ Scroll to top on initial page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scroll to Second Page when button is clicked
  const scrollToSecondPage = () => {
    secondPageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Trigger scroll to Third Page from Second Page (user action)
  const scrollToThirdPage = (date: Date) => {
    setSelectedDate(date);
    userTriggeredScroll.current = true; // ✅ Mark that scroll was user-initiated
    setShouldScrollToThirdPage(true);
  };

  // Scroll to Thirdpage only when user explicitly triggered it
  useEffect(() => {
    if (shouldScrollToThirdPage && userTriggeredScroll.current) {
      const timer = setTimeout(() => {
        thirdPageRef.current?.scrollIntoView({ behavior: "smooth" });
        setShouldScrollToThirdPage(false);
        userTriggeredScroll.current = false; // ✅ Reset after scroll
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [selectedDate, shouldScrollToThirdPage]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
        {/* ADMIN LAYOUT */}
        <Route path="/admin" element={<Layout />}>
          <Route index path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/booking" element={<Booking />} />
          <Route
            path="/admin/management"
            element={<Management onScrollToThirdPage={scrollToThirdPage} />}
          />
          <Route path="/admin/userdetail" element={<UserDetail />} />
          <Route path="/admin/userdetail/user" element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

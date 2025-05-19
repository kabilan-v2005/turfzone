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

import { useRef } from "react";

function App() {
  const secondPageRef = useRef<HTMLDivElement>(null);
  const thirdPageRef = useRef<HTMLDivElement>(null);

  const scrollToSecondPage = () => {
    secondPageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToThirdPage = () => {
    thirdPageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
                <Thirdpage />
              </div>
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/thirdpage" element={<Thirdpage />} />

        {/* ADMIN LAYOUT */}
        <Route path="/admin" element={<Layout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/booking" element={<Booking />} />
          <Route path="/admin/management" element={<Management />} />
          <Route path="/admin/userdetail" element={<UserDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

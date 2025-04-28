import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hedder from "./Components/Hedder";
import Hero from './Components/Hero';
import Login from './Login/Login';
import Secondpage from './Components/Secondpage';
import Thirdpage from './Components/Thirdpage';

import { useRef } from 'react';
// imports...

function App() {
  const secondPageRef = useRef<HTMLDivElement>(null);
  const thirdPageRef = useRef<HTMLDivElement>(null);

  const scrollToSecondPage = () => {
    secondPageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToThirdPage = () => {
    thirdPageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
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
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/thirdpage" element={<Thirdpage />} />
      </Routes>
    </Router>
  );
}


export default App;

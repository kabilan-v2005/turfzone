import { useState } from "react";
import "./Secondpage.css";

const images = ["/public/herosectionbgg.jpg", "/public/logo.png"];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Secondpage = ({
  onScrollToThirdPage,
}: {
  onScrollToThirdPage: () => void;
}) => {
  const today = new Date();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDate, setSelectedDate] = useState(today);
  const [clickedDate, setClickedDate] = useState<Date | null>(null);

  const nextImage = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  const nextWeek = () =>
    setSelectedDate(
      (prev) => new Date(prev.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
  const prevWeek = () =>
    setSelectedDate(
      (prev) => new Date(prev.getTime() - 7 * 24 * 60 * 60 * 1000)
    );
  const getWeekDates = () => {
    const start = new Date(selectedDate);
    const day = start.getDay() || 7;
    start.setDate(start.getDate() - day + 1);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const formatDate = (date: Date) => `${date.getDate()}`;

  return (
    <div className="container">
      <div className="slider">
        <button
          className="nav-btn left"
          onClick={prevImage}
          aria-label="Previous Image"
        >
          &#x276E;
        </button>
        <img src={images[currentSlide]} alt="Slider" />
        <button
          className="nav-btn right"
          onClick={nextImage}
          aria-label="Next Image"
        >
          &#x276F;
        </button>

        
      </div>

      <div className="calendar-nav">
        <button onClick={prevWeek}>&#x276E;</button>
        <span>
          {selectedDate.toLocaleString("default", { month: "long" })}{" "}
          {selectedDate.getFullYear()}
        </span>
        <button onClick={nextWeek}>&#x276F;</button>
      </div>

      <div className="weekdays">
        {getWeekDates().map((date, index) => (
          <div
            key={index}
            className={`day ${
              clickedDate?.toDateString() === date.toDateString()
                ? "selected"
                : ""
            }`}
            onClick={() => {
              setClickedDate(date);
              onScrollToThirdPage();
            }}
          >
            <span>{formatDate(date)}</span>
            <span>{weekdays[index]}</span>
          </div>
        ))}
      </div>

      <div className="footer-msg">Book The Slot And Enjoy Your Day!</div>
    </div>
  );
};

export default Secondpage;

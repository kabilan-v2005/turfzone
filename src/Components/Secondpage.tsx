import { useEffect, useState } from "react";
import "./Secondpage.css";
import image1 from "../assets/herosectionbgg.jpg";
import image2 from "../assets/logo.png";
import image3 from "../assets/heroImage.svg";

const images = [image1, image2, image3];
const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Secondpage = ({
  onScrollToThirdPage,
}: {
  onScrollToThirdPage: (date: Date) => void;
}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  const prevWeek = () => {
    const newDate = new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (newDate >= today) {
      setSelectedDate(newDate);
    }
  };

  const getWeekDates = () => {
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(selectedDate);
      date.setDate(selectedDate.getDate() + i);
      weekDates.push(date);
    }

    return weekDates;
  };
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, 3000); // Every 3 seconds

  return () => clearInterval(interval);
}, []);


  useEffect(() => {
    setClickedDate(today);
  }, []);

  const formatDate = (date: Date) => `${date.getDate()}`;

  const isPastDate = (date: Date) => date < today;

  const handleDateClick = (date: Date) => {
    if (isPastDate(date)) return;
    setClickedDate(date);
    onScrollToThirdPage(date);
  };

  const weekDates = getWeekDates();

  return (
    <div className="container">
      {/* Slider */}
      <div className="slider">
        <button className="nav-btn nav-left" onClick={prevImage}>
          &#x276E;
        </button>

        <div className="slider-image-wrapper">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Slide ${index + 1}`}
                className="slider-image"
              />
            ))}
          </div>
        </div>

        <button className="nav-btn nav-right" onClick={nextImage}>
          &#x276F;
        </button>
      </div>

      {/* Calendar */}
      <div className="calendar-nav">
        <button className="left-calendar" onClick={prevWeek}>
          &#x276E;
        </button>
        <span>
          {selectedDate.toLocaleString("default", { month: "long" })}{" "}
          {selectedDate.getFullYear()}
        </span>
        <button className="right-calendar" onClick={nextWeek}>
          &#x276F;
        </button>
      </div>

      <div style={{ overflowX: "auto", width: "100%" }}>
        <div className="weekdays">
          {weekDates.map((date, index) => {
            const isPast = isPastDate(date);
            const isSelected =
              clickedDate?.toDateString() === date.toDateString();

            return (
              <div
                key={index}
                className={`day ${isSelected ? "selected" : ""} ${
                  isPast ? "disabled" : ""
                }`}
                onClick={() => handleDateClick(date)}
              >
                <span>{formatDate(date)}</span>
                <span>
                  {weekdays[date.getDay() === 0 ? 6 : date.getDay() - 1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer-msg">Book The Slot And Enjoy Your Day!</div>
    </div>
  );
};

export default Secondpage;

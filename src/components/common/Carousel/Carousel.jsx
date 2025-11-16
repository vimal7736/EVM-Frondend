import { useState } from "react";
import "./Carousel.css";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = children.length;

  const goNext = () => setCurrentIndex((i) => (i + 1) % total);
  const goPrev = () => setCurrentIndex((i) => (i === 0 ? total - 1 : i - 1));

  return (
    <div className="carousel-container">

      {/* Slides */}
      <div className="carousel-wrapper">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children.map((child, index) => (
            <div className="carousel-slide" key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-bottom-controls">

        <button className="carousel-btn" onClick={goPrev}>
          ‹ 
        </button>

        <div className="carousel-dots">
          {children.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>

        <button className="carousel-btn" onClick={goNext}>
           ›
        </button>

      </div>
    </div>
  );
};

export default Carousel;

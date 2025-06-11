import React, { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1015/800/400",
  "https://picsum.photos/id/1019/800/400",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Slide ${index}`} className="carousel-image" />
        ))}
      </div>

      <button className="carousel-btn prev" onClick={goToPrev}>
        &#10094;
      </button>
      <button className="carousel-btn next" onClick={goToNext}>
        &#10095;
      </button>

      <div className="carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`dot ${currentIndex === idx ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

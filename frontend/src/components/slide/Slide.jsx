import React, { useEffect, useState } from "react";
import "./Slide.css";

const images = [
  
  "https://jooinn.com/images/purple-flower-lot.jpg",
  "https://cdn.pixabay.com/photo/2024/10/12/17/15/flowers-9115519_1280.jpg",
  "https://www.furman.edu/news/wp-content/uploads/sites/218/2025/05/irises-and-students-walking.jpg",
  "https://bloomingartificial.imgix.net/inspiration-images/walthamstow/artificial-lilac-bunch-on-wood-kitchen-island.png?auto=format%2Ccompress&crop=focalpoint&fit=crop&fp-x=0.27&fp-y=0.45&fp-z=1&h=1440&ixlib=php-3.3.1"
];

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className="header-contents">
        <h2>Bloom Where You're Planted</h2>
        <p>
          From delicate bouquets to bold floral arrangements, we bring
          nature's beauty right to your door. Celebrate love, life, and every
          little moment with flowers that speak from the heart.
        </p>
        <button>
          <a href="#arrivals">shop Collection</a>
        </button>
      </div>
    </div>
  );
};

export default Slide;
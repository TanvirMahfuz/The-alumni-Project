import React, { useState, useEffect, useRef } from "react";
// import placeholderImages from "../../../assets/imagePlaceHolder.js";
// import { Link } from "react-router-dom";
function ImageGallery({ images, height = "h-56", mdHeight = "md:h-96" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const indicatorsRef = useRef([]);

  useEffect(() => {
    if (carouselRef.current) {
      const items = carouselRef.current.children;
      for (let i = 0; i < items.length; i++) {
        items[i].classList.add("hidden", "duration-700", "ease-in-out");
        items[i].setAttribute("data-carousel-item", "");
      }
      items[currentIndex].classList.remove("hidden");
      items[currentIndex].setAttribute("data-carousel-item", "active");
    }

    if (indicatorsRef.current.length > 0) {
      indicatorsRef.current.forEach((indicator, index) => {
        indicator.setAttribute("aria-current", index === currentIndex);
      });
    }
  }, [currentIndex, images]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      id="indicators-carousel"
      className={`relative w-full`}
      data-carousel="static">
      {/* Carousel wrapper */}
      <div
        className={`relative  rounded-lg ${height} ${mdHeight}`}
        ref={carouselRef}>
        {images.length > 0 &&
          images.map((image, index) => (
            <div
              key={index}
              className={`absolute block w-full md:h-92 h-52 bg-[#f2f2f2] dark:bg-gray-900 rounded-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}
              data-carousel-item={index === 0 ? "active" : ""}
              style={{
                display: index === currentIndex ? "block" : "none",
              }}>
              <img
                src={image}
                className={`absolute block w-full md:h-90 h-50 rounded-xl -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 object-contain`}
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? "bg-white"
                : "bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
            }`}
            aria-current={index === currentIndex}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            onClick={() => goToSlide(index)}
            ref={(el) => (indicatorsRef.current[index] = el)}></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none opacity-20 hover:opacity-100"
        onClick={prevSlide}
        data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-amber dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none opacity-20 hover:opacity-100"
        onClick={nextSlide}
        data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default ImageGallery;

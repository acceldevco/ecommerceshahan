"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  alt?: string;
}

interface ImageSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}

export default function ImageSlider({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showArrows = true,
  showDots = true,
}: ImageSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !autoPlay) return;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isPlaying, autoPlay, autoPlayInterval]);

  // Pause on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);

  return (
    <div
      className="relative w-full h-[607px] bg-gray-200 overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Slider */}
      {/* <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt || `Slide ${slide.id}`}
              // fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div> */}
      <div className="relative h-[100%] p-50">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0  duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt || `Slide ${slide.id}`}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {/* {showDots && slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )} */}

      {/* Thumbnails */}
      {showThumbnails && slides.length > 1 && (
        <div className="absolute right-4 top-[20%] transform -translate-y-1/2 flex flex-col items-center overflow-hidden gap-3 px-2 py-4 rounded-[35px] bg-[#c3c4af]/20 backdrop-blur-sm shadow-xl z-10">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-3 h-3 relative overflow-hidden rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "ring-2 ring-[#c3c4af]/50 scale-110 w-5 h-5"
                  : "hover:scale-105 opacity-80 hover:opacity-100"
              }`}
            >
              <img
                src={slide.image}
                alt={`Thumbnail ${slide.id}`}
                className="w-full h-full object-cover"
              />
            </button>

            // <button
            //   key={slide.id}
            //   onClick={() => goToSlide(index)}
            //   className={`flex-shrink-0 w-12 h-12 relative overflow-hidden rounded-full transition-all duration-300 ${
            //     index === currentSlide
            //       ? "ring-2 ring-blue-500 scale-110"
            //       : "hover:scale-105 opacity-80 hover:opacity-100"
            //   }`}
            // >
            //   <img
            //     src={slide.image}
            //     alt={`Thumbnail ${slide.id}`}
            //     // fill
            //     className="object-cover"
            //   />
            // </button>
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {slides.length > 1 && (
        <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
          {currentSlide + 1} / {slides.length}
        </div>
      )}
    </div>
  );
}

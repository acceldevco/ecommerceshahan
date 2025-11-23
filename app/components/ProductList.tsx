"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  image: string;
  alt?: string;
}

interface ProductListProps {
  title?: string;
  products: Product[];
  backgroundImage?: string;
  autoPlay?: boolean;
}

export default function ProductList({
  title = "لیست محصولات",
  products,
  backgroundImage = "/frame-64.jpeg",
  autoPlay = false,
}: ProductListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    if (scrollContainerRef.current && products.length > 0) {
      const container = scrollContainerRef.current;
      const productCard = container.querySelector(
        ".product-card"
      ) as HTMLElement;
      if (productCard) {
        const cardWidth = productCard.offsetWidth;
        const gap = 24;
        const scrollAmount = cardWidth + gap;

        const maxScroll = container.scrollWidth - container.clientWidth;
        const newScrollLeft = Math.min(
          container.scrollLeft + scrollAmount,
          maxScroll
        );

        container.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });

        // Update current index
        const newIndex = Math.min(currentIndex + 1, products.length - 1);
        setCurrentIndex(newIndex);
      }
    }
  }, [currentIndex, products.length]);

  const prevSlide = useCallback(() => {
    if (scrollContainerRef.current && products.length > 0) {
      const container = scrollContainerRef.current;
      const productCard = container.querySelector(
        ".product-card"
      ) as HTMLElement;
      if (productCard) {
        const cardWidth = productCard.offsetWidth;
        const gap = 24;
        const scrollAmount = cardWidth + gap;

        const newScrollLeft = Math.max(container.scrollLeft - scrollAmount, 0);

        container.scrollTo({
          left: newScrollLeft,
          behavior: "smooth",
        });

        // Update current index
        const newIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(newIndex);
      }
    }
  }, [currentIndex, products.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (scrollContainerRef.current && products.length > 0) {
        const container = scrollContainerRef.current;
        const productCard = container.querySelector(
          ".product-card"
        ) as HTMLElement;
        if (productCard) {
          const cardWidth = productCard.offsetWidth;
          const gap = 24;
          const scrollAmount = (cardWidth + gap) * index;

          container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
          });
          setCurrentIndex(index);
        }
      }
    },
    [products.length]
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovering || products.length <= 1) return;

    const interval = setInterval(() => {
      if (currentIndex >= products.length - 1) {
        goToSlide(0);
      } else {
        nextSlide();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [
    autoPlay,
    currentIndex,
    isHovering,
    products.length,
    nextSlide,
    goToSlide,
  ]);

  // Handle scroll events to update current index
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const productCard = container.querySelector(
        ".product-card"
      ) as HTMLElement;
      if (productCard) {
        const cardWidth = productCard.offsetWidth;
        const gap = 24;
        const scrollPosition = container.scrollLeft;
        const newIndex = Math.round(scrollPosition / (cardWidth + gap));
        setCurrentIndex(Math.min(newIndex, products.length - 1));
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [products.length]);

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-4xl rounded-3xl bg-gray-100 py-16 mx-auto">
        <p className="text-2xl text-gray-500">محصولی برای نمایش وجود ندارد</p>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col justify-start items-center relative gap-6 rounded-3xl bg-[#B7B89F]/20 bg-cover bg-no-repeat bg-center p-6 backdrop-blur-sm"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Header */}
      <h2 className="text-xl font-bold text-gray-800 text-center  py-3 px-8 rounded-2xl shadow-lg border border-white/20">
        {title}
      </h2>

      {/* Slider Container */}
      <div
        className="flex justify-center items-center w-full gap-4 lg:gap-6 "
        dir="ltr"
      >
        {/* Previous Button */}
        <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 p-2 relative overflow-hidden gap-2.5 w-10 h-10 rounded-[63px] bg-[#777c6d]">
          <svg
            width="26"
            height="16"
            viewBox="0 0 26 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0"
            preserveAspectRatio="none"
          >
            <path
              d="M24.95 7.00409H3.36L8.66 1.71409C8.8483 1.52579 8.95409 1.27039 8.95409 1.00409C8.95409 0.73779 8.8483 0.482395 8.66 0.294092C8.4717 0.105788 8.2163 1.9841e-09 7.95 0C7.6837 -1.9841e-09 7.4283 0.105788 7.24 0.294092L0.24 7.29409C0.159276 7.38196 0.0949286 7.48356 0.05 7.59409C0.0444053 7.62719 0.0444053 7.66099 0.05 7.69409C0.0227351 7.77495 0.00593194 7.85897 0 7.94409V8.00409C0.000463186 8.11027 0.0208142 8.21541 0.0599999 8.31409C0.101505 8.42635 0.166251 8.52858 0.25 8.61409L7.25 15.6141C7.34296 15.7078 7.45356 15.7822 7.57542 15.833C7.69728 15.8838 7.82799 15.9099 7.96 15.9099C8.09201 15.9099 8.22272 15.8838 8.34458 15.833C8.46644 15.7822 8.57704 15.7078 8.67 15.6141C8.76373 15.5211 8.83812 15.4105 8.88889 15.2887C8.93966 15.1668 8.9658 15.0361 8.9658 14.9041C8.9658 14.7721 8.93966 14.6414 8.88889 14.5195C8.83812 14.3977 8.76373 14.2871 8.67 14.1941L3.36 9.00409H24.95C25.2152 9.00409 25.4696 8.89874 25.6571 8.7112C25.8446 8.52366 25.95 8.26931 25.95 8.00409C25.95 7.73887 25.8446 7.48452 25.6571 7.29699C25.4696 7.10945 25.2152 7.00409 24.95 7.00409Z"
              fill="white"
            ></path>
          </svg>
        </div>
        {/* Products Slider */}
        <>
          <div className="flex overflow-hidden gap-4 py-4 px-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[calc(100vw-32px)] xs:w-[calc(50vw-24px)] sm:w-[calc(33.333vw-32px)] md:w-[300px] lg:w-[280px]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </>
      </div>

      {/* Mobile Indicators */}
      <div className="lg:hidden flex justify-center items-center gap-2 pt-2">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-emerald-500 scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`رفتن به محصول ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

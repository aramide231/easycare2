import React, { useState, useEffect } from "react";

import authImg from "../../../assets/auth/auth-slide.png";
import authImg2 from "../../../assets/auth/auth-slide2.png";
import { Logo } from "@/constant/logo/Logos";

// Slide Data Interface
interface SlideItem {
  url: string;
  alt: string;
}

const SLIDES: SlideItem[] = [
  {
    url: authImg,
    alt: "Nurse working at desk",
  },
  {
    url: authImg2,
    alt: "Medical team analyzing clinical data",
  },
];

const AUTO_SLIDE_INTERVAL = 5000; // 5 seconds

export const Carousel: React.FC = () => {
  // We reverse the original array, and prepend a clone of the FIRST slide
  // For 2 slides, the layout becomes: [Slide1_Clone, Slide2, Slide1]
  const REVERSED_SLIDES = [SLIDES[0], ...[...SLIDES].reverse()];
  const START_INDEX = SLIDES.length; // This maps exactly to the real Slide 1 at the end of the array

  const [activeIndex, setActiveIndex] = useState<number>(START_INDEX);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setIsTransitioning(true);
      // Decrement instead of increment to move the container to the right
      setActiveIndex((prevIndex) => prevIndex - 1);
    }, AUTO_SLIDE_INTERVAL);

    // Clean up interval on component unmount
    return () => clearInterval(slideTimer);
  }, []);

  // This fires exactly when the CSS slide animation finishes
  const handleTransitionEnd = () => {
    // If we have just finished sliding down to 0 (the cloned first slide)...
    if (activeIndex === 0) {
      // Instantly turn off animations and snap back to the REAL first slide at the end
      setIsTransitioning(false);
      setActiveIndex(START_INDEX);
    }
  };

  const handleDotClick = (index: number) => {
    setIsTransitioning(true);
    // Map the standard left-to-right dot index to our reversed array layout
    setActiveIndex(SLIDES.length - index);
  };

  // Map the internal reversed activeIndex back to the standard 0, 1, 2... for dots
  const currentDotIndex = activeIndex === 0 ? 0 : SLIDES.length - activeIndex;

  return (
    <div className="hidden lg:flex w-1/2 bg-surface px-12 py-10 flex-col justify-between h-full min-h-scree">
      {/* Branding Header */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Logo />
        </div>
        <p className="text-muted w-[650px]">
          Powering hospitals with seamless patient management—from check-in to
          prescriptions—all in one place
        </p>
      </div>

      {/* Main Image Slider Wrapper */}
      <div className="relative w-full flex-1 max-h-[450px] mt-4 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
        <div
          className={`flex h-full w-full ${
            isTransitioning
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {REVERSED_SLIDES.map((slide, index) => (
            <div key={index} className="w-full h-full shrink-0">
              <img
                src={slide.url}
                alt={slide.alt}
                className="w-full h-full object-cover"
                loading={index === START_INDEX ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-1.5 rounded-full transition-all duration-300 outline-none focus:ring-1 focus:ring-violet-400 ${
              currentDotIndex === index
                ? "w-8 bg-violet-600"
                : "w-4 bg-white hover:bg-violet-200"
            }`}
            aria-label={`Switch to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

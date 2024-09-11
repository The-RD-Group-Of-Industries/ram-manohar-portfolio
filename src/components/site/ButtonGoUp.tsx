/**
 * A React component that renders a "Go Up" button that appears when the user scrolls down the page, and scrolls the page back to the top when clicked.
 * 
 * The button is positioned in the bottom right corner of the screen and has a smooth scrolling animation.
 * The button is only visible when the user has scrolled down the page, and is hidden when the user is at the top of the page.
 */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function ButtonGoUp() {
  const [onTop, setOnTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      if (scrollTop === 0) {
        setOnTop(true);
      } else {
        setOnTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    !onTop && (
      <Button
        className="fixed bottom-4 right-4 rounded-md bg-[#407BFF] hover:bg-[#1457e7] text-white md:text-xl text-[12px] md:text-[14px] p-2 z-50"
        onClick={handleScrollToTop}
      >
        <div className="absolute inset-0 rounded-lg blur-2xl bg-[#407BFF] opacity-70"></div>
        <div className="relative z-10 flex items-center">
          <p>Go Up</p>
        </div>
      </Button>
    )
  );
}

export default ButtonGoUp;

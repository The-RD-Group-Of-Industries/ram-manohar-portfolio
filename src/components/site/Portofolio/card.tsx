/**
 * Renders a portfolio card component with an image, title, and smooth scrolling functionality.
 *
 * @param data - An object containing the portfolio data, including the image, title, and scroll position.
 * @param bg - A string representing the background color class for the card.
 * @returns A React component that renders the portfolio card.
 */
"use client";
import { blog } from '@/resourse/images/exportImages';
import Image from 'next/image';
import React from 'react';
import { portfolio } from './data';

export default function PortfolioCard({ data, bg }: { data: portfolio, bg: string }) {
  
  // Function to handle scrolling
  const handleScroll = () => {
    window.scrollTo({
      top: parseFloat(data.scroll), // Convert string value to a float
      behavior: 'smooth', // Smooth scrolling
    });
  };

  return (
    <div 
      className="cursor-pointer relative max-w-xl mx-auto group transition-transform duration-300 ease-in-out group-hover:scale-105 mb-4 z-40"
      onClick={handleScroll} // Trigger scroll on click
    >
      <div className={`${bg} rounded-xl lg:rounded-[30px] md:rounded-2xl overflow-hidden relative hover:scale-105 transition-transform duration-300`}>
        <Image
          src={data.image || blog}
          alt="Random image"
          layout="fill"
          objectFit="cover"
          className="rounded-xl lg:rounded-[30px] md:rounded-2xl"
        />
        <div className="absolute inset-0 bg-[#374151db] opacity-60 rounded-xl lg:rounded-[30px] md:rounded-2xl transition-opacity duration-300 ease-in-out group-hover:opacity-70"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h2 className="text-white md:text-3xl text-lg font-semibold md:font-bold text-center">
            {data.title}
          </h2>
        </div>
      </div>
    </div>
  );
}

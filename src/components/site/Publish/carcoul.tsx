/**
 * Renders a carousel component with a list of published items.
 *
 * @param {Object} props - The component props.
 * @param {Published[]} props.data - An array of published items to display in the carousel.
 * @param {string} props.heading - The heading to display above the carousel.
 * @returns {JSX.Element} - The rendered carousel component.
 */

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Published } from "@prisma/client";
import Card from "./card";

function Carcouls({ data, heading }: { data: Published[]; heading: string }) {
  return (
    <div className="relative bg-[#FFFFFF08] shadow-custom rounded-lg p-5 lg:px-10 m-5 lg:mx-10 pb-20">
      <h1 className="relative z-10 font-bold text-center text-[2.5vh] lg:text-[4vh] text-transparent bg-clip-text bg-gradient-to-r from-[#D1C6C659] to-[#F3F3F3] my-2">
        {heading}
      </h1>
      <Carousel className="relative">
        <CarouselContent className="flex">
          {data.map((d, index) => (
            <CarouselItem
              key={index}
              className={`basis-1/${data.length} p-1 `}
            >
              <div className="transition-transform duration-300 hover:scale-105">
              <Card data={d} />

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute hidden  md:flex justify-between -bottom-8 left-1/2 transform -translate-x-1/2 space-x-2 z-20 w-[11vw]">
          <CarouselPrevious className="bg-blue-700 bg-opacity-30 backdrop-blur-sm border-none w-8 h-10 text-blue-500 hover:border-blue-400 rounded-full disabled:opacity-50" />
          <CarouselNext className="bg-blue-700 bg-opacity-30 backdrop-blur-sm border-none w-8 h-10 text-blue-500 hover:border-blue-400 rounded-full disabled:opacity-50" />
        </div>
      </Carousel>
    </div>
  );
}

export default Carcouls;

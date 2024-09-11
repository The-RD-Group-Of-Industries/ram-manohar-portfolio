/**
 * A React component that renders a carousel of `MainCard` components, displaying the "Best of the week" blog posts.
 *
 * @param {Object} props - The component props.
 * @param {Blog[]} props.data - An array of `Blog` objects to be displayed in the carousel.
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
import MainCard from "./MainCard";
import { Blog } from "@prisma/client";

function CrouselForMainCard({data}:{data:Blog[]}) {
  return (
    <div className="text-white w-[95%]  m-auto">
      <h1 className="relative z-10 font-bold text-center text-[2.5vh] lg:text-[4vh] text-transparent bg-clip-text bg-gradient-to-r my-2 md:my-5 from-[#D1C6C659] to-[#F3F3F3]">Best of the week</h1>
      <Carousel>
        <CarouselContent>
          {data.map((obj:any, index:number) => (
            <CarouselItem key={index}
            className={`md:basis-2/3 lg:basis-1/3 basis-1/1 lg:mx-auto mx-[1px] mb-5`}>
              <div className="p-1">
                <MainCard data={obj}/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute hidden w-[11vw] md:flex justify-between -bottom-8 left-1/2 transform -translate-x-1/2  space-x-2 z-20 ">
  <CarouselPrevious className="bg-blue-700 bg-opacity-30 backdrop-blur-sm border-none w-8 h-10 text-blue-500 hover:border-blue-400 rounded-full disabled:opacity-50" />
  <CarouselNext className="bg-blue-700 bg-opacity-30 backdrop-blur-sm border-none w-8 h-10 text-blue-500 hover:border-blue-400 rounded-full disabled:opacity-50" />
</div>

      </Carousel>
    </div>
  );
}

export default CrouselForMainCard;

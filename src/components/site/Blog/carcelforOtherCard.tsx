/**
 * A React component that renders a carousel of blog cards with unique types.
 *
 * @param {Object} props - The component props.
 * @param {Blog[]} props.dataBlog - An array of blog data objects.
 * @returns {JSX.Element} - The rendered carousel of blog cards.
 */

"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Blog } from "@prisma/client";
import { blog } from "@/resourse/images/exportImages";

export function AppleCardsCarouselDemo({ dataBlog }: { dataBlog: Blog[] }) {
  // Create a set to store unique card types
  const uniqueTypes = new Set<string>();
  
  // Filter dataBlog to include only unique card types
  const uniqueCards = dataBlog.filter((card) => {
    if (uniqueTypes.has(card.type)) {
      return false;
    } else {
      uniqueTypes.add(card.type);
      return true;
    }
  });

  // Map the filtered cards to Card components
  const cards = uniqueCards.map((card, index) => (
    <Card id={card.id} key={card.id} type={card.type} image={card?.image || blog} index={index} />
  ));

  return (
    <div className="text-white w-full ml-3 h-full py-10">
      <div className="relative">
  <h1 className="relative z-10 my-2 md:my-5 font-bold text-center text-[2.5vh] lg:text-[4vh] text-transparent bg-clip-text bg-gradient-to-r from-[#D1C6C659] to-[#F3F3F3]">
  More topics
  </h1>
  <div className="absolute inset-0 z-0 mx-auto h-[50px] w-[50px] rounded-full bg-[#155af0] blur-2xl opacity-70"></div>
</div>
    
      <Carousel items={cards} />
    </div>
  );
}

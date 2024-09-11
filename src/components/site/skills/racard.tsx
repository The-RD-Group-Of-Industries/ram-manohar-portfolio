/**
 * A React component that renders a card with a title, description, and an animated circular progress bar.
 *
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the card.
 * @param {string} props.desc - The description of the card.
 * @returns {JSX.Element} - The rendered RACard component.
 */
"use client";
import Image from 'next/image';
import React from 'react';
import { RAImage } from '@/resourse/images/skills/skillsExport';
import AnimatedCircularProgressBar from './advanceAnimation';
import useProgressValue from './progressBar';

function RACard({ title, desc, ...props }: { title: string, desc: string }) {
  const { value, elementRef } = useProgressValue("advance"); 

  return (
    <div
      ref={elementRef} // Attach the ref to the div for intersection observation
      className="w-[88vw] md:w-[45vw] lg:w-[46vw] mt-[4vh] lg:pt-[4vh] bg-[#FFFFFF08] rounded-2xl text-white lg:p-[3vh] p-[2vh] m-[0vh] lg:m-[2vh] flex lg:flex-row justify-between lg:items-start md:items-start items-center px-[5vw] md:px-2"
      {...props}
    >
      <div className="pb-10 lg:pb-auto">
        <h1 className="font-bold md:text-[3.5vh] text-[2vh] lg:text-[3.5vh]">
          {title}
        </h1>
        <p className="md:text-[2.6vh] text-[2vh] lg:text-[2.6vh] h-[5vh] lg:w-auto md:w-auto w-[56vw]">
          {desc}
        </p>
      </div>
      <div className="items-end">
        <div className="w-full lg:w-[10vw] md:ml-4 md:w-full">
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={value} // Pass the progress value here
            gaugePrimaryColor="rgb(47 149 63)"
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
            type="advance"
          />
        </div>
      </div>
    </div>
  );
}

export default RACard;

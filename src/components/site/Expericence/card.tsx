/**
 * Renders a card component that displays information about a work experience.
 *
 * @param {CardExpProps} props - The props for the card component.
 * @param {Works | { error: string }} props.work - The work experience data to display.
 * @returns {JSX.Element} - The rendered card component.
 */
"use client";
import React, { useState, useRef } from "react";
import { Works } from "@prisma/client";
import { useOutsideClick } from "@/utils/use-outside-click";
import { ChevronDown } from "lucide-react"; // Example icon library

interface CardExpProps {
  work: Works | { error: string };
}

export default function CardExp({ work }: CardExpProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useOutsideClick(containerRef, () => setIsExpanded(false));

  return (
    <div className="flex flex-row items-center justify-center" onClick={toggleExpand}>
      {"desc" in work ? (
        <div className="flex items-start justify-center md:items-center lg:items-center flex-col lg:flex-row md:flex-row lg:mx-10 mx-7 lg:justify-evenly lg:w-[93vw] w-[100vw] my-2 lg:my-5">
          {/* for year */}
          <div className="md:w-[20vw] flex justify-left items-center">
            <span className='bg-gradient-to-r bg-clip-text text-transparent tracking-tight from-[#FFFFFF] lg:text-[30px] text-[20px] to-[#FF8040] font-bold md:my-10 lg:my-10 font-mono lg:mr-4'>
              {work.start}-{work.end}
            </span>
          </div>
          {/* for info */}
          <div
            className={`text-white rounded-2xl lg:p-[5vh] bg-[#4F494921] relative z-10 p-[3vh] text-[5vh] md:py-[5vh] py-[2vh] lg:w-[75vw] w-[99.8%] md:w-[71%] cursor-pointer lg:h-auto my-2 lg:my-0 ${isExpanded ? 'max-h-[100vh]' : 'max-h-auto'}`}
            ref={containerRef}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className='text-[2.2vh] md:text-[3.6vh] font-[550]'>{work.title}</p>
                <p className='lg:text-[20px] font-mono text-[15px]'>{work.place}</p>
              </div>
              <button onClick={toggleExpand} className="ml-auto bg-transparent p-2">
                <ChevronDown className={`transform ${isExpanded ? 'rotate-180' : 'rotate-0'} transition-transform`} />
              </button>
            </div>
            {isExpanded && (
              <div className="mt-2">
               
                <ul className="list-disc ml-6 mt-2 text-xs md:text-sm ">
                  {work?.desc?.split('. ').map((sentence, index) => (
                    <li key={index} className="mt-1" dangerouslySetInnerHTML={{ __html: sentence.trim() }}  />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='text-white rounded-2xl lg:p-[4vh]'>
          <p className='text-[5vh] font-bold'>Error</p>
          <p className='text-[20px] font-mono'>{work.error}</p>
        </div>
      )}
    </div>
  );
}

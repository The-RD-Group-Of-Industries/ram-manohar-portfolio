/**
 * Renders a published page component with details such as the heading, image, authors, year, journal, weblinks, and the user's contribution.
 *
 * @param {Object} props - The component props.
 * @param {Published | null} props.data - The published data object.
 * @returns {JSX.Element} - The rendered published page component.
 */
import BlurIn from '@/components/magicui/blur-in';
import { Published } from '@prisma/client';
import Image from 'next/image';
import React from 'react';
import TypingAnimation from '@/components/magicui/typing-animation';
import { Share2Icon } from 'lucide-react';
import { RWebShare } from "react-web-share";

export default function PublishedRP({ data }: { data: Published | null }) {
  // Get the current page URL
  const currentURL = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className='px-[5vw] font-satoshi bg-gradient-to-b from-[#1E1E20] to-[#0E0E11] overflow-hidden text-gray-100 min-h-screen'>
      {/* Heading */}
      <div 
        className="flex-1 flex md:justify-center justify-start items-center"
        data-aos="fade-up" // AOS effect
      >
        <BlurIn 
          className="bg-gradient-to-r from-[#407cff8f] to-white bg-clip-text text-left text-transparent text-[22px] tracking-tight font-mono font-bold md:text-[3vh] lg:text-[4vh] py-2"
          word={`${data?.heading}`}               
        />
       
        <div
          className={`shadowHeading T4DHeading p-[36vw] `}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        ></div>
      </div>
      
      {/* Blog Content */}
      <div 
        className="flex flex-col justify-center items-center"
        data-aos="fade-right" // AOS effect
      >
        <div className={`w-auto h-[50vh]`}>
          <Image 
            src={data?.image || ""} 
            alt="Banner" 
            width="0"
            height="0"
            sizes="100vw"
            className={`w-auto h-[50vh] rounded-lg`}
            data-aos="fade-left" // AOS effect
          />
        </div>
        <div className="flex justify-between w-full mt-2">
          <TypingAnimation
            className="relative z-10 font-bold text-[3vh] md:text-[4vh] text-transparent bg-clip-text bg-gradient-to-r from-[#D1C6C659] to-[#F3F3F3] my-2 text-left"
            text={`By ${data?.authors}`}
            data-aos="slide-left" // AOS effect
          />
          <RWebShare
            data={{
              text: `${data?.heading}`,
              url: currentURL, // Share the current page URL
              title: "Publications",
            }}
            onClick={() => console.log("Shared successfully!")}
          >
            <div className="mt-2">
              <div
                className="bg-transparent shadow-md shadow-[#407cffcb] hover:bg-[#407cff22] hover:text-[#2e4cf8ea] rounded-full md:p-2 p-1"
              >
                <Share2Icon className="text-[#407cffcb] lg:w-auto w-[3vh]" />
              </div>
            </div>
          </RWebShare>
        </div>
      </div>
      
      {/* Additional Information */}
      <div 
        className="mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#d1c6c680] to-[#F3F3F3]"
      >
        <p><strong>Year:</strong> {data?.year}</p>
        <p><strong>Journal:</strong> {data?.journal}</p>
        {data?.weblinks && (
          <p>
            <strong>Weblinks:</strong> 
            <a href={data.weblinks} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {data.weblinks}
            </a>
          </p>
        )}
        {data?.myContribution && (
          <div>
            <strong>My Contribution:</strong>
            <div 
              className="text-[16px] md:text-base md:py-5 text-white md:px-10 py-3 px-5 bg-[#ffffff18] rounded-md md:rounded-lg"
              data-aos="fade-up" // AOS effect
              dangerouslySetInnerHTML={{ __html: data.myContribution }} // Render HTML content
            />
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Renders the Experience page component, which displays a list of work experiences.
 * The component supports showing a limited number of experiences initially, with an option to show all.
 * It uses the AOS library for animating the experience cards.
 *
 * @param {WorksExp} data - An object containing the work experience data.
 * @returns {JSX.Element} - The rendered Experience page component.
 */
"use client";
import React, { useState, useEffect } from 'react';
import Heading from '../heading';
import { Expericence } from '@/resourse/images/exportImages';
import CardExp from './card';
import { WorksExp } from '@/resourse/types';
import { Button } from '@/components/ui/button';
import AOS from 'aos';

function RenderPage({ data }: WorksExp) {
  const [showAll, setShowAll] = useState(false);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 1200, // Set the default animation duration
    });
  }, []);

  if ('error' in data) {
    return <div>Error: {data.error}</div>;
  }

  const worksToShow = showAll ? data : data.slice(0, 3);

  return (
    <div>
      <Heading bg='md:w-[97vw] md:relative left-[50px]' icon={Expericence} topic='Work Experience' shadow='T4DHeading p-[20vw]' />
      {Array.isArray(data) ? (
        <>
          {worksToShow.map((work, index) => (
            <div
              key={index}
              data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}               data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-delay="200"
              className="relative z-10"
            >
              <CardExp work={work} />
            </div>
          ))}

          <div className='w-[100vw] flex justify-center items-center md:px-10 lg:px-10 px-6'>
            {!showAll && data.length > 3 && (
              <Button
                className='rounded-md bg-[#407BFF] hover:bg-[#1457e7] text-white md:text-xl text-[12px] md:text-[14px] p-2 relative mb-[2vh]'
                onClick={() => setShowAll(true)}
              >
                <div className="absolute inset-0 rounded-lg blur-2xl bg-[#407BFF] opacity-70"></div>
                <div className="relative z-10 flex items-center">
                  <p>Show All</p>
                </div>
              </Button>
            )}
          </div>

        </>
      ) : (
        <div>No work data available</div>
      )}
    </div>
  );
}

export default RenderPage;

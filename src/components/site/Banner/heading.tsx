import BlurIn from '@/components/magicui/blur-in';
import React from 'react';

function Heading() {
  return (
    <div className='flex flex-col items-center lg:items-center ml-4 lg:ml-0 md:ml-0'>
      <h1 className='bg-gradient-to-r from-[#FFFFFF] to-[#407cff83] bg-clip-text text-transparent text-3xl tracking-tight md:text-[5vh] lg:text-[11vh] md:py-6 lg:py-6  text-center '>
        Hey!! I’m
      </h1>
      <BlurIn className='bg-gradient-to-r from-[#407cff9c] to-[#999999] bg-clip-text text-transparent text-2xl tracking-tight font-bold md:text-[2vh] lg:text-[7vh] lg:w-auto md:w-auto w-[70vw] text-left md:text-center lg:text-center md:py-4 lg:py-4'
      word="Ram Manohar Mishra"
      />
       
      <p className='text-[#75B7E7] font-bold py-1 md:py-3 lg:py-3 text-left md:text-center lg:text-center'>
        Expertise in Data Science
      </p>
    </div>
  );
}

export default Heading;



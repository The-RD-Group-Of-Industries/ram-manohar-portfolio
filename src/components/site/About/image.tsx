/**
 * A React component that renders a banner image with a blur-in animation effect.
 *
 * @param {object} props - The component props.
 * @param {string} props.image - The URL of the image to be displayed.
 * @returns {JSX.Element} - The rendered banner image component.
 */
"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import AOS from "aos"

export default function BannerImage({image}:{image:string}) {
  console.log(image);
  useEffect(() => {
    AOS.init({
        duration: 1200, // Set the animation duration (optional)
    });
}, []);
  return (
    <div className={`imageContainer flex items-center justify-center flex-col`}
    data-aos="slide-right"
    data-aos-duration="500"
    data-aos-easing="ease-in-out"
    data-aos-delay="200">
     
        <div className={`imageWrapper w-[30vw] lg:w-[20vw] md:w-[18vw]`}>
          <Image 
            src={image} 
            alt="Banner" 
            width="0"
            height="0"
            sizes="100vw"
            className={`image filter grayscale object-cover`}
          />
        </div>
          
      
    </div>
  );
}

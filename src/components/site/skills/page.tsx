/**
 * The `Skills` component renders the skills section of the website.
 * It displays a heading with an icon, a box component, and a grid of research and statistical skills cards.
 * The component uses the `AOS` library to add animation effects to the skills cards.
 */
"use client"
import React, { useEffect } from 'react'
import Heading from '../heading'
import { skills } from '@/resourse/images/exportImages'
import Box from './box'
import { RA } from "./data"
import RACard from './racard'
import AOS from 'aos';

export default function Skills() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Set the animation duration (optional)
    });
  }, []);
    return (
      <div>
        <Heading bg='left-10 md:relative md:w-[97vw]' shadow='SkillsHeading p-[20vw]' icon={skills} topic='Skills' />
        <Box />
      
<div className="relative">
  <h1 className="relative z-10 font-bold text-center text-[2.5vh] lg:text-[4vh] text-transparent bg-clip-text bg-gradient-to-r from-[#D1C6C659] to-[#F3F3F3]">
  Research & Statistical Skills
  </h1>
  <div className="absolute inset-0 z-0 mx-auto h-[50px] w-[50px] rounded-full bg-[#155af0] blur-2xl opacity-70"></div>
</div>
        <div className="flex flex-wrap justify-center  ">
        {RA.map((item, index) => (
          <RACard  title={item.title} desc={item.desc} 
          key={index}
          data-aos={index % 2 === 0 ? 'slide-right' : 'slide-left'} // Conditional AOS animation
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-delay="200"/>
        ))}
        </div>
       
       
      </div>
    )
  }
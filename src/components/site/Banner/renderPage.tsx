/**
 * The `BannerRPage` component is the main entry point for the banner section of the site. It renders the various sub-components that make up the banner, including the background, navbar, heading, skills, download CV, and banner image.
 *
 * The component uses several hooks to manage state and handle user interactions, such as the `useState` hook to track the open/closed state of the navbar, the `useEffect` hook to initialize the AOS animation library and handle click-outside events, and the `useRef` hook to reference the navbar element.
 *
 * The component is designed to be responsive, with different layouts and positioning of the sub-components based on the screen size. It also makes use of the AOS library to add smooth animations to the various elements.
 *
 * @param {object} props - The props passed to the component.
 * @param {string} props.image - The URL of the banner image.
 * @returns {JSX.Element} - The rendered `BannerRPage` component.
 */
"use client";
import React, { useState, useEffect, useRef } from 'react';
import Background from './background';
import Navbar from './navbar';
import Heading from './heading';
import Skills, { SkillsSmall } from './skills';
import DownloadCv from './downloadCv';
import BannerImage from './image';
import { LucideBarChart } from 'lucide-react';
import AOS from "aos";

const BannerRPage = ({ image }: { image: string }) => {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the animation duration (optional)
    });
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className='w-[100vw] md:h-[100vh] h-[90vh] lg:h-[100vh] rounded-b-[10vh] md:rounded-none lg:rounded-none' 
    >
      <div className='-top-[55vh] h-[100vh] relative w-[100vw]'>
        <Background />

        <div className='lg:hidden md:hidden relative top left-[90vw] -top-[42vh] z-10'>
          <LucideBarChart className="w-6 h-6 text-white hover:text-gray-100 rotate-90 mb-5" onClick={() => setOpen(!open)} />
        </div>

        <div
          className='flex flex-row justify-start md:justify-center lg:justify-center items-center relative lg:-top-[50vh] md:-top-[50vh] -top-[75vh]'
         
        >
          <div
            className="lg:block md:block hidden relative z-[70]"
            data-aos="slide-right"
        data-aos-duration="30"
        data-aos-easing="ease-in-out"
          >
            <Navbar />
          </div>

          <div
            className=' hidden md:flex flex-col md:left-[70px] lg:left-29 justify-center items-center md:top-12 lg:top-12 -top-16 relative z-50'
            data-aos="fade-up"
        data-aos-duration="70"
        data-aos-easing="ease-in-out"
          >
            <Heading />
            <Skills />
            <div className='hidden md:block lg:block'>
              <DownloadCv />
            </div>
          </div>

          {/* <div
            className="relative lg:left-[25vw] top-24 -left-[23vw] lg:top-10 md:left-[25vw]"
            data-aos="slide-left"
            data-aos-duration="100"
            data-aos-easing="ease-in-out"
            
          >
            <BannerImage image={image} />
          </div> */}
          <div
            className="hidden md:block relative lg:left-[5vw] top-24 -left-[50vw]  lg:top-10 md:left-[5vw]"
            data-aos="slide-left"
            data-aos-duration="100"
            data-aos-easing="ease-in-out"
            
          >
            <BannerImage image={image} />
          </div> 
        </div>

        <div
          className='md:hidden lg:hidden z-10 relative -top-[40vh]'
          data-aos="fade-up"
          data-aos-duration="70"
        >
          <Heading/>
          <BannerImage image={image} />
          <SkillsSmall />
          <div className={` flex w-full justify-center ${open ? 'z-0': 'z-50'}`} data-aos="slide-left"
            data-aos-duration="100"
            data-aos-easing="fade">
            <DownloadCv />
          </div>
          {open && (
            <div ref={navbarRef} className="relative z-50 mt-[10vh]  -top-[60vh] left-[52vw]" data-aos="fade-down">
              <Navbar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerRPage;

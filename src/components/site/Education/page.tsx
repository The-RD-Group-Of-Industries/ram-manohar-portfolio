/**
 * The `Education` component renders the education section of the site. It displays a heading with an icon and a collection of `Card` components that represent individual education items.
 *
 * The component uses the `AOS` (Animate On Scroll) library to add animations to the `Card` components as the user scrolls. The animations are set to slide in from the right or left depending on the index of the `Card` component.
 *
 * The data for the `Card` components is imported from the `./data` module.
 */
"use client"
import React, { useEffect } from 'react';
import Heading from '../heading';
import { education } from '@/resourse/images/exportImages';
import { education as data } from './data';
import Card from './card';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Ensure AOS styles are included

export default function Education() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Set the animation duration (optional)
    });
  }, []);

  return (
    <div className="mb-[6vh]">
      <Heading icon={education} topic="Education" bg="md:w-[97vw] md:relative left-[50px]" shadow="" />
      <div className="flex md:flex-row lg:flex-row flex-col md:flex-wrap lg:flex-wrap justify-center">
        {data.map((item, index) => (
          <Card
            key={index}
            bg={item.bg}
            shadow={item.shadow}
            title={item.title}
            desc={item.desc}
            heading={item.heading}
            data-aos={index % 2 === 0 ? 'slide-right' : 'slide-left'} // Conditional AOS animation
            data-aos-duration="800"
            data-aos-easing="ease-in-out"
            data-aos-delay="200"
          />
        ))}
      </div>
    </div>
  );
}

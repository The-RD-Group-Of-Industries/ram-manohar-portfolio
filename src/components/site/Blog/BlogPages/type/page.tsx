/**
 * Renders a blog page component that displays a list of blog posts of a specific type.
 *
 * @param {object} props - The component props.
 * @param {Blog[] | null} props.data - An array of blog posts, or null if no data is available.
 * @returns {JSX.Element | null} - The rendered blog page component, or null if no data is available.
 */

import BlurIn from '@/components/magicui/blur-in';
import { Blog } from '@prisma/client';
import React from 'react';
import CardRT from './card';

function BlogType({ data }: { data: Blog[] | null }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className='px-[2vw] font-satoshi bg-gradient-to-b from-[#1E1E20] to-[#0E0E11] overflow-hidden text-gray-100 min-h-screen'>
      {/* Heading */}
      <div
        className="flex-1 flex md:justify-center justify-start items-center"
        data-aos="fade-up" // AOS effect
      >
        <BlurIn
          className="bg-gradient-to-r from-[#407cff8f] to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-bold md:text-[4vh] lg:text-[7vh] py-2"
          word={`${data[0].type}`}
        />

        <div
          className={`shadowHeading T4DHeading p-[36vw] `}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        ></div>
      </div>

      {data.map((blog, index) => (
        <div
          key={index}
          data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-delay="200"
          className="relative z-10"
        >
          <CardRT data={blog} />
        </div>
      ))}
    </div>
  );
}

export default BlogType;
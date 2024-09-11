/**
 * A React component that renders a heading section with a background color, topic text, and an icon.
 *
 * @param {Heading} props - The props object containing the heading properties.
 * @param {string} props.bg - The background color for the heading section.
 * @param {string} props.topic - The topic text to be displayed.
 * @param {string | any} props.icon - The icon to be displayed alongside the topic text.
 * @param {string} props.shadow - The CSS class for the shadow effect on the topic text.
 * @returns {JSX.Element} - The rendered heading section.
 */
"use client"
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";

interface Heading {
  bg: string;
  topic: string;
  icon: string | any;
  shadow: string;
}

export default function Heading({ bg, topic, icon, shadow }: Heading) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the animation duration (optional)
    });
  }, []);
  return (
    <div
      className={`${bg} text-white w-[100vw] flex justify-between items-center md:px-10 lg:px-10 px-6`
    }
    data-aos="fade"
    data-aos-duration="1000"
    data-aos-easing="ease-in-out"
    data-aos-delay="200"
    >
      <div className="flex-1 flex md:justify-center justify-start items-center">
        <p className="bg-gradient-to-r from-[#407cff8f] to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2">
          {topic}
        </p>
        <div
          className={`shadowHeading ${shadow}  `}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        ></div>
      </div>
      <div className="lg:w-[5vw] md:w-[4vw] w-[10vw] flex items-center justify-center">
        <Image
          src={icon}
          alt="Banner"
          width={0}
          height={0}
          sizes="100vw"
          className=""
        />
      </div>
    </div>
  );
    return (
        <div className={` text-white w-[100vw] flex justify-between items-center md:px-10 lg:px-10 px-6`}>
            <div className="flex-1 flex md:justify-center justify-start lg:justify-center items-center">
                <p className={`bg-gradient-to-r ${bg} from-[#407cff8f] to-white bg-clip-text text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2`}>
                    {topic}
                </p>
                <div className={`shadowHeading ${shadow} absolute p-[36vw]`} style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
            </div>
            <div className="lg:w-[5vw] md:w-[4vw] w-[10vw] flex items-center justify-center">
                <Image 
                    src={icon} 
                    alt="Banner" 
                    width={0}
                    height={0}
                    sizes="100vw"
                    className=""
                />
            </div>
        </div>
    )
}

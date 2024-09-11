/**
 * The `Box` component displays a grid of skill boxes, each containing a title and a set of skill icons.
 * The component uses the `Data` object from `./data` to populate the content of the skill boxes.
 * The skill boxes are styled with a semi-transparent background, rounded corners, and a custom shadow.
 * The component also uses the `AOS` (Animate On Scroll) library to add fade-up animations to the skill boxes.
 */
"use client"
import React, { useEffect } from 'react';
import { Skills as Data } from "./data";
import SImage from './image';

const heading = "md:text-[20px] text-[14px] lg:text-[25px] font-semibold text-white text-center";

export default function Box() {
    // Initialize AOS animations
   

    return (
        <div className='grid md:grid-cols-2 gap-5 p-4 lg:mx-5 lg:mb-4 md:mx-5 mx-2'>
            <div className='flex flex-col space-y-5'>
                <div
                    className='flex-1 bg-[#00000030] shadow-ecustom shadow-[#A340FF1A] rounded-lg p-4'
                    data-aos="fade-up" // AOS effect
                >
                    <p className={heading}>{Data[0].title}</p>
                    <div className='flex flex-wrap justify-evenly items-center'>
                    {Data[0].icons.map((icon, index) => (
  <div key={index} className="md:w-fit w-[80vw]">
    <SImage icon={icon} type={Data[0].type[index]} />
  </div>
))}
                    </div>
                </div>
                <div
                    className='flex-1 bg-[#00000030] shadow-ecustom shadow-[#A340FF1A] rounded-lg p-4'
                    data-aos="fade-up" // AOS effect
                >
                    <p className={heading}>{Data[1].title}</p>
                    <div className='flex flex-wrap justify-evenly items-center'>
                        {Data[1].icons.map((icon, index) => (
                            <div key={index} className="md:w-fit w-[80vw]">
                                <SImage icon={icon} type={Data[1].type[index]} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex flex-col space-y-5'>
                <div
                    className='flex-1 bg-[#00000030] shadow-ecustom shadow-[#A340FF1A] rounded-lg p-4 flex flex-col items-center'
                    data-aos="fade-up" // AOS effect
                >
                    <p className={heading}>{Data[2].title}</p>
                    <div className='flex flex-wrap justify-evenly items-center md:mt-[4vh]'>
                        {Data[2].icons.map((icon, index) => (
                            <div key={index} className='md:w-fit w-[80vw]'>
                                <SImage icon={icon}  type={Data[2].type[index]}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className='flex-1 bg-[#00000030] shadow-ecustom shadow-[#A340FF1A] rounded-lg p-4'
                    data-aos="fade-up" // AOS effect
                >
                    <p className={heading}>{Data[3].title}</p>
                    <div className='flex flex-wrap justify-evenly items-center md:mt-[4vh]'>
                        {Data[3].icons.map((icon, index) => (
                            <div key={index} className='md:w-fit w-[80vw]'>
                                <SImage icon={icon}  type={Data[3].type[index]} />
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className='flex-1 bg-[#00000030] shadow-ecustom shadow-[#A340FF1A] rounded-lg p-4'
                    data-aos="fade-up" // AOS effect
                >
                    <p className={heading}>{Data[4].title}</p>
                    <div className='flex flex-wrap justify-evenly items-center md:mt-[4vh]'>
                        {Data[4].icons.map((icon, index) => (
                            <div key={index} className='md:w-fit w-[80vw]'>
                                <SImage icon={icon}  type={Data[4].type[index]} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Renders the portfolio page, displaying a grid of portfolio cards.
 *
 * @param data - An array of portfolio data objects to be displayed.
 * @returns A React component that renders the portfolio page.
 */
"use client"
import React, { useEffect } from 'react';
import PortfolioCard from './card';
import Heading from '../heading';
import { portfolio as image } from '@/resourse/images/exportImages';
import { portfolio } from './data';
import AOS from 'aos';

export default function RenderPage({ data }: { data: portfolio[] }) {
    useEffect(() => {
        AOS.init({
          duration: 1200, // Set the animation duration (optional)
        });
      }, []);
    return (
        <div className="mt-4">
            <Heading bg='md:relative left-[60px] md:w-[96vw]' icon={image} shadow='T4DHeading p-[20vw]' topic='Portfolio ' />
            <div className="grid grid-cols-2 lg:gap-[12rem] md:gap-[9rem] gap-[5rem] p-4 lg:mx-5 md:mx-5 mx-2">
               <div className='flex flex-col'>
               <div className="row-span-2"
               data-aos="fade-up">
                    {data[0] && <PortfolioCard bg='w-[50vw] h-[38vh]' data={data[0]} />}
                </div>
                <div data-aos="fade-up">
                    {data[1] && <PortfolioCard bg='w-[50vw] h-[38vh]' data={data[1]} />}
                </div>
               </div>
               <div className='flex flex-col mr-3'>
               <div data-aos="fade-up">
                    {data[2] && <PortfolioCard bg='w-[40vw] h-[24vh]' data={data[2]} />}
                </div>
                <div className="row-span-2" data-aos="fade-up">
                    {data[3] && <PortfolioCard bg='w-[40vw] h-[24vh]' data={data[3]} />}
                </div>
                <div data-aos="fade-up">
                    {data[4] && <PortfolioCard bg='w-[40vw] h-[24vh]' data={data[4]} />}
                </div>
               </div>
               
            </div>
        </div>
    );
}

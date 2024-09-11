"use client";
import React, { useState, useRef, useEffect } from "react";
import Heading from "../heading";
import { TD as image } from "@/resourse/images/exportImages";
import { dataTD as data } from "./dataTD";
import CardTD from "./card";
import { T4DProps } from "@/resourse/types";
import Link from "next/link";
import AOS from 'aos';

export default function T4D({ dataRsearch, dataWeb }: T4DProps) {
  const [openCards, setOpenCards] = useState([false, false]);

  const toggleOpen = (index: number) => {
    setOpenCards(openCards.map((open, i) => (i === index ? !open : open)));
  };
  useEffect(() => {
    AOS.init({
      duration: 1200, // Set the default animation duration
    });
  }, []);
  return (
    <div>
      <Heading bg="md:w-[97vw] md:relative left-[50px]" icon={image} shadow="p-[20vw] T4DHeading" topic="T4D & Analytics" />
      <div className="text-white shadow-custom shadow-[#0000001A] flex  flex-col justify-between my-2 md:my-2 mx-6 md:mx-8 rounded-[20px] md:py-8 lg:py-8 py-3 bg-[#FFFFFF08]">
        {[dataWeb, dataRsearch].map((dataSet, index) => (
          <div key={index}
            data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'} // Alternates between left and right animations
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-delay="200">
            <CardTD
              above={data[index].aboveH}
              icon={data[index].icon}
              below={data[index].Below}
              mid={data[index].h}
              onClick={() => toggleOpen(index)}
            />
            {openCards[index] && (
              <div className="md:mt-2 mt-[0px]  text-white rounded-lg md:p-2 p-0">
                {Array.isArray(dataSet) ? (
                  dataSet.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#ffffff18] rounded-lg mx-[3vh] my-5 md:mx-0 lg:mx-16 md:my-8 p-3 text-xs md:text-base"
                    >
                      {item.title && (
                        <h1 className="font-bold md: p-1 text-white text-sm md:text-lg lg:text-xl">
                          {item.title}
                        </h1>
                      )}
                      {item.Desc && <p className="md: p-1"> <p
                          dangerouslySetInnerHTML={{ __html: item.Desc }}
                          /></p>}
                      {item.Tech && (
                        <p className="flex flex-row md: p-1">
                          <strong className="flex flex-row">
                            Technology & Tools:{" "}
                          </strong>{" "}
                          {item.Tech}
                        </p>
                      )}
                      {item.contribution && (
                        <p className="flex flex-row md: p-1">
                          <strong className="flex flex-row">
                            Contribution:{" "}
                          </strong>{" "}
                          <p
                          dangerouslySetInnerHTML={{ __html: item.contribution }}
                          />
                          
                          
                        </p>
                      )}
                      {item.Website && (
                        <p className="flex flex-row md: p-1 overflow-x-hidden text-dashMain">
                          <strong className="flex flex-row">
                            Website:{" "}
                          </strong>{" "}
                          <Link href={item.Website as string} target="_blank" rel="noopener noreferrer">
                            {item.Website}
                          </Link>

                        </p>
                      )}
                      {item.username && (
                        <p className="flex flex-row md: p-1">
                          <strong className="flex flex-row">
                            Username:{" "}
                          </strong>
                          {item.username}
                        </p>
                      )}
                      {item.password && (
                        <p className="flex flex-row md: p-1">
                          <strong className="flex flex-row">
                            Password:{" "}
                          </strong>
                          {item.password}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>null</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

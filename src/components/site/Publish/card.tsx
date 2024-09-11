/**
 * This file is using the "use client" directive, which indicates that this file is part of the client-side rendering process in a Next.js application. The "use client" directive is used to opt-in to the new Next.js 13 client-side rendering feature, which allows for more granular control over the rendering process and can improve performance in certain scenarios.
 */
"use client";

import React, { useEffect } from "react";
import { Published } from "@prisma/client";
import { cn } from "@/lib/utils";
import AOS from "aos";
import { useRouter } from "next/navigation";

export default function Card({ data }: { data: Published }) {

  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

 
  const router = useRouter();

  const clickHandle = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('id', data?.id);
    router.push(`/Publication?${queryParams.toString()}`);
  };
  return (
    <div
      onClick={clickHandle}
      className={cn(
        "relative bg-cover cursor-pointer h-[56vh] bg-center shadow-lg overflow-hidden z-50 mx-5 ",
        data.type === "GOVT"
          ? "bg-[rgba(239,239,239,0.05)] lg:w-[35vw] md:w-[35vw] w-[80vw] backdrop-blur-xl rounded-[47px]"
          : "rounded-xl md:w-[40vw] w-[80vw] lg:w-[25vw]"
      )}
      style={{
        backgroundImage: data.image ? `url(${data.image})` : "",
      }}
      
      data-aos="zoom-in"
      data-aos-duration="400"
      data-aos-easing="ease-in-out"
      data-aos-delay="100"
    >
      {data.type === "RESEARCH" && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}

      <div className="relative p-9 text-white flex flex-col justify-end h-full">
        <h2 className="text-xl line-clamp-2 font-bold mb-4">{data.heading}</h2>
        {data.type === "GOVT" && (
          <p className="line-clamp-3 font-semibold">{data.myContribution}</p>
        )}
      </div>

     
    </div>
  );
}

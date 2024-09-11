/**
 * Renders a main card component for a blog post, including an image, title, and trending information.
 *
 * @param {Object} props - The component props.
 * @param {Blog} props.data - The blog post data.
 * @returns {JSX.Element} The rendered main card component.
 */

"use client"
import React from "react";
import Image from "next/image";
import { Blog } from "@prisma/client";
import { blog } from "@/resourse/images/exportImages";
import { useRouter } from "next/navigation";

function MainCard({ data }: { data: Blog }) {
  const router = useRouter();

  const clickHandle = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('id', data?.id);
    router.push(`/blog?${queryParams.toString()}`);
  };

  
  return (
    <div 
      className="bg-[#FFFFFF08] cursor-pointer hover:bg-[#ffffff27] shadow-[#0000001A] text-white rounded-lg shadow-lg p-4"
      onClick={clickHandle}
    >
      <div className="relative mx-5 md:mx-auto transition-transform duration-300 hover:scale-105">
      {data.image ? (
  <Image
    alt={data.title as string}
    height={300}
    width={400}
    className="w-[77vw] h-[350px] object-cover rounded-lg "
    src={data.image}
  />
) : (
  <Image
    alt={data.title as string}
    height={300}
    width={300}
    className="md:w-full w-[88vw] h-[350px] object-cover rounded-lg transition-transform duration-300 hover:scale-105"
    src={blog}
  />
)}

        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start rounded-lg p-4">
          <h3 className="text-center text-white text-lg font-semibold lg:px-2">
            {data.title || "Default Title"}
          </h3>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-md">
          {data.trending!= 0 &&  <p>Trending <span className="font-bold ">#{data.trending}</span></p>}
         
        </p>
      </div>
    </div>
  );
}

export default MainCard;

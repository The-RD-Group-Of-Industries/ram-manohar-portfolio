/**
 * A React component that renders a blog post card with an image, title, author, and description.
 *
 * @param {object} props - The component props.
 * @param {Blog} props.data - The blog post data.
 * @returns {JSX.Element} - The rendered blog post card.
 */

import Image from 'next/image';
import React from 'react';
import { Blog } from '@prisma/client';
import { useRouter } from 'next/navigation';

function CardRT({ data }: { data: Blog }) {
  const router = useRouter();

  const clickHandle = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('id', data?.id);
    router.push(`/blog?${queryParams.toString()}`);
  };

  // Function to truncate description to 1000 characters
  const truncateDesc = (desc: string) => {
    return desc.length > 1000 ? `${desc.substring(0, 1000)}...` : desc;
  };
  
  const truncateSmallDesc = (desc: string) => {
    return desc.length > 100 ? `${desc.substring(0, 100)}...` : desc;
  };

  return (
    <div
      onClick={clickHandle}
      className="px-[1vw] py-[1vw] mt-[3vh] mx-[2vh] relative z-10 rounded-md bg-[#ffffff18] hover:bg-[#ffffff53] flex font-satoshi overflow-hidden text-gray-100 transition-all transform hover:scale-105"
    >
      <Image
        width="0"
        height="0"
        sizes="100vw"
        src={data.image || ""} // replace with your image path
        alt={data.title || "type"}
        className="w-[40vw] md:h-[25vh] h-[18vh] rounded-lg md:mr-4 mr-2 transition-all transform hover:scale-105"
      />
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="md:text-xl text-base font-bold ">
            {data.title} {data.trending && (<h1>#{data.trending}</h1>)}
          </h2>
          <p className="md:text-sm text-xs text-gray-400 mt-1">Mahin Malek</p>
          {/* Full description */}
          <p 
            className="md:text-sm text-xs mt-2 md:block hidden" 
            dangerouslySetInnerHTML={{ __html: truncateDesc(data?.desc || '') }} // Render HTML description
          />
          {/* Truncated description for small screens */}
          <p 
            className="md:text-sm text-xs mt-2 block md:hidden"
            dangerouslySetInnerHTML={{ __html: truncateSmallDesc(data?.desc || '') }} // Render HTML description
          />
        </div>
      </div>
    </div>
  );
}

export default CardRT;

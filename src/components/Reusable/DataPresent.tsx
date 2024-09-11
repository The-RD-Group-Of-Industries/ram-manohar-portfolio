/**
 * Renders a component that displays data from a Blog, TD, Works, or Published object.
 *
 * @param {object} props - The component props.
 * @param {Blog | TD | Works | Published | null} props.data - The data to be displayed.
 * @returns {JSX.Element} - The rendered component.
 */

"use client"
import { Blog, Published, TD, Works } from '@prisma/client';
import React from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function DataPresent({ data }: { data: Blog | TD | Works | Published | null }) {
  const router = useRouter();

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="p-2 from-[#407cff4a] to-[#407cff23] bg-gradient-to-tr  shadow-lg lg:w-[75vw] md:w-[70%] m-1 w-[95vw]">
      <div className="flex  items-center m-1 ">
        <ArrowLeft
          className="cursor-pointer bg-blue-600 p-1 rounded-2xl text-gray-900 dark:text-white font-bold hover:text-blue-700 duration-300"
          size={24}
          onClick={() => router.back()}
        />
        
      </div>
      <div className='mx-8'>
      {Object.entries(data).map(([key, value]) => {
        const displayValue = value ? String(value) : 'Not provided';

        return value ? (
          <div key={key} className="mb-4">
            {key === 'image' && typeof value === 'string' ? (
              <div className="mb-3">
                <Image
                  src={value}
                  alt={key}
                  height={100}
                  width={200}
                  objectFit="cover"
                  className="rounded-md shadow-sm"
                />
              </div>
            ) : (
              <div className="text-gray-900 dark:text-white">
                <span className="font-bold text-blue-600 capitalize">
                  {key === 'desc' || key === 'myContribution' ? "Description" : key}:
                </span>
                <div
                  className="mt-2"
                  dangerouslySetInnerHTML={{ __html: displayValue }}
                />
              </div>
            )}
          </div>
        ) : null;
      })}
      </div>
      
    </div>
  );
}

export default DataPresent;

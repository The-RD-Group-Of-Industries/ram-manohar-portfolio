"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function BannerImage({image}:{image:string}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  

  return (
    <div className="flex justify-center items-center md:min-h-screen">
      {image && (
        <div className="lg:w-[44vw] w-[50vw] md:w-[29vw]">
          <Image
            src={image}
            alt="Banner"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-full filter grayscale object-cover"
            onLoad={() => setIsImageLoaded(true)}
          />
        </div>
      )}
    </div>
  );
}
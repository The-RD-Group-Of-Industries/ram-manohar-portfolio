/**
 * Renders a banner image component with the image URL retrieved from the `getAbout` action.
 *
 * @returns {JSX.Element} A React component that displays the banner image.
 */
import React from 'react';
import BannerImage from './image';
import { getAbout } from '@/core/actions/Dashboard/About/getAbout';

async function ImageName(){
  const Banner = await getAbout();
  return (
    <div className='lg:mx-10 lg:ml-9 flex flex-col justify-center items-center'>
      <BannerImage image={Banner?.imageUrl || ""}/>
    
    </div>
  );
};

export default ImageName;
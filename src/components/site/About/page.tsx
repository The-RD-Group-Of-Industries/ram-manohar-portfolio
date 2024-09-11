/**
 * The `About` component renders the about section of the website, including an image and contextual information.
 * 
 * The component uses the `Heading` component to display a heading with an icon, topic, and background styles.
 * It then renders the `ImageName` and `Context` components to display the image and contextual information.
 * 
 * This component is exported as the default export.
 */
import React from 'react';
import Heading from '../heading';
import { about } from '@/resourse/images/exportImages';
import ImageName from './ImageName';
import Context from './context';

function About(){
  return (
    <div className=''>
      <Heading icon={about} topic='About' bg='md:w-[97vw] md:relative left-[50px]' shadow='p-[36vw]'/>
      <div className=' to-[#1E1E21] lg:flex flex-row'> 
      <ImageName/>
      <Context/>
      </div>
  
    </div>
  );
};

export default About;
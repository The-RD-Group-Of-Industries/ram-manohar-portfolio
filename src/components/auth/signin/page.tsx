/**
 * Renders the sign-in page component, which includes a sign-in form and an optional sign-in image.
 *
 * The sign-in page is composed of two main elements:
 * - `SignInForm`: Renders the sign-in form for the user to enter their credentials.
 * - `SignImage`: Renders an optional sign-in image, which is hidden on smaller screens and displayed on larger screens.
 *
 * The component is responsible for the overall layout and composition of the sign-in page.
 */
import React from 'react';
import SignInForm from './form';
import SignImage from '../image';

function Sign(){
  return (
    <div className='flex w-[100vw]'>
      <SignInForm/>
      <div className='md:block lg:block hidden '>

      <SignImage/>
      </div>
    </div>
  );
};

export default Sign;
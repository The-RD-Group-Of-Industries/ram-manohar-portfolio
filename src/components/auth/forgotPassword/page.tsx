/**
 * Renders the Forgot Password page, which includes a form for the user to enter their email address to reset their password, and an image component.
 *
 * @returns {JSX.Element} The Forgot Password page component.
 */
import React from 'react';
import SignImage from '../image';
import ForgotPasswordForm from './form';

function ForgetPassword(){
  return (
    <div className='flex w-[100vw]'>
      <ForgotPasswordForm/>
      <div className='md:block lg:block hidden '>

      <SignImage/>
      </div>
    </div>
  );
};

export default ForgetPassword;
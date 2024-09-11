import React from 'react';
import signIn from "@/resourse/images/sign-in/signin.png"
import Image from 'next/image';
function SignImage(){
  return (
    <div className='bg-[#163564] flex justify-center items-center w-[60vw] h-[100vh]'>
      <Image
        src={signIn}
        alt= "signImage"
        height={500}
        width={500}
      />
    </div>
  );
};

export default SignImage;
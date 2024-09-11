/**
 * Renders a loading screen with a spinning loader and a shadow heading.
 * This component is typically used to display a loading state while waiting for data or content to be fetched.
 *
 * @returns {JSX.Element} The loading screen component
 */
import { Loader2 } from 'lucide-react';
import React from 'react';

function Loading() {
  return (
    <div className="font-satoshi bg-gradient-to-b dark:from-[#1E1E20] from-gray-100 to-gray-300 dark:to-[#0E0E11] flex-1 flex justify-center items-center w-[100vw] h-[100vh]">
      <Loader2 className=" imageWrapper animate-spin text-white bg-clip-text " size={48} />
      <div
          className={`shadowHeading T4DHeading  p-[35vw]`}
          style={{ left: "50%", transform: "translateX(-50%)" }}
        ></div>
    </div>
  );
}

export default Loading;

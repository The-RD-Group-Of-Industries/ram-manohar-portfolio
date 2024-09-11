/**
 * The `CardTD` component represents a card-like UI element with an icon, text content, and a button.
 *
 * @param {CardProps} props - The props for the `CardTD` component.
 * @param {string | any} props.icon - The URL or path of the icon to be displayed in the card.
 * @param {string} props.above - The text to be displayed above the middle text.
 * @param {string} props.mid - The middle text to be displayed.
 * @param {string} props.below - The text to be displayed below the middle text.
 * @param {() => void} props.onClick - The function to be called when the card is clicked.
 * @returns {JSX.Element} - The rendered `CardTD` component.
 */
// Importing necessary dependencies
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

// Defining the props interface for the CardTD component
interface CardProps {
  icon: string | any;
  above: string;
  mid: string;
  below: string;
  onClick: () => void;
}

// CardTD component definition
function CardTD({ icon, above, mid, below, onClick }: CardProps) {
  // State to manage the open/close status of the card
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the open/close state
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Main card container
    <div
      className="bg-[#e99c9c08] md:rounded-[20px] rounded-[10px] lg:m-6 md:mx-[3vh] mx-[2vh] m-[1.5vh] py-3 md:py-5 lg:mx-[8vh] flex md:flex-row flex-col justify-between items-center md:px-[5vh] px-[2vh] lg:px-[6vh] relative  before:z-50 "
      onClick={onClick}
    >
      {/* Icon container */}
      <div className={`w-[15vw] lg:w-[9vw] md:w-[9vw]`}>
        <Image
          src={icon}
          alt="Banner"
          width="0"
          height="0"
          sizes="100vw"
          className={`object-cover`}
        />
      </div>
      {/* Text content */}
      <p className="lg:text-[3.3vh] md:text-[2.5vh] text-[2vh] text-center text-white font-[550] md:font-semibold my-2 lg:my-4 mx-4 md:mx-[7px]">
        {above}
        <span className="text-[#5275c0ad]">{mid}</span>
        {below}
      </p>
     
      {/* Button component */}
      <Button
        className='absoult before:z-10 z-10 md:h-auto h-[5vh] rounded-md bg-[#407BFF] hover:bg-[#1457e7] text-white   ml-2'
        onClick={toggleOpen}
      >
        {/* Button background effect */}
        <div className="inset-0 rounded-lg blur-2xl bg-[#407BFF] opacity-70"></div>
        {/* Button text */}
        <div className="relative  before:z-50 flex items-center lg:text-[2.8vh] md:text-[2vh] text-[1.9vh] font-lg">
          <p>{isOpen ? 'Close' : 'Know more'}</p>
        </div>
      </Button>

    </div>
  );
}

export default CardTD;

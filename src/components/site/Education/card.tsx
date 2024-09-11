/**
 * A React functional component that renders a card with a title, description, and heading.
 *
 * @param {CardProps} props - The props for the card component.
 * @param {string} props.bg - The background color of the card.
 * @param {string} props.shadow - The box shadow of the card.
 * @param {string} props.title - The title of the card.
 * @param {string} props.desc - The description of the card.
 * @param {string} props.heading - The heading of the card.
 * @param {any} props.* - Any additional props that the component should accept.
 * @returns {React.ReactElement} - The rendered card component.
 */
import React from 'react';

interface CardProps {
  bg: string;
  shadow: string;
  title: string;
  desc: string;
  heading: string;
  [key: string]: any; // This allows the component to accept any additional props
}

const Card: React.FC<CardProps> = ({ bg, shadow, title, desc, heading, ...props }) => {
  return (
    <div
      className="text-gray-100 lg:p-[24px] md:mx-[20px] lg:mx-[40px] md:p-[22px] lg:m-5 md:m-3 mx-[25px] m-[15px] lg:rounded-[40px] md:rounded-[35px] rounded-[25px] p-[15px] lg:w-[40vw] md:w-[38vw] my-[9px]"
      style={{ backgroundColor: bg, boxShadow: `0 4px 20px ${shadow}` }}
      {...props} // Spread props here to apply data-aos and other attributes
    >
      <h1 className='font-semibold md:text-[24px] text-[19px] lg:text-[26px] mb-2'>{title}</h1>
      <h2 className='lg:text-[19px] md:text-[17px] text-[14px] text-[#F0E6E6]'>
        <span className='font-bold'>{heading}</span>{desc}
      </h2>
    </div>
  );
};

export default Card;

/**
 * Renders an image component with an animated circular progress bar.
 *
 * @param {object} props - The component props.
 * @param {string|any} props.icon - The source of the image to be displayed.
 * @param {string} props.type - The type of progress bar to display ('advance', 'beginner', or 'intermediate').
 * @returns {JSX.Element} - The rendered image and progress bar component.
 */
import Image from 'next/image';
import React from 'react';
import AnimatedCircularProgressBar from './advanceAnimation';
import useProgressValue from './progressBar';

export default function SImage({ icon,type }: { icon: string | any,type:string}) {
    const { value, elementRef } = useProgressValue(type); // Start at 0, increment by 20, every 500ms

    return (
            <div ref={elementRef} className='md:rounded-xl rounded-md lg:rounded-xl bg-[#ffffff40] p-[4px] my-3 md:mx-1 mx-1 lg:mx-[5] flex items-center justify-between'>
                <Image
                    src={icon}
                    alt="skills"
                    width={100}
                    height={100}
                    sizes="8vw"
                    className="md:w-full h-full object-cover"
                />
                <div className=" md:ml-4">
          <AnimatedCircularProgressBar
            max={100}
            min={0}
            value={value} // Pass the progress value here
            gaugePrimaryColor={type ==='advance'? "rgb(47 149 63)" : type ==='beginner'?"rgb(255,161,46)":"rgba(252,252,58,0.73)"}
            gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
            type={type}
          />
        </div>
            </div>
    );
}

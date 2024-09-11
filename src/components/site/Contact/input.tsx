/**
 * A React component that renders an input field with a hover effect.
 *
 * @param {object} props - The component props.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.id - The unique identifier for the input field.
 * @param {string} props.label - The label text for the input field.
 * @param {string} props.type - The type of the input field (e.g. 'text', 'email', 'password').
 * @param {string} props.name - The name of the input field.
 * @param {string} props.className - Additional CSS classes to apply to the input field.
 * @returns {JSX.Element} The rendered input field component.
 */

import React from 'react'
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

import { cn } from "@/lib/utils";
interface input{
    placeholder : string
    id : string
    label : string 
    type : string
    name : string
    className : string 
}

export default function InputContact({placeholder,id,label,type,name,className }:input) {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);
 
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);
 
    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
 
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }
    return (
        <div className={` flex flex-col justify-start w-moz-available `}>
            <label htmlFor={id}
                className='text-gray-100 font-bold font-satoshi my-3'
            >{label}  </label>
             <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--blue-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[2px] rounded-lg transition duration-300 group/input"
      >
            <input
            className={cn(
                `flex  w-full border-none bg-gray-300  text-black shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
              file:text-sm file:font-medium placeholder:text-neutral-500 
              focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 
               disabled:cursor-not-allowed disabled:opacity-50
               resize-y
               group-hover/input:shadow-none transition duration-400
               `,
                className
              )}
            name={name}
            placeholder={placeholder}
            id={id}
            type= {type}
            required
            />
            </motion.div>
        </div>

    )
}

/**
 * Renders a component that displays a set of skills in a visually appealing way.
 * The component is designed to be responsive, with a different layout for larger and smaller screens.
 * The skills are displayed as colored, rounded rectangles with shadows, and are grouped into rows.
 */
import React from 'react';

function Skills() {
  return (
    <div className='lg:w-fit md:w-fit  lg:visible rounded-lg bg-[#2A86FF08] text-[#f1f1f19d] p-5'>
      <div className='flex justify-center'>
        <div className='bg-[#a340ffc7] shadow-custom shadow-[#a340ff60] p-[6px] text-center m-2 rounded-md md:px-3 lg:px-6'>
          Data Science
        </div>
        <div className='bg-[#9c40ff67] shadow-custom shadow-[#9c40ff80] p-[6px] text-center m-2 rounded-md md:px-1 lg:px-2'>
          Research & Scientific Documentation
        </div>
      </div>
      <div className='p-[6px] text-center m-2 rounded-md bg-[#ff40a0c5] shadow-custom shadow-[#ff40a05e]'>
        Monitoring & Evaluation
      </div>
      <div className='flex justify-center'>
        <div className='p-[6px] text-center m-2 rounded-md bg-[#ff80408c] shadow-custom shadow-[#ff80408c] md:px-3 lg:px-7'>
          Analytics & Insights
        </div>
        <div className='p-[6px] text-center m-2 rounded-md bg-[#607F48] shadow-custom shadow-[#607f489d] md:px-3 lg:px-7'>
          Technology & Innovation
        </div>
      </div>
      <div className='p-[6px] text-center m-2 rounded-md bg-[#407cff83] shadow-custom shadow-[#407cff83]'>
        Statistical Modeling
      </div>
    </div>
  );
}

export default Skills;

export function SkillsSmall() {
  return (
    <div className=' lg:hidden md:hidden rounded-lg bg-[#2A86FF08] text-[#f1f1f19d] p-2 mx-8 mt-1'>
      <div className='grid grid-cols-1 gap-2 text-[12px]'>
        <div className='bg-[#a340ffc7] shadow-custom shadow-[#a340ff60] p-[4px] text-center rounded-md'>
          Data Science
        </div>
        <div className='bg-[#9c40ff67] shadow-custom shadow-[#9c40ff80] p-[4px] text-center rounded-md'>
          Research & Scientific Documentation
        </div>
        <div className='bg-[#ff40a0c5] shadow-custom shadow-[#ff40a05e] p-[4px] text-center rounded-md'>
          Monitoring & Evaluation
        </div>
        <div className='bg-[#ff80408c] shadow-custom shadow-[#ff80408c] p-[4px] text-center rounded-md'>
          Analytics & Insights
        </div>
        <div className='bg-[#607F48] shadow-custom shadow-[#607f489d] p-[4px] text-center rounded-md'>
          Technology & Innovation
        </div>
        <div className='bg-[#407cff83] shadow-custom shadow-[#407cff83] p-[4px] text-center rounded-md'>
          Statistical Modeling
        </div>
      </div>
    </div>
  );
}




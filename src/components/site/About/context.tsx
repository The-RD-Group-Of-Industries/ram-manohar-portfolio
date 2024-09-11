/**
 * Renders a component that displays a biography of Ram Manohar Mishra, a Technology for Development Specialist at UNICEF Ukraine.
 * The biography is split into multiple paragraphs and displayed differently based on the screen size.
 * On larger screens, all paragraphs are shown. On smaller screens, only the first paragraph is shown initially, with a "Read More" button to toggle the display of the full biography.
 * The component uses the AOS (Animate On Scroll) library to add a slide-left animation to the biography content.
 */
"use client"
import React, { useEffect, useState } from 'react';
import AOS from "aos"

const text = [
    "Hello, I am Ram Manohar Mishra, currently serving as Technology for Development Specialist at the UNICEF Ukraine country office. With more than 17 years of expertise in data science, I excel in converting data into actionable insights that drive informed decisions. I am dedicated to enhancing data accessibility and quality, empowering evidence-based programming, and promoting impactful decision-making. My profound understanding of research, evaluation methodologies, and statistical techniques, coupled with advanced data science skills, enables me to craft tailored solutions for effective monitoring and evaluation processes.",
    "My academic journey is highlighted by a Ph.D. in Statistics and a portfolio of twenty research publications in prestigious journals, underscoring my solid foundation in research methodologies and scientific documentation. As an innovation enthusiast, I passionately believe that each dataset has a unique story to tell, and I take pride in revealing and sharing these narratives through captivating data visualizations.",
    "I bring a wealth of experience to the table, harnessing cutting-edge technologies for complex statistical analyses, data modelling, and forecasting. This proficiency results in powerful visual representations that resonate with diverse audiences, amplifying the impact of data-driven insights."
];

function Context() {
    const [showFullText, setShowFullText] = useState(false);
    useEffect(() => {
        AOS.init({
            duration: 1200, // Set the animation duration (optional)
        });
    }, []);
    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    return (
        <div
        data-aos="slide-left"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-delay="200">
            {/* Full text display for larger screens */}
            <div className="hidden md:block lg:block lg:py-4 md:py-2 py-1">
                {text.map((paragraph, index) => (
                    <div key={index} className="bg-[#F0F0F008] p-5 rounded-lg text-[15px] text-white mx-10 my-4">
                        {paragraph}
                    </div>
                ))}
            </div>

            {/* Condensed text display for smaller screens */}
            <div className="block md:hidden lg:hidden py-2">
                {text.slice(0, showFullText ? text.length : 1).map((paragraph, index) => (
                    <div key={index} className="p-3 rounded-lg text-[15px] text-white mx-5 my-2">
                        {paragraph}
                    </div>
                ))}
                <button
                    onClick={toggleText}
                    className="text-blue-500 cursor-pointer text-[14px] px-1 rounded mt-2 mx-10 relative z-50 "
                >
                    {showFullText ? "Read Less..." : "Read More..."}
                </button>
            </div>
        </div>
    );
}

export default Context;

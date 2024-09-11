/**
 * The `Navbar` component renders a navigation bar with a list of tabs that allow the user to scroll to different sections of the page.
 * 
 * The tabs are defined in the `tabs` array, which contains information about each tab's icon, title, and scroll position for desktop and mobile devices.
 * 
 * The `Navbar` component uses the `useState` hook to keep track of the currently active tab. When a tab is clicked, the component scrolls the window to the corresponding section of the page.
 * 
 * The component is styled using Tailwind CSS classes to create a rounded, semi-transparent background for the navigation bar, and to style the individual tab items.
 */
"use client"
import { Component, Contact2, File, Home, SparklesIcon, Workflow, Zap, InfoIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Education, ChartPie } from "@carbon/icons-react";

// Define type for tab items
interface Tab {
  key: number;
  icon: React.ElementType;
  title: string;
  scrollDesktop: string;
  scrollMobile: string;
}

// Tabs array
const tabs: Tab[] = [
  { key: 1, icon: Home, title: "Home", scrollDesktop: "0vh", scrollMobile: "0vh" },
  { key: 2, icon: InfoIcon, title: "About", scrollDesktop: "650vh", scrollMobile: "650vh" },
  { key: 3, icon: Education, title: "Education", scrollDesktop: "1200vh", scrollMobile: "1270vh" },
  { key: 4, icon: Workflow, title: "Work", scrollDesktop: "1820vh", scrollMobile: "1950vh" },
  { key: 5, icon: SparklesIcon, title: "Skills", scrollDesktop: "2460vh", scrollMobile: "2650vh" },
  { key: 6, icon: ChartPie, title: "T4D & Analytics", scrollDesktop: "3900vh", scrollMobile: "5100vh" },
  { key: 7, icon: Component, title: "Blog", scrollDesktop: "4450vh", scrollMobile: "5700vh" },
  // { key: 8, icon: Zap, title: "Portfolio", scrollDesktop: "5550vh", scrollMobile: "6550vh" },
  { key: 9, icon: File, title: "Publications", scrollDesktop: "5550vh", scrollMobile: "6550vh" },
  { key: 10, icon: Contact2, title: "Contact", scrollDesktop: "6790vh", scrollMobile: "8200vh" }
];

// Navbar component
function Navbar(){
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const handleClick = (key: number) => {
    setActiveTab(key);
    
    // Find the tab that was clicked
    const tab = tabs.find(tab => tab.key === key);
    
    if (tab) {
      // Determine the scroll value based on the screen width
      const scrollPosition = window.innerWidth <= 768 ? parseInt(tab.scrollMobile) : parseInt(tab.scrollDesktop);
      
      // Scroll the window to the desired position
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className='text-gray-800 rounded-xl bg-[#ffffffc2] md:bg-[#ffffff13] lg:bg-[#ffffff13] py-2 w-[40vw] md:w-[14vw] lg:w-[12vw] px-[2px] md:text-white lg:text-white items-center text-[13px] '>
      <ul className='flex flex-col space-y-2'>
        {tabs.map(tab => (
          <li
            key={tab.key}
            onClick={() => handleClick(tab.key)}
            className={`flex items-center space-x-2 p-2 rounded-full text-center justify-center cursor-pointer 
              ${activeTab === tab.key ? 'bg-[#407cff75]' : 'hover:bg-[#407cff75]'}
            `}
          >
            <tab.icon className='w-4 h-4 text-gray-800 md:text-white lg:text-white' />
            <span className='text-center'>{tab.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navbar;

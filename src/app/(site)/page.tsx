/**
 * The main page component for the site, which renders various sections including a banner, about, education, work experience, skills, T4D, blogs, portfolio, published work, contact, and a footer.
 * 
 * This component serves as the entry point for the site, bringing together all the different sections and components that make up the overall user experience.
 */
import React from "react";
import Banner from "@/components/site/Banner/page";
import Contact from "@/components/site/Contact/page";
import About from "@/components/site/About/page";
import Education from "@/components/site/Education/page";
import Skills from "@/components/site/skills/page";
import T4D from "@/components/site/T4D/page";
import Work from "@/components/site/Expericence/page";
import Published from "@/components/site/Publish/page";
import Blogs from "@/components/site/Blog/page";
import Portflio from "@/components/site/Portofolio/page";
import Footer from "@/components/site/Footer/page";
import ButtonGoUp from "@/components/site/ButtonGoUp";

function SitePage() {
 

  return (
    <div className="font-satoshi bg-gradient-to-b from-[#1E1E20] to-[#0E0E11] overflow-hidden">
      <Banner />
      <About />
      <Education />
      <Work />
      <Skills />
      <T4D />
      <Blogs />
      {/* <Portflio /> */}
      <Published />
      <Contact />
      <Footer/>
      <ButtonGoUp/>
     
    </div>
  );
}

export default SitePage;

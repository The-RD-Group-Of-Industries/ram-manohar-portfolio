/**
 * The main page component for the blog section of the site.
 * 
 * This component renders the `EachBlog` component, which displays the individual blog posts, and the `Footer` component.
 * 
 * The component also initializes the AOS (Animate On Scroll) library, which provides animations for elements as the user scrolls the page.
 */
"use client"

import React, { useEffect } from "react";
import EachBlog from "@/components/site/Blog/BlogPages/page";
import AOS from "aos";
import { Suspense } from "react";
import Footer from "@/components/site/Footer/page";
function Page() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      once: true,    // Whether animation should happen only once - while scrolling down
    });
  }, []);
    
  return (
  <Suspense>
       <EachBlog/>
<Footer/>
  </Suspense>)
}

export default Page;

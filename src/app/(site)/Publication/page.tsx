/**
 * The main page component for the Publication section of the site.
 * 
 * This component initializes the AOS (Animate On Scroll) library and renders the `EachPublication` and `Footer` components within a `Suspense` boundary.
 */
"use client"

import React, { useEffect } from "react";
import AOS from "aos";
import { Suspense } from "react";
import EachPublication from "@/components/site/Publish/pages/page";
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
       <EachPublication/>
<Footer/>
  </Suspense>)
}

export default Page;

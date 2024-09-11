/**
 * The `Contact` component is the main entry point for the contact page of the application. It renders a contact form and a banner image.
 *
 * The component uses the `AOS` (Animate On Scroll) library to add fade-in animations to the page elements as the user scrolls. The `useEffect` hook is used to initialize the `AOS` library when the component mounts.
 *
 * The component renders a title and a banner image, both of which are wrapped in a flex container. The title is styled using a gradient background and the banner image is positioned to the right of the title.
 *
 * Finally, the `ContactForm` component is rendered at the bottom of the page.
 */
"use client";
import ContactForm from "./from";
import Image from "next/image";
import { contact } from "@/resourse/images/exportImages";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true,     // Whether the animation should happen only once
    });
  }, []);

  return (
    <div className="mb-10">
      <div
        className="flex-1 flex md:justify-center justify-start items-center transition-all duration-500 ease-in-out"
        data-aos="fade-up"
      >
        <p
          className="bg-gradient-to-r from-[#407cff8f] to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2 ml-5 transition-transform duration-500 ease-in-out"
          data-aos="fade-right"
        >
          Get in Touch with me
        </p>
        <div
          className="lg:w-[5vw] relative left-[22vw] md:left-[25vw] md:w-[4vw] w-[10vw] flex items-center justify-end transition-transform duration-500 ease-in-out"
          data-aos="fade-left"
        >
          <Image
            src={contact}
            alt="Banner"
            width={0}
            height={0}
            sizes="100vw"
            className=""
          />
        </div>
      </div>
      <ContactForm />
    </div>
  );
}

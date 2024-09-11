/**
 * The `Footer` component represents the footer section of the website. It includes social media links and a copyright notice.
 *
 * The footer is centered and has a dark background color. It contains a section with a set of social media links, each represented by a rounded icon. The links are styled with a hover effect that changes the background color and text color.
 *
 * Below the social media links, there is a copyright notice that includes a link to the website's owner, "RRMTech.in".
 */
"use client";

import React from "react";
import {
  FaFacebookF,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="text-center bg-[#0E0E11]">
      <div className="container p-5 md:p-6">
        <section className="flex justify-center items-center gap-4 md:gap-8 mb-2 md:mb-4 w-full flex-wrap">
          <div className="flex rounded-full">
            <Link
              href="#!"
              className="bg-transparent shadow-md shadow-[#407cffcb] hover:bg-[#407cff22] hover:text-[#2e4cf8ea] rounded-full p-2 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaFacebookF className="text-[#407cffcb]" />
            </Link>
          </div>

          <div className="flex rounded-full">
            <Link
              href="#!"
              className="bg-transparent shadow-md shadow-[#407cffcb] hover:bg-[#407cff22] hover:text-[#2e4cf8ea] rounded-full p-2 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaTwitter className="text-[#407cffcb]" />
            </Link>
          </div>

          <div className="flex rounded-full">
            <Link
              href="#!"
              className="bg-transparent shadow-md shadow-[#407cffcb] hover:bg-[#407cff22] hover:text-[#2e4cf8ea] rounded-full p-2 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaGoogle className="text-[#407cffcb]" />
            </Link>
          </div>

          <div className="flex rounded-full">
            <Link
              href="#!"
              className="bg-transparent shadow-md shadow-[#407cffcb] hover:bg-[#407cff22] hover:text-[#2e4cf8ea] rounded-full p-2 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaInstagram className="text-[#407cffcb]" />
            </Link>
          </div>

          <div className="flex rounded-full">
            <Link
              href="#!"
              className="bg-transparent shadow-md shadow-[#407cffcb] hover:bg-[#407cff22] hover:text-[#2e4cf8ea] rounded-full p-2 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaLinkedin className="text-[#407cffcb]" />
            </Link>
          </div>

          <div className="flex rounded-full">
            <Link
              href="#!"
              className="bg-transparent shadow-md shadow-[#407cffa3] hover:bg-[#407cff22] hover:text-[#2e4cf8ea] rounded-full p-2 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaGithub className="text-[#407cffcb]" />
            </Link>
          </div>
        </section>
      </div>

      <div className="text-center text-[#2e4cf883] p-3 bg-[#0c0c0fe1]">
        © 2024 Copyright:
        <Link href="https://rrmtech.in" className="text-blue-500 hover:underline">
          RRMTech.in
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

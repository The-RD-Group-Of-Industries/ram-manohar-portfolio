/**
 * A React component that renders an image for the "About" section of a dashboard.
 * It handles the display of the image, including loading state and the ability to remove the image.
 * If no image is provided, it displays an upload component to allow the user to upload a new image.
 *
 * @param {object} props - The component props.
 * @param {string} props.image - The URL of the image to display.
 * @param {string} props.imageKey - The unique identifier for the image.
 * @returns {JSX.Element} - The rendered component.
 */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import UploadImage, { RemoveButton } from "@/resourse/Uploadthings/UploadImage";
import Loading from "../../Reusable/loadingPage";

export default function AboutImageComp({
  image,
  imageKey,
}: {
  image: string;
  imageKey: string;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <div className=" w-auto overflow-x-hidden mx-auto  font-semibold font-mono flex justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="">
          {image ? (
            <div className="h-auto w-auto flex flex-col justify-evenly items-center">
              <div className="flex-1 flex md:justify-center justify-start items-center">
                <p className="bg-gradient-to-r from-[#0851ee8f] via-[#407cff8f] to-blue-900 dark:from-[#407cff8f] dark:to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2">
                  About photo
                </p>
                <div
                  className={`shadowHeading T4DHeading absolute p-[10vw]`}
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                ></div>
              </div>{" "}
              <div className=" from-[#407cff4a] to-[#407cff23] bg-gradient-to-tr relative z-10 md:px-40 py-6 rounded-lg flex items-center justify-center flex-col">
                <Image src={image} alt="About" width={300} height={300} />
                <RemoveButton imageUrl={image} imageKey={imageKey} type="About" />
              </div>
            </div>
          ) : (
            <div className="h-auto w-auto flex-col flex justify-evenly items-center relative z-40">
              <div className="flex-1 flex md:justify-center justify-start items-center">
                <p className="bg-gradient-to-r from-[#0851ee8f] via-[#407cff8f] to-blue-900 dark:from-[#407cff8f] dark:to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2">
                  Upload image
                </p>
                <div
                  className={`shadowHeading T4DHeading absolute p-[10vw]`}
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                ></div>
              </div>
              <div className=" from-[#407cff4a] to-[#407cff23] bg-gradient-to-tr relative z-10 md:px-40 py-6 rounded-lg flex items-center justify-center flex-col h-[80vh]">
                <UploadImage type="About" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

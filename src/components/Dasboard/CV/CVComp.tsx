/**
 * The `CVComp` component is responsible for rendering the CV section of the dashboard. It displays either a PDF preview of the uploaded CV or a button to upload a new CV.
 *
 * @param image - The URL of the uploaded CV PDF.
 * @param imageKey - The unique key for the uploaded CV PDF.
 * @returns A React component that renders the CV section.
 */
"use client";

import React, { useState } from "react";

import Loading from "../../Reusable/loadingPage";
import UploadPdf, { RemoveButton } from "@/resourse/Uploadthings/UploadPdf";

export default function CVComp({
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
                 CV
                </p>
                <div
                  className={`shadowHeading T4DHeading absolute p-[10vw]`}
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                ></div>
              </div>{" "}
              <div className=" from-[#407cff4a] to-[#407cff23] bg-gradient-to-tr relative z-10 md:px-40 py-6 rounded-lg flex items-center justify-center flex-col">
                <iframe src={image} width="300" height="300" style={{border: "none"}}></iframe>
                <RemoveButton imageUrl={image} imageKey={imageKey} />
              </div>
            </div>
          ) : (
            <div className="h-auto w-auto flex-col flex justify-evenly items-center relative z-40">
              <div className="flex-1 flex md:justify-center justify-start items-center">
                <p className="bg-gradient-to-r from-[#0851ee8f] via-[#407cff8f] to-blue-900 dark:from-[#407cff8f] dark:to-white bg-clip-text text-left text-transparent text-[26px] tracking-tight font-mono font-thin md:text-[4vh] lg:text-[7vh] py-2">
                  Upload CV
                </p>
                <div
                  className={`shadowHeading T4DHeading absolute p-[10vw]`}
                  style={{ left: "50%", transform: "translateX(-50%)" }}
                ></div>
              </div>
              <div className=" from-[#407cff4a] to-[#407cff23] bg-gradient-to-tr relative z-10 md:px-40 py-6 rounded-lg flex items-center justify-center flex-col h-[80vh]">
                <UploadPdf type="CV" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

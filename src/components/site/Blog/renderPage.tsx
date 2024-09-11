/**
 * Renders the blog page, including a heading, a carousel for the main blog post, and a carousel for other blog posts.
 *
 * @param {Object} props - The component props.
 * @param {Blog[]} props.data - An array of blog posts to be displayed.
 * @returns {JSX.Element} The rendered blog page.
 */

import React from "react";
import Heading from "../heading";
import { blog} from "@/resourse/images/exportImages";
import { Blog} from "@prisma/client";
import { AppleCardsCarouselDemo } from "./carcelforOtherCard";
import CrouselForMainCard from "./corcelForMainCard";

function RenderPage({ data }: { data: Blog[] }) {
  console.log("data of blogs: ", data);
  return (
    <div>
      <Heading bg="md:relative left-[50px] md:w-[97vw]" icon={blog} shadow=" md:p-[20vw] T4DHeading" topic="Blog" />
      <div className="text-white">
        <CrouselForMainCard data={data}/>
      </div>

      <div>
        <AppleCardsCarouselDemo dataBlog={data} />
      </div>
    </div>
  );
}

export default RenderPage;

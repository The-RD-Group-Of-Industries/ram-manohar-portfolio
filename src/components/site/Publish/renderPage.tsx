/**
 * Renders a page that displays published research articles and government reports.
 *
 * @param dataRsearch - An array of `Published` objects representing the published research articles.
 * @param dataGovt - An array of `Published` objects representing the government reports.
 * @returns A React component that renders the page.
 */
import React from "react";
import Heading from "../heading";
import { publish } from "@/resourse/images/exportImages";
import Carcouls from "./carcoul";
import { Published } from "@prisma/client";

function RenderPage({
  dataRsearch,
  dataGovt,
}: {
  dataRsearch: Published[];
  dataGovt: Published[];
}) {
  console.log("dataRsearch", dataRsearch, "dataGovt", dataGovt);
  return (
    <div>
      <Heading bg="md:w-[97vw] md:relative left-[50px]" icon={publish} shadow="p-[1vw]" topic="Publications" />
      <div>
        <Carcouls
          heading="Published 20 research articles in high-impact peer reviewed journals."
          data={dataRsearch}
        />

        <Carcouls
          heading="Contributed to three reports published by Government of India and International Organizations."
          data={dataGovt}
        />
      </div>
    </div>
  );
}

export default RenderPage;

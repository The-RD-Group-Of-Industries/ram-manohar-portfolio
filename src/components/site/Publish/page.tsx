/**
 * Renders the Published page component, which displays published research and government data.
 *
 * This function is responsible for fetching the published research and government data, and then rendering the `RenderPage` component with the fetched data.
 *
 * @returns {JSX.Element} The rendered Published page component.
 */
import React from "react";
import RenderPage from "./renderPage";
import {
  getPublishedGovt,
  getPublishResearch,
} from "@/core/actions/Dashboard/Published/getPublish";

async function Published() {
  const rescreach = await getPublishResearch();
  const govt = await getPublishedGovt();
  return <RenderPage dataRsearch={rescreach} dataGovt={govt} />;
}

export default Published;

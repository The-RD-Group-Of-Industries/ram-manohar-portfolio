/**
 * Fetches the blog data and renders the blog page.
 *
 * @returns {JSX.Element} The rendered blog page.
 */
import React from "react";
import RenderPage from "./renderPage";
import { getBlog } from "@/core/actions/Dashboard/Blog/getBlog";

async function Blogs() {
  const blog = await getBlog();
  return <RenderPage data={blog} />;
}

export default Blogs;

/**
 * Renders the banner component for the site.
 *
 * This function is an asynchronous server-side component that fetches the banner data from the `getBanner` action and renders the `BannerRPage` component with the fetched image URL.
 *
 * @returns {JSX.Element} The rendered banner component.
 */


"use server"
import { getBanner } from '@/core/actions/Dashboard/Banner/getBanner';
import React from 'react'
import BannerRPage from './renderPage';

async function Banner() {
  const bannerData = await getBanner();
  return (
      <BannerRPage image={bannerData?.imageUrl ||""} />
  )
}
export default Banner;

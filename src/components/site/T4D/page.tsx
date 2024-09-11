/**
 * Fetches data from the T4 Research and Web APIs and renders the T4D page.
 *
 * @returns A React component that displays the T4D page with the fetched data.
 */
import { getTDResearch, getTDWeb } from '@/core/actions/Dashboard/T4/getData';
import React from 'react';
import T4DRender from './renderPage';

async function T4D() {
  try {
    const dataRes = await getTDResearch();
    const dataWeb = await getTDWeb();

    console.log("Research Data:", dataRes);
    console.log("Web Data:", dataWeb);

    return (
      <div>
        <T4DRender dataRsearch={dataRes} dataWeb={dataWeb} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div>
        <p>Failed to load data. Please try again later.</p>
      </div>
    );
  }
}

export default T4D;

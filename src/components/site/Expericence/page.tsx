/**
 * Fetches and renders the work experience data.
 *
 * This function is responsible for fetching the work experience data from the backend using the `getWorks` function, and then rendering the data using the `RenderPage` component.
 *
 * If there is an error fetching the data, it will display a message to the user indicating that the data failed to load.
 *
 * @returns A React element that displays the work experience data, or a message indicating that the data failed to load.
 */
import React from 'react';
import RenderPage from './renderPage';
import { getWorks } from '@/core/actions/Dashboard/Expericence/getExp';

async function Work() {
  try {
    const dataRes = await getWorks();
    console.log("Data fetched:", dataRes);

    if ('error' in dataRes) {
      console.error("Error fetching data:", dataRes.error);
    }

    return (
      <div>
        <RenderPage data={dataRes} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div>
        <p>Failed to load work experience data. Please try again later.</p>
      </div>
    );
  }
}

export default Work;

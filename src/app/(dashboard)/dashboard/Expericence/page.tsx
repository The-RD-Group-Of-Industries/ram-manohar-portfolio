/**
 * Renders the Experience page component with the fetched work experience data.
 *
 * This function is responsible for fetching the work experience data using the `getWorks` function, and then rendering the `ExperiencePage` component with the fetched data.
 *
 * If there is an error while fetching the data, it will return a fallback component with an error message.
 *
 * @returns {JSX.Element} The rendered Experience page component, or a fallback component in case of an error.
 */
import { ExperiencePage } from '@/components/Dasboard/Experience/page';
import { getWorks } from '@/core/actions/Dashboard/Expericence/getExp';
import React from 'react';

async function page() {
  try {
    const dataRes = await getWorks();
    console.log("Data fetched:", dataRes);

    // Check if dataRes contains an error
    if ('error' in dataRes) {
      console.error("Error fetching data:", dataRes.error);
      // Return a message if there is an error
      return (
        <div>
          <p>Failed to load work experience data. Please try again later.</p>
        </div>
      );
    }

    // Render ExpericencePage only if dataRes is not an error
    return (
        <ExperiencePage data={dataRes} />

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

export default page;

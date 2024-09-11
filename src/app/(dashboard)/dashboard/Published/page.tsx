import { PublishPage } from '@/components/Dasboard/Publish/page';
import { db } from '@/resourse';
import React from 'react';

/**
 * Asynchronously fetches and renders the published data from the database.
 *
 * This function is the page component for the "/dashboard/published" route. It
 * fetches the published data from the database using the `db.published.findMany()`
 * method, and then renders the `PublishPage` component with the fetched data.
 *
 * If there is an error fetching the data, it will display a message indicating
 * that the data failed to load and to try again later.
 */
async function page() {
  try {
    const allTickets = await db.published.findMany();
    console.log("Data fetched:", allTickets);

    if ('error' in allTickets) {
      console.error("Error fetching data:", allTickets.error);
      return (
        <div>
          <p>Failed to load published data. Please try again later.</p>
        </div>
      );
    }

    return (
      <div>
        <PublishPage data={allTickets} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div>
        <p>Failed to load published data. Please try again later.</p>
      </div>
    );
  }
}

export default page;

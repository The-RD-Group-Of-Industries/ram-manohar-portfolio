/**
 * Fetches all tickets from the database and renders the TDPage component with the fetched data.
 * If there is an error fetching the data, it displays a message to the user.
 */
import TDPage from '@/components/Dasboard/TD/page';
import { db } from '@/resourse';
import React from 'react';

async function page() {
  try {
    const allTickets = await db.tD.findMany();
    console.log("Data fetched:", allTickets);

    // Check if allTickets contains an error
    if ('error' in allTickets) {
      console.error("Error fetching data:", allTickets.error);
      // Return a message if there is an error
      return (
        <div>
          <p>Failed to load tickets data. Please try again later.</p>
        </div>
      );
    }

    // Render TDPage only if allTickets is not an error
    return (
      <div>
        <TDPage data={allTickets} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return (
      <div>
        <p>Failed to load tickets data. Please try again later.</p>
      </div>
    );
  }
}

export default page;

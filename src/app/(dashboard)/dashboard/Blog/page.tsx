/**
 * Renders the Blog page component with the fetched blog data.
 *
 * @returns {JSX.Element} The Blog page component with the fetched blog data.
 */
import { BlogPage } from '@/components/Dasboard/Blog/page';
import { getBlog } from '@/core/actions/Dashboard/Blog/getBlog';
import React from 'react';

async function page() {
    const allTickets = await getBlog();
    
return(

  <BlogPage data={allTickets} />
)
}

export default page;
 


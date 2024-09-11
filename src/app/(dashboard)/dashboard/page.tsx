/**
 * This is the main page component for the dashboard feature. It redirects the user to the `/dashboard/Banner` route immediately upon rendering, and displays a loading indicator while the redirect is in progress.
 */
"use client"
import Loading from '@/components/Reusable/loadingPage';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Page() {

  useEffect(() => {
    redirect('/dashboard/Banner');
  }, []);

  return (
    <div>
      <Loading/>
    </div>
  );
}

/**
 * A React component that provides a button to download the user's CV.
 * 
 * The component fetches the CV PDF URL from the `getCV` action, and when the button is clicked, it creates a temporary link element to initiate the download of the CV PDF.
 */
"use client"
import { Button } from '@/components/ui/button'
import { getCV } from '@/core/actions/Dashboard/CV/getCV';
import { Download } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function DownloadCv() {
  const [cv, setCv] = useState<string>();

  useEffect(() => {
    const fetchCV = async () => {
      const result = await getCV();
      setCv(result?.pdfUrl || "");
    }
    fetchCV();
  }, []);

  const handleDownload = () => {
    if (cv) {
      const link = document.createElement('a');
      link.href = cv;
      link.setAttribute('download', 'CV.pdf'); // Forces the browser to download the file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button 
      className='rounded-md bg-[#407BFF] md:mt-16 mt-5 hover:bg-[#1457e7] text-white md:text-xl text-[12px] md:text-[14px] p-2 relative z-50 cursor-pointer'
      onClick={handleDownload}
    >
      <div className="absolute inset-0 rounded-lg blur-2xl bg-[#407BFF] opacity-70"></div>
      <div className="relative z-10 flex items-center">
        <Download className='w-4 h-4 m-1'/>
        <p>Download CV</p>
      </div>
    </Button>
  )
}

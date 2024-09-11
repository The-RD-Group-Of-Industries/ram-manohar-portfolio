import React from 'react';
import { SidebarDemo } from "@/components/Dasboard/layout"
import { ThemeProvider } from '@/components/Reusable/theme';

function layoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ThemeProvider // for theme 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarDemo >
          {/* for sidebar in dashboard/ */}
                    {children}    
        </SidebarDemo >
      </ThemeProvider>
    </div>
  );
};

export default layoutDashboard;
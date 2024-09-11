/**
 * The `SidebarDemo` component is a React component that renders a sidebar with various links and a dropdown menu for toggling the theme. The sidebar is responsive and can be opened or closed on smaller screens.
 *
 * The component uses the `Sidebar`, `SidebarBody`, and `SidebarLink` components from the `@/components/AUI/sidebar` module, as well as various other UI components from the `@/components/ui` module.
 *
 * The `links` array defines the links that are displayed in the sidebar, each with a label, href, and an icon.
 *
 * The component also includes a logo and a logout button, as well as a dropdown menu for toggling the theme between light, dark, and system.
 *
 * @param {object} props - The props object, which contains the `children` prop.
 * @param {React.ReactNode} props.children - The child components to be rendered inside the main content area.
 * @returns {JSX.Element} - The `SidebarDemo` component.
 */
"use client";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/AUI/sidebar";
import Link from "next/link";
import { IconArrowLeft, IconUserBolt } from "@tabler/icons-react";
import { animate, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoonIcon, ResumeIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import UpperBar from "./upperBar";
import logo from "@/resourse/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChartArea, File, FileUpIcon, ImageDown, Lock, UploadCloud } from "lucide-react";
import { Blog, SkillLevelAdvanced } from "@carbon/icons-react";
import { usePathname } from "next/navigation"; // Import usePathname
import Image from "next/image";

export function SidebarDemo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    {
      label: "Banner",
      href: "/dashboard/Banner",
      icon: <IconUserBolt className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "About",
      href: "/dashboard/About",
      icon: <ImageDown className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "CV",
      href: "/dashboard/CV",
      icon: <FileUpIcon className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "T4D Analysis",
      href: "/dashboard/TD",
      icon: <ChartArea className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Blog",
      href: "/dashboard/Blog",
      icon: <Blog className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Experience",
      href: "/dashboard/Expericence",
      icon: <SkillLevelAdvanced className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Publications",
      href: "/dashboard/Published",
      icon: <File className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Change Password",
      href: "/forgotPassword",
      icon: <Lock className="h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className={cn("md:flex-row  flex-1 border flex flex-col")}>
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10 h-[100vh] md:sticky md:top-0">
          <div className="relative z-[100] flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  className={cn(
                    pathname === link.href
                      ? "bg-[#407cffa8] rounded-lg p-2 cursor-pointer text dark:text-gray-100 text-gray-200 font-bold"
                      : "text-neutral-700 dark:text-neutral-200 cursor-pointer rounded-lg p-2 hover:bg-[#407cff6c]"
                  )}
                />
              ))}
            </div>
          </div>
          <div>
            <div 
              onClick={() => signOut()}
              className="text-neutral-700 rounded-lg p-2 hover:bg-[#407cff6c] dark:text-neutral-200 -ml-2 h-9 flex flex-row w-full text-sm gap-2 items-center"
              >
            <IconArrowLeft
              className="h-5 w-5 flex-shrink-0"
            />
            <motion.span
          animate={{
            display: false
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: false ? (open ? 1 : 0) : 1,
          }}
          className={cn(
            " text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 relative z-50",
          )}
        >
          Logout
        </motion.span>
            </div>
          
          </div>
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="-ml-2">
                  <SunIcon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute z-50 h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="relative z-50">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="bg-gradient-to-b dark:from-[#1E1E20] dark:to-[#0E0E11] to-neutral-100 from-neutral-300 md:w-[80vw] flex-col md:flex justify-start items-center md:px-5">
        <UpperBar />
        {children}
      </div>
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/dashboard/Banner"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image height={20} width={40} src={logo} alt="logo" />
      <motion.span className="font-medium text-black dark:text-white">
        Dashboard
      </motion.span>
    </Link>
  );
};

/**
 * The `SidebarProvider` component is a React context provider that manages the state and behavior of a sidebar component. It provides a `useSidebar` hook that allows other components to access the sidebar state and control its visibility.
 *
 * The `Sidebar` component is a wrapper around the `SidebarProvider` that simplifies the usage of the sidebar. It takes the same props as the `SidebarProvider` and renders the `SidebarBody` component.
 *
 * The `SidebarBody` component is a container that renders both the desktop and mobile versions of the sidebar. It uses the `DesktopSidebar` and `MobileSidebar` components to render the appropriate version based on the screen size.
 *
 * The `SidebarLink` component is a link component that is used within the sidebar. It applies active styles to the link based on the current URL path, and animates the label text based on the sidebar's open state.
 */
"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { MoonIcon, SunIcon} from "@radix-ui/react-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-200 dark:bg-neutral-800 border-2 border-gray-500 shadow-white-lg w-[100px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "250px" : "60px") : "250px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  const { setTheme } = useTheme();

  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-neutral-200 dark:bg-neutral-800 w-full"
        )}
        {...props}
      >
        <div className="flex justify-start z-20 w-full">
          <IconMenu2
            className="text-neutral-800 dark:text-neutral-200"
            onClick={() => {
              setOpen(!open);
              if (open) {
                setOpen(false);
              }
            }}
          />
        </div>
        <div className="flex justify-end z-20 w-full">
        <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="">
                  <SunIcon className="h-[0.8rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <MoonIcon className="absolute z-50 h-[0.8rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-neutral-200 dark:bg-neutral-800 p-10 z-[100] flex flex-col justify-between",
                className
              )}
            >
              <div
                className="absolute right-10 top-5 hover:bg-dashMain rounded-md z-50 text-neutral-800 dark:text-neutral-200 "
                onClick={() => {
                  setOpen(!open);
                  if (open) {
                    setOpen(false);
                  }
                }}
              >
                <IconX
                  onClick={() => {
                    setOpen(!open);
                    if (open) {
                      setOpen(false);
                    }
                  }}
                  className=""
                />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  setOpen,
  ...props
}: {
  link: Links;
  className?: string;
  setOpen?: any;
  props?: LinkProps;
}) => {
  const { pathname }: any = useRouter();
  const { open, animate } = useSidebar();

  // Determine if the link is active based on the current path
  const isActive = pathname === link.href;
const onCLickSet=()=>{
  setOpen(false)
}
  return (
    <Link
      href={link.href}
      className="relative z-[100]"
      onClick={onCLickSet}
    >
      <div
        className={cn(
          "flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer ",
          isActive && "bg-neutral-200 dark:bg-neutral-800", // Apply active styles here
          className
        )}
        {...props}
      >
        {link.icon}
        <motion.span
          animate={{
            display: animate
              ? open
                ? "inline-block"
                : "none"
              : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className={cn(
            " text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0 relative z-50",
            isActive && "font-bold" // Apply active text styles here
          )}
        >
          {link.label}
        </motion.span>
      </div>
    </Link>
  );
};

/**
 * Renders the upper bar component with a breadcrumb navigation.
 * The breadcrumb displays the current page's location within the application's hierarchy.
 * It is hidden on small screens and displayed on medium and larger screens.
 */
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function UpperBar() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean); // Split path and filter empty segments

  return (
    <div className="hidden md:block my-2 w-full rounded-lg  bg-neutral-200 dark:bg-neutral-800 p-4 shadow-sm sticky top-0 z-50">
      <Breadcrumb>
        <BreadcrumbList className="flex items-center space-x-2">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => {
            const href = "/" + pathSegments.slice(0, index + 1).join("/");

            return (
              <React.Fragment key={href}>
                <BreadcrumbSeparator />
                {index === pathSegments.length - 1 ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

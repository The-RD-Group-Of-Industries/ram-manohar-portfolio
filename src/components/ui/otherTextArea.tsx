import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    function auto_grow(element: HTMLTextAreaElement) {
      element.style.height = "5px";
      element.style.height = `${element.scrollHeight}px`;
    }

    return (
      <textarea
        ref={ref}
        onInput={(e) => auto_grow(e.currentTarget)}
        className={cn(
          "flex w-full rounded-md border border-dashMain bg-neutral-100 dark:bg-neutral-800 px-3 py-2 text-sm ring-offset-dashMain h-[30vh] overflow-hidden resize-none",
          className
        )}
        placeholder="Type something..."
        {...props} // Spread the remaining props onto the textarea element
      />
    );
  }
);

Textarea.displayName = "Textarea";

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TextareaCompProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const TextareaComp = React.forwardRef<
  HTMLTextAreaElement,
  TextareaCompProps
>(({ label, className, error, disabled, ...props }, ref) => {
  return (
    <div className="relative flex flex-col gap-1 mb-3 md:mb-4 w-full">
      {/* Textarea */}
      <textarea
        ref={ref}
        id={`floatingTextarea-${label}`}
        disabled={disabled}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={cn(
          "peer border pt-6 pb-2 px-3 rounded-md min-h-[100px] resize-y",
          "placeholder-transparent selection:bg-primary selection:text-primary-foreground",
          "dark:bg-input/30 border-input shadow-xs outline-none",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          disabled &&
            "bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed opacity-70",
          className
        )}
        {...props}
      />

      {/* Floating Label */}
      <label
        htmlFor={`floatingTextarea-${label}`}
        className="absolute top-3 left-3 text-neutral-600 dark:text-neutral-500 text-xs transition-all
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
          peer-focus:top-3 peer-focus:text-xs peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500"
      >
        {label}
      </label>

      {/* Error text */}
      {error && <span className="text-xs text-red-500 mt-1 ms-1">{error}</span>}
    </div>
  );
});

TextareaComp.displayName = "TextareaComp";

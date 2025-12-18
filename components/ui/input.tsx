"use client";

import * as React from "react";
import { Eye, EyeOff, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type InputCompProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const InputComp = React.forwardRef<HTMLInputElement, InputCompProps>(
  ({ label, className, error, type, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const isPassword = type === "password";
    const isDate = type === "date";
    const inputType = isPassword && showPassword ? "text" : type;

    return (
      <div className="relative flex flex-col gap-1 mb-3 md:mb-4 w-full">
        {/* Input */}
        <input
          ref={ref}
          id={`floatingInput-${label}`}
          type={inputType}
          disabled={disabled}
          placeholder={`Enter your ${label.toLowerCase()}`}
          className={cn(
            "peer border pt-6 pb-1 px-3 pr-10 rounded-md",
            "file:text-foreground placeholder-transparent selection:bg-primary selection:text-primary-foreground",
            "dark:bg-input/30 border-input shadow-xs outline-none",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            isDate &&
              "appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer",
            disabled &&
              "bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed opacity-70",
            className
          )}
          {...props}
        />

        {/* Label */}
        <label
          htmlFor={`floatingInput-${label}`}
          className="absolute top-3 left-3 text-neutral-600 dark:text-neutral-500 text-xs transition-all
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
            peer-focus:top-3 peer-focus:text-xs peer-focus:text-neutral-600 peer-focus:dark:text-neutral-500"
        >
          {label}
        </label>

        {/* Password toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 dark:text-neutral-500 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}

        {/* Custom date icon */}
        {isDate && <Calendar />}

        {/* Error text */}
        {error && (
          <span className="text-xs text-red-500 mt-1 ms-1">{error}</span>
        )}
      </div>
    );
  }
);

InputComp.displayName = "InputComp";

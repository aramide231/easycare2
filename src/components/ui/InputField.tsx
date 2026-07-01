import { InputHTMLAttributes, ReactNode, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  onRightIconClick?: () => void;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      leftIcon,
      rightIcon,
      error,
      onRightIconClick,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col w-full mb-4">
        <label className="mb-2 text-txt text-sm">{label}</label>

        <div className="relative flex items-center">
          {/* 1. Input is moved FIRST in the DOM and given the "peer" class */}
          <input
            ref={ref}
            className={`peer w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none transition-all focus:ring focus:ring-txt 
              ${leftIcon ? "pl-10" : ""} 
              ${rightIcon ? "pr-10" : ""} 
              ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""} 
              ${className}`}
            {...props}
          />

          {/* 2. Left Icon comes AFTER the input to react to peer-focus */}
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center text-gray-500 transition-colors peer-focus:text-txt pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Right Icon */}
          {rightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 text-txt hover:text-gray-600 transition-colors flex items-center justify-center"
              disabled={!onRightIconClick}
            >
              {rightIcon}
            </button>
          )}
        </div>

        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  },
);

InputField.displayName = "InputField";

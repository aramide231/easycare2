import { ButtonHTMLAttributes, ReactNode } from "react";

// Extend native button attributes to accept onClick, disabled, etc.
interface AuthBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function AuthBtn({
  children,
  className,
  ...props
}: AuthBtnProps) {
  return (
    <button
      type="submit" // Can be overridden by passing type="button" in props
      className={`w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/95 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

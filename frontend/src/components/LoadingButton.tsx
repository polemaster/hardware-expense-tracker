import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

export interface LoadingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: ReactNode;
  children?: ReactNode;
}

export function LoadingButton({
  isLoading = false,
  loadingText = "Loading...",
  children,
  className,
  disabled,
  type = "button",
  ...props
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      className={cn(
        "py-2 px-5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer",
        className,
      )}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {isLoading ? (loadingText ?? children) : (children ?? "Submit")}
    </button>
  );
}

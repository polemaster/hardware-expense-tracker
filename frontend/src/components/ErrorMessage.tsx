import { AlertCircle, X } from "lucide-react";
import { cn } from "../lib/utils";

interface ErrorMessageProps {
  title?: string;
  message: string;
  status: number;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorMessage({
  title,
  message,
  status,
  onDismiss,
  className,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 shadow-2xs",
        className,
      )}
    >
      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />

      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="text-sm font-semibold text-red-900 mb-0.5">{title}</h4>
        )}
        <p className="text-sm text-red-700 leading-relaxed break-words font-medium">
          [{status}] {message}
        </p>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-red-400 hover:text-red-600 hover:bg-red-100 rounded-md p-1 -mr-1 transition-colors cursor-pointer"
          aria-label="Dismiss error"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

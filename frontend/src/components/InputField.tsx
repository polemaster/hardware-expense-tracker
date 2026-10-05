import { cn } from "../lib/utils";

interface Props {
  value: string | number;
  inputType: "number" | "text";
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function InputField({
  value,
  inputType,
  onChange,
  disabled,
  className,
}: Props) {
  return (
    <input
      type={inputType}
      // ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // className="w-full px-2 py-2 text-lg bg-neutral-300 rounded border focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-200"
      className={cn(
        "w-full py-1.5 px-3 text-sm text-gray-700 bg-white placeholder-gray-300",
        "border border-gray-200 rounded-lg shadow-xs transition-shadow",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500",
        className,
      )}
      disabled={disabled}
    />
  );
}

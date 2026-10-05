import { cn } from "../lib/utils";

interface Props
  extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
  inputType: "number" | "text" | "date";
  onChange: (value: string) => void;
}

export function InputField({
  value,
  inputType,
  onChange,
  disabled,
  className,
  ref,
  ...rest
}: Props) {
  return (
    <input
      ref={ref}
      type={inputType}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full py-1.5 px-3 text-sm text-gray-700 bg-white placeholder-gray-300",
        "border border-gray-200 rounded-lg shadow-xs transition-shadow",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500",
        "disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:shadow-none",
        inputType === "date" && "cursor-pointer",
        className,
      )}
      disabled={disabled}
      {...rest}
    />
  );
}

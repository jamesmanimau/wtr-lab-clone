interface ToggleOption {
  label: string;
  value: string;
}

interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: "sm" | "md";
}

const sizeClasses: Record<string, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
};

export default function ToggleGroup({ options, value, onChange, className = "", size = "sm" }: ToggleGroupProps) {
  return (
    <div className={`flex bg-card-hover rounded-lg p-0.5 border border-line-light ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`${sizeClasses[size]} rounded-md font-medium transition-colors ${
            value === opt.value ? "bg-accent text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({ type = "text", placeholder, value, onChange, className = "" }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full bg-input border border-line-light rounded-lg px-4 py-2 text-sm text-foreground outline-none focus:border-accent transition-colors ${className}`}
    />
  );
}

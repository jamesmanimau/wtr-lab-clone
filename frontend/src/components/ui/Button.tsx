import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

const base = "font-medium transition-all duration-300 inline-flex items-center justify-center";

const variants: Record<string, string> = {
  primary: "bg-accent hover:bg-accent-dark text-white rounded-lg",
  secondary: "bg-card-hover hover:bg-line-light text-gray-300 rounded-lg",
  ghost: "hover:bg-card-hover rounded-lg border border-line",
  gradient: "bg-gradient-to-r from-accent to-accent-light text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-accent/30",
};

const sizes: Record<string, string> = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-4 py-2",
  lg: "text-sm px-8 py-3.5",
};

export default function Button({ children, variant = "primary", size = "md", href, onClick, className = "", disabled, type = "button" }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {children}
    </button>
  );
}

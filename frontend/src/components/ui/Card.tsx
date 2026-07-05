interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export default function Card({ children, className = "", padding = true }: CardProps) {
  return (
    <div className={`bg-card border border-line rounded-xl ${padding ? "p-4" : ""} ${className}`}>
      {children}
    </div>
  );
}

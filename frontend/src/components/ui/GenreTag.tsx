interface GenreTagProps {
  label: string;
}

export default function GenreTag({ label }: GenreTagProps) {
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent-light border border-accent/30">
      {label}
    </span>
  );
}

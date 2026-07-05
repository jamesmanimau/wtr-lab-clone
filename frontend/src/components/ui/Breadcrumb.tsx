import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-gray-500 mb-6">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-accent-light transition-colors">{item.label}</Link>
          ) : (
            <span>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

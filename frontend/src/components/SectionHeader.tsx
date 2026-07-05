import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  href?: string;
  tabs?: { label: string; active?: boolean }[];
}

export default function SectionHeader({ title, href, tabs }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {tabs && (
          <div className="flex gap-1 bg-card-hover rounded-lg p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                className={`px-3 py-1 text-xs rounded-md transition-colors ${
                  tab.active ? "bg-accent text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {href && (
        <Link href={href} className="text-sm text-accent hover:text-accent-light transition-colors">
          See More →
        </Link>
      )}
    </div>
  );
}

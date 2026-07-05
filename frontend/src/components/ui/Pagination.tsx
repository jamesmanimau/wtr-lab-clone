interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1.5 rounded-lg border border-line text-xs text-gray-400 hover:text-white hover:bg-card-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        const start = Math.max(1, Math.min(page - 2, totalPages - 4));
        const p = start + i;
        if (p > totalPages) return null;
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
              p === page ? "bg-accent text-white" : "text-gray-400 hover:text-white hover:bg-card-hover"
            }`}
          >
            {p}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1.5 rounded-lg border border-line text-xs text-gray-400 hover:text-white hover:bg-card-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}

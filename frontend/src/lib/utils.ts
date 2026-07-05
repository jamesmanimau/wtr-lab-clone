export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr.split("T")[0] || dateStr;
  }
}

export function statusColor(status: string): string {
  switch (status) {
    case "ongoing":
      return "bg-green-900/40 text-green-400";
    case "completed":
      return "bg-blue-900/40 text-blue-400";
    case "hiatus":
      return "bg-yellow-900/40 text-yellow-400";
    case "dropped":
      return "bg-red-900/40 text-red-400";
    default:
      return "bg-gray-900/40 text-gray-400";
  }
}

export function formatViews(views: number): string {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + "M";
  if (views >= 1000) return (views / 1000).toFixed(1) + "K";
  return String(views);
}


/**
 * Format date to "22 Sept 2025, 17:22" (Indonesian locale)
 * Example: formatOrderDate("2025-09-22T17:22:00")
 */
export function formatOrderDate(date: string | Date | null): string | null {
  if(date == null){
    return null
  } 
  const d = new Date(date);

  const formattedDate = d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // make month lowercase (e.g. "Sept" → "sept")
  const normalizedDate = formattedDate.replace(
    /([A-Za-z]+)/,
    (month) => month.toLowerCase()
  );

  return `${normalizedDate}, ${formattedTime}`;
}

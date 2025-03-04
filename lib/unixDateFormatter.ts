export function formatUnixTimestamp(
  timestamp: number,
  options: Intl.DateTimeFormatOptions = {}
): string {
  // Multiply by 1000 to convert from seconds to milliseconds
  const date = new Date(timestamp * 1000);

  // Default formatting options
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  };

  // Merge default options with provided options
  const finalOptions = { ...defaultOptions, ...options };

  return date.toLocaleString("en-US", finalOptions);
}

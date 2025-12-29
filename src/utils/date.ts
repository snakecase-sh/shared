/**
 * Format a date as a relative time string (e.g., "2 hours ago", "just now")
 * @param date - The date to format
 * @returns A human-readable relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  if (diffHour < 24) return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
  if (diffDay < 7) return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
  if (diffWeek < 4) return `${diffWeek} ${diffWeek === 1 ? 'week' : 'weeks'} ago`;
  if (diffMonth < 12) return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} ago`;
  return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} ago`;
}

/**
 * Format a date as a short date string (e.g., "Jan 15", "Dec 25, 2023")
 * @param date - The date to format
 * @returns A short date string
 */
export function formatShortDate(date: Date): string {
  const now = new Date();
  const isCurrentYear = date.getFullYear() === now.getFullYear();

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    ...(isCurrentYear ? {} : { year: 'numeric' }),
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Format a date as a full date-time string (e.g., "Jan 15, 2024 at 3:45 PM")
 * @param date - The date to format
 * @returns A full date-time string
 */
export function formatFullDateTime(date: Date): string {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const datePart = new Intl.DateTimeFormat('en-US', dateOptions).format(date);
  const timePart = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

  return `${datePart} at ${timePart}`;
}

/**
 * Format a timestamp for display in a message list
 * Shows time for today, date for this year, date+year for older
 * @param date - The date to format
 * @returns A formatted timestamp string
 */
export function formatMessageTimestamp(date: Date): string {
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isToday) {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  }

  return formatShortDate(date);
}

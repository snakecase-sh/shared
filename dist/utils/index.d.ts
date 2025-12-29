/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns A lowercase, hyphenated slug
 */
declare function slugify(text: string): string;

/**
 * Format a date as a relative time string (e.g., "2 hours ago", "just now")
 * @param date - The date to format
 * @returns A human-readable relative time string
 */
declare function formatRelativeTime(date: Date): string;
/**
 * Format a date as a short date string (e.g., "Jan 15", "Dec 25, 2023")
 * @param date - The date to format
 * @returns A short date string
 */
declare function formatShortDate(date: Date): string;
/**
 * Format a date as a full date-time string (e.g., "Jan 15, 2024 at 3:45 PM")
 * @param date - The date to format
 * @returns A full date-time string
 */
declare function formatFullDateTime(date: Date): string;
/**
 * Format a timestamp for display in a message list
 * Shows time for today, date for this year, date+year for older
 * @param date - The date to format
 * @returns A formatted timestamp string
 */
declare function formatMessageTimestamp(date: Date): string;

/**
 * Truncate text to a maximum length, adding ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - String to append when truncated (default: '...')
 * @returns The truncated text
 */
declare function truncate(text: string, maxLength: number, ellipsis?: string): string;
/**
 * Truncate text at word boundaries to avoid cutting words
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - String to append when truncated (default: '...')
 * @returns The truncated text
 */
declare function truncateWords(text: string, maxLength: number, ellipsis?: string): string;
/**
 * Extract mentioned usernames from a message (e.g., @username)
 * @param text - The message text
 * @returns Array of mentioned usernames (without @)
 */
declare function extractMentions(text: string): string[];
/**
 * Escape HTML special characters to prevent XSS
 * @param text - The text to escape
 * @returns Escaped text safe for HTML
 */
declare function escapeHTML(text: string): string;
/**
 * Count the number of words in a text
 * @param text - The text to count words in
 * @returns The word count
 */
declare function countWords(text: string): number;

export { countWords, escapeHTML, extractMentions, formatFullDateTime, formatMessageTimestamp, formatRelativeTime, formatShortDate, slugify, truncate, truncateWords };

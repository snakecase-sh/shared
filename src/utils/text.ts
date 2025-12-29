/**
 * Truncate text to a maximum length, adding ellipsis if needed
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - String to append when truncated (default: '...')
 * @returns The truncated text
 */
export function truncate(text: string, maxLength: number, ellipsis: string = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}

/**
 * Truncate text at word boundaries to avoid cutting words
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param ellipsis - String to append when truncated (default: '...')
 * @returns The truncated text
 */
export function truncateWords(text: string, maxLength: number, ellipsis: string = '...'): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength - ellipsis.length);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + ellipsis;
  }

  return truncated + ellipsis;
}

/**
 * Extract mentioned usernames from a message (e.g., @username)
 * @param text - The message text
 * @returns Array of mentioned usernames (without @)
 */
export function extractMentions(text: string): string[] {
  const mentionPattern = /@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)/g;
  const matches = text.matchAll(mentionPattern);
  return Array.from(matches, m => m[1]);
}

/**
 * Escape HTML special characters to prevent XSS
 * @param text - The text to escape
 * @returns Escaped text safe for HTML
 */
export function escapeHTML(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return text.replace(/[&<>"']/g, char => htmlEscapes[char] || char);
}

/**
 * Count the number of words in a text
 * @param text - The text to count words in
 * @returns The word count
 */
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

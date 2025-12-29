// src/utils/slugify.ts
function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}

// src/utils/date.ts
function formatRelativeTime(date) {
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1e3);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} ${diffMin === 1 ? "minute" : "minutes"} ago`;
  if (diffHour < 24) return `${diffHour} ${diffHour === 1 ? "hour" : "hours"} ago`;
  if (diffDay < 7) return `${diffDay} ${diffDay === 1 ? "day" : "days"} ago`;
  if (diffWeek < 4) return `${diffWeek} ${diffWeek === 1 ? "week" : "weeks"} ago`;
  if (diffMonth < 12) return `${diffMonth} ${diffMonth === 1 ? "month" : "months"} ago`;
  return `${diffYear} ${diffYear === 1 ? "year" : "years"} ago`;
}
function formatShortDate(date) {
  const now = /* @__PURE__ */ new Date();
  const isCurrentYear = date.getFullYear() === now.getFullYear();
  const options = {
    month: "short",
    day: "numeric",
    ...isCurrentYear ? {} : { year: "numeric" }
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
function formatFullDateTime(date) {
  const dateOptions = {
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  };
  const datePart = new Intl.DateTimeFormat("en-US", dateOptions).format(date);
  const timePart = new Intl.DateTimeFormat("en-US", timeOptions).format(date);
  return `${datePart} at ${timePart}`;
}
function formatMessageTimestamp(date) {
  const now = /* @__PURE__ */ new Date();
  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  if (isToday) {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    }).format(date);
  }
  return formatShortDate(date);
}

// src/utils/text.ts
function truncate(text, maxLength, ellipsis = "...") {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}
function truncateWords(text, maxLength, ellipsis = "...") {
  if (text.length <= maxLength) return text;
  const truncated = text.slice(0, maxLength - ellipsis.length);
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + ellipsis;
  }
  return truncated + ellipsis;
}
function extractMentions(text) {
  const mentionPattern = /@([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)/g;
  const matches = text.matchAll(mentionPattern);
  return Array.from(matches, (m) => m[1]).filter((m) => m !== void 0);
}
function escapeHTML(text) {
  const htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}
function countWords(text) {
  return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
}

export {
  slugify,
  formatRelativeTime,
  formatShortDate,
  formatFullDateTime,
  formatMessageTimestamp,
  truncate,
  truncateWords,
  extractMentions,
  escapeHTML,
  countWords
};

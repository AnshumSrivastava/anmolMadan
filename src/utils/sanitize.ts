/**
 * Input sanitization utility for visitor submissions (comments, testimonials, contact).
 * Prevents XSS, script injection, HTML injection, and malicious payloads.
 */

export function sanitizeText(
  input: unknown,
  options?: { maxLength?: number; allowNewlines?: boolean }
): string {
  if (typeof input !== "string") {
    return "";
  }

  const maxLength = options?.maxLength ?? 1000;
  const allowNewlines = options?.allowNewlines ?? true;

  let cleaned = input.trim();

  // 1. Remove dangerous protocols / pseudo-protocols
  cleaned = cleaned.replace(/(javascript|vbscript|data|file):/gi, "");

  // 2. Remove script / style / iframe / object / embed tags and content
  cleaned = cleaned.replace(
    /<(script|style|iframe|object|embed|applet)[\s\S]*?>[\s\S]*?<\/\1>/gi,
    ""
  );

  // 3. Remove all remaining HTML tags
  cleaned = cleaned.replace(/<\/?[^>]+(>|$)/g, "");

  // 4. Remove event handlers like onclick="...", onerror=...
  cleaned = cleaned.replace(/on\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // 5. Encode essential HTML entities to prevent DOM-based XSS
  cleaned = cleaned
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");

  // 6. Handle newlines
  if (!allowNewlines) {
    cleaned = cleaned.replace(/[\r\n]+/g, " ");
  }

  // 7. Enforce max length
  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength);
  }

  return cleaned.trim();
}

export function sanitizeName(name: unknown): string {
  return sanitizeText(name, { maxLength: 80, allowNewlines: false });
}

export function sanitizeComment(comment: unknown): string {
  return sanitizeText(comment, { maxLength: 800, allowNewlines: true });
}

export function sanitizeTestimonialMessage(message: unknown): string {
  return sanitizeText(message, { maxLength: 1000, allowNewlines: true });
}

export const sanitizeAndHyphenate = (text: string): string =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
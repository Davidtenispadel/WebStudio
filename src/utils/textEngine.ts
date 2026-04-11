export const splitIntoSentences = (text: string): string[] => {
  return text
    .replace(/\n/g, " ")
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
};

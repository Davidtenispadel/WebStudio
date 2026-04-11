export const splitIntoLines = (text: string) => {
  return text
    .split(".")
    .map(t => t.trim())
    .filter(Boolean);
};

export const splitIntoWords = (text: string) => {
  return text
    .split(" ")
    .map(t => t.trim())
    .filter(Boolean);
};

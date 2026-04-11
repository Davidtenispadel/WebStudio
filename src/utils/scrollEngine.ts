export const getScrollProgress = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const progress =
    1 - Math.max(0, rect.top) / (windowHeight + rect.height);

  return Math.min(1, Math.max(0, progress));
};

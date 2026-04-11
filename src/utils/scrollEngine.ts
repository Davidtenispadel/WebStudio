type ScrollResult = {
  progress: number;
  activeIndex: number;
  rawProgress: number;
};

export const getScrollProgress = (el: HTMLElement): ScrollResult => {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // 🔹 raw progress (0 - 1)
  const rawProgress =
    1 - Math.max(0, rect.top) / (windowHeight + rect.height);

  const progress = Math.min(1, Math.max(0, rawProgress));

  return {
    progress,
    rawProgress,
    activeIndex: 0 // fallback (lo calculamos aparte)
  };
};

/* ===============================
   🍏 APPLE STYLE ACTIVE SCENE DETECTOR
   =============================== */

export const getActiveIndex = (selector: string) => {
  const items = document.querySelectorAll(selector);

  let activeIndex = 0;
  let minDistance = Infinity;

  const windowCenter = window.innerHeight / 2;

  items.forEach((item, index) => {
    const rect = (item as HTMLElement).getBoundingClientRect();

    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(windowCenter - itemCenter);

    if (distance < minDistance) {
      minDistance = distance;
      activeIndex = index;
    }
  });

  return activeIndex;
};

/* ===============================
   🍏 SMOOTH LERP UTILITY (APPLE FEEL)
   =============================== */

export const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

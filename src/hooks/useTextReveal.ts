import { useEffect } from "react";

export const useTextReveal = (selector: string) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            const children = Array.from(el.children);

            children.forEach((child, index) => {
              const htmlEl = child as HTMLElement;

              setTimeout(() => {
                htmlEl.style.opacity = "1";
                htmlEl.style.transform = "translateY(0px)";
              }, index * 180); // 👈 ritmo Apple (suave, elegante)
            });
          }
        });
      },
      { threshold: 0.6 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
};

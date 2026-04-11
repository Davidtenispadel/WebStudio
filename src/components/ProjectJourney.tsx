import React, { useEffect, useRef, useState } from "react";
import { getScrollProgress } from "../utils/scrollEngine";
import { splitIntoLines } from "../utils/textEngine";

const slides = [
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
    text: "Architecture begins with you. Not drawings. Not plans. With your life, your needs, your history. Start your project."
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
    text: "You're searching for the right space. A new home, an extension, a workspace that feels right. Doubts appear. We help you clarify."
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
    text: "Doubt is not a problem. It's the beginning. Great architecture starts with questions, not answers."
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
    text: "Your ideal project begins here. Stop overthinking. Start imagining with us."
  }
];

export default function ProjectJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const progress = getScrollProgress(containerRef.current);
      const index = Math.min(
        slides.length - 1,
        Math.floor(progress * slides.length)
      );

      setActive(index);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="project-journey">
      {slides.map((slide, i) => (
        <section
          key={i}
          className="journey-scene"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className={`journey-text ${i === active ? "active" : ""}`}>
            {splitIntoLines(slide.text).map((line, idx) => (
              <p key={idx} className="line">
                {line}
              </p>
            ))}

            <a className="journey-cta">Start your project</a>
          </div>
        </section>
      ))}
    </div>
  );
}

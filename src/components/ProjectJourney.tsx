// src/components/ProjectJourney.tsx
import React, { useEffect, useRef, useState } from "react";
import { getScrollProgress } from "../utils/scrollEngine";
import { splitIntoLines } from "../utils/textEngine";

interface ProjectJourneyProps {
  onNavigateToEnquiry: () => void; // Obligatoria: función para ir a Enquiry
}

const slides = [
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
    line1: "Architecture begins with you.",
    line2: "Not drawings. Not plans. With your life, your needs, your history.",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
    text: "You're searching for the right space. A new home, an extension, a workspace that feels right. Doubts appear. We help you clarify.",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
    text: "Doubt is not a problem. It's the beginning. Great architecture starts with questions, not answers.",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
    text: "Your ideal project begins here. Stop overthinking. Start imagining with us.",
    isLast: true,
  }
];

export default function ProjectJourney({ onNavigateToEnquiry }: ProjectJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const progress = getScrollProgress(containerRef.current);
      const index = Math.min(slides.length - 1, Math.floor(progress * slides.length));
      setActive(index);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-y-auto snap-y snap-mandatory">
      {slides.map((slide, i) => (
        <section
          key={i}
          className="relative w-full h-screen snap-start bg-cover bg-center flex flex-col justify-center items-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          {/* Capa oscura para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Contenedor del texto: centrado horizontal y verticalmente */}
          <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 text-center">
            {slide.line1 ? (
              <>
                <p className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
                  {slide.line1}
                </p>
                <p className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight mt-4">
                  {slide.line2}
                </p>
              </>
            ) : (
              <div className="space-y-2">
                {splitIntoLines(slide.text).map((line, idx) => (
                  <p key={idx} className="text-white text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
                    {line}
                  </p>
                ))}
              </div>
            )}
            {slide.isLast && (
              <div className="mt-12">
                <button
                  onClick={onNavigateToEnquiry}
                  className="inline-block bg-white text-black px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Start your project
                </button>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}

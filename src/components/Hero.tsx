import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
    title: "Architecture begins with you",
    text: "Not with drawings, not with plans. With your life, your needs, your history.",
    cta: false,
  },
  {
    image:
      "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
    title: "You're searching for the right space",
    text: "A new home, an extension, a workspace that finally feels right.",
    cta: false,
  },
  {
    image:
      "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
    title: "Doubt is the beginning",
    text: "Great architecture starts with the right questions.",
    cta: false,
  },
  {
    image:
      "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
    title: "Your ideal project begins here",
    text: "Stop overthinking. Start imagining with us.",
    cta: true, // ⭐ ESTA SLIDE TIENE EL BOTÓN
  },
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  const goToEnquiry = () => {
    router.push("/?section=Enquiry");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!slidesRef.current) return;

      slidesRef.current.forEach((slide) => {
        if (!slide) return;

        const rect = slide.getBoundingClientRect();
        const center = window.innerHeight / 2;

        const distance = Math.abs(rect.top + rect.height / 2 - center);
        const progress = Math.max(0, 1 - distance / window.innerHeight);

        const img = slide.querySelector("img") as HTMLElement;
        const content = slide.querySelector(".content") as HTMLElement;

        if (img) {
          img.style.transform = `scale(${1 + (1 - progress) * 0.1})`;
        }

        if (content) {
          content.style.opacity = String(progress);
          content.style.transform = `translateY(-50%) translateX(${
            (1 - progress) * 60
          }px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="hero-journey">
      {slides.map((slide, i) => (
        <div
          className="slide"
          key={i}
          ref={(el) => (slidesRef.current[i] = el)}
        >
          <img src={slide.image} />

          <div className="content">
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>

            {slide.cta && (
              <button
                onClick={goToEnquiry}
                className="mt-6 px-10 py-4 bg-black text-white rounded-full text-xs tracking-[0.3em] uppercase hover:bg-red-600 transition-all"
              >
                Start your project
              </button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;

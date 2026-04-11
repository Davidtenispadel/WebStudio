import React, { useEffect, useRef } from "react";

const slides = [
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
    title: "Architecture begins with you",
    text: "Not with drawings, not with plans. With your life, your needs, your history.",
    cta: "Start your project"
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
    title: "You're searching for the right space",
    text: "A new home, an extension, a workspace that finally feels right. You've collected ideas, references... but the more you look, the more doubts appear."
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
    title: "Doubt is the beginning",
    text: "Great architecture starts with the right questions. Your routines, your taste, your ambitions."
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
    title: "Your ideal project begins here",
    text: "Stop overthinking. Start imagining with us."
  }
];

const Hero: React.FC = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.4 }
    );

    refs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-journey">
      {slides.map((slide, index) => (
        <div className="slide" key={index}>
          <img src={slide.image} />

          <div
            className="content"
            ref={(el) => (refs.current[index] = el)}
          >
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>

            {slide.cta && (
              <a className="cta">{slide.cta}</a>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero;

import React from "react";

interface ProjectJourneyProps {
  onNavigateToEnquiry: () => void;
}

const slides = [
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
    line1: "Architecture begins with you!",
    line2: "No drawings, No plans, just your life, your needs, your history!",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
    text: "You're searching for the right space. A new home, an extension, a workspace that feels right. Doubt creeps in. We help you turn it into clarity.",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
    text: "Doubt isn't a problem. It's the starting point. Great architecture grows from questions, not ready answers.",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
    text: "Your ideal project is closer than you think. Stop overthinking. Start imagining with us.",
    isLast: true,
  },
];

export default function ProjectJourney({ onNavigateToEnquiry }: ProjectJourneyProps) {
  return (
    <>
      {slides.map((slide, i) => (
        <section
          key={i}
          className="relative w-full h-screen snap-start flex flex-col justify-between"
          style={{ scrollSnapAlign: "start" }}
        >
          {/* Bloque blanco para el texto */}
          <div className="bg-white px-6 md:px-10 pt-28 md:pt-36 pb-2 md:pb-4 text-left">
            {slide.line1 ? (
              <>
                <p className="text-black text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
                  {slide.line1}
                </p>
                <p className="text-black text-2xl md:text-3xl lg:text-4xl font-light leading-tight mt-4">
                  {slide.line2}
                </p>
              </>
            ) : (
              <div className="space-y-3">
                <p className="text-black text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
                  {slide.text}
                </p>
              </div>
            )}
            {slide.isLast && (
              <div className="mt-10 text-center">
                <button
                  onClick={onNavigateToEnquiry}
                  className="inline-block bg-black text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Start your project
                </button>
              </div>
            )}
          </div>

          {/* Imagen pegada al borde inferior */}
          <div className="h-[55vh] w-full overflow-hidden">
            <img
              src={slide.image}
              alt={`Journey ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      ))}
    </>
  );
}

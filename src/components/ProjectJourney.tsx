import React from "react";

interface ProjectJourneyProps {
  onNavigateToEnquiry: () => void;
}

const slides = [
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
    line1: "Architecture begins with you.",
    line2:
      "If you are planning an extension or a new home, you can submit a planning application yourself through the Planning Portal. Very quickly, most clients realise the process involves far more than submitting drawings. Planning permission requires technical experience, an understanding of local planning policy, and careful management of deadlines and conditions. This is often where uncertainty, delay and frustration begin.",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
    text:
      "Design does not start with form alone. It starts with understanding planning policy, site constraints and regulatory requirements. We design with planning in mind from the outset, ensuring that layouts, massing and materials are compliant, defendable and aligned with the expectations of the Planning Officer. This approach reduces risk and avoids unnecessary redesign later in the process.",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
    text:
      "As your planning agent, we manage documentation, coordination and communication with the Planning Officer. Queries and conditions are addressed clearly and within required timeframes, keeping the process controlled and predictable.",
  },
  {
    image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
    text:
      "The result is more than planning approval. It is a well-considered, compliant project, ready to progress into construction with confidence and clarity.",
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
          {/* Text block */}
          <div className="bg-white px-6 md:px-10 pt-28 md:pt-36 pb-2 md:pb-4 text-left">
            {slide.line1 ? (
              <>
                <p className="text-black text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
                  {slide.line1}
                </p>
                <p className="text-black text-base md:text-lg lg:text-xl font-light leading-relaxed mt-4 max-w-5xl">
                  {slide.line2}
                </p>
              </>
            ) : (
              <div className="max-w-5xl">
                <p className="text-black text-base md:text-lg lg:text-xl font-light leading-relaxed">
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

          {/* Image */}
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

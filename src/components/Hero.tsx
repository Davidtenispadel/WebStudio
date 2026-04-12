// ============================
// COMPONENTE PROJECT JOURNEY SLIDES
// ============================
const ProjectJourneySlides: React.FC<{ onStartProject: () => void }> = ({ onStartProject }) => {
  const slides = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775930330/1._Family_Country_xehkff.png",
      text: "Architecture begins with you — not with drawings, not with plans. With your life, your needs, your history. Start your project.",
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929794/2._table_drawings_mdzbk2.png",
      text: "You're searching for the right space. A new home, an extension, a workspace that finally feels right. You've collected ideas, references, screenshots... But the more you look, the more doubts appear. Is it the right style? Will it fit my life? How will it feel to live or work there?",
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929804/3._Model_kuhihd.png",
      text: "Doubt is not a problem — it's the beginning. Great architecture doesn't start with answers. It starts with the right questions. Your routines, your taste, your ambitions, your way of living. We listen, we translate, we shape a concept that feels unmistakably yours.",
    },
    {
      id: 4,
      image: "https://res.cloudinary.com/dwealmbfi/image/upload/v1775929824/4._Panoramic_Livingroom_hi9uhv.png",
      text: "Your ideal project begins here. Stop overthinking, start imagining with us. Tell us what you need, what you love, how you live. We'll turn it into a space that feels right from day one.",
      isLast: true,
    },
  ];

  // Refs para efecto parallax
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      imageRefs.current.forEach((ref, idx) => {
        if (ref) {
          const scrollY = window.scrollY;
          const offset = ref.offsetTop;
          const speed = 0.3; // Velocidad del parallax
          const yPos = -(scrollY - offset) * speed;
          ref.style.transform = `translateY(${yPos}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {slides.map((slide, index) => (
        <section
          key={slide.id}
          className="relative min-h-screen w-full snap-start flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-20 overflow-hidden"
          style={{ scrollSnapAlign: "start" }}
        >
          {/* Imagen con efecto parallax */}
          <div
            ref={(el) => (imageRefs.current[index] = el)}
            className="w-full md:w-1/2 h-64 md:h-[80vh] rounded-2xl overflow-hidden shadow-2xl will-change-transform"
          >
            <img
              src={slide.image}
              alt={`Journey ${slide.id}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Texto lateral derecho */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pl-12 lg:pl-20 text-white">
            <p className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide">
              {slide.text}
            </p>

            {slide.isLast && (
              <div className="mt-12">
                <button
                  onClick={onStartProject}
                  className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-wider shadow-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Start your Project
                  <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

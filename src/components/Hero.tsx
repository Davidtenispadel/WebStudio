interface ProjectJourneySlidesProps {
  onStartProject: () => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const ProjectJourneySlides: React.FC<ProjectJourneySlidesProps> = ({ onStartProject, scrollContainerRef }) => {
  const slides = [ /* mismo array */ ];

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      imageRefs.current.forEach((ref, idx) => {
        if (ref) {
          const offset = ref.offsetTop - container.offsetTop;
          const speed = 0.25;
          const yPos = -(scrollTop - offset) * speed;
          ref.style.transform = `translateY(${yPos}px)`;
        }
      });
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef]);

  return (
    <div className="relative w-full h-full">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="relative w-full h-screen snap-start flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-20 overflow-hidden"
          style={{ scrollSnapAlign: 'start' }}
        >
          {/* imagen y texto igual */}
        </div>
      ))}
    </div>
  );
};

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'], // scroll from top of hero to bottom of hero
  });

  // Image moves upward as you scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Main text fades out while scrolling
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Secondary text fades in after scrolling a bit
  const secondTextOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src="https://res.cloudinary.com/dwealmbfi/image/upload/v1774772535/Family_rh8tui.png"
          alt="Family at sunrise"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Main text (fades out) */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6"
        style={{ opacity: textOpacity }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold">
          Architecture begins with you
        </h1>
        <p className="mt-4 text-lg md:text-xl leading-relaxed">
          Not with drawings. Not with plans.
          <br />
          With your life, your needs, your history.
        </p>
        <a href="#contact-form">
          <button className="mt-8 px-8 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition">
            Start your project
          </button>
        </a>
      </motion.div>

      {/* Secondary text (fades in) */}
      <motion.div
        className="absolute bottom-20 left-0 right-0 z-20 text-white text-center px-6"
        style={{ opacity: secondTextOpacity }}
      >
        <h2 className="text-2xl md:text-3xl font-light">
          Discover more about our process
        </h2>
        <p className="mt-2 text-md">
          Design, BIM and planning tailored to you
        </p>
      </motion.div>
    </section>
  );
};

export default Hero;
